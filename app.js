var config = require('config');
var uuid = require('node-uuid');
var crypto = require('crypto');

var express=require('express');
var app=express();

var webshot = require('webshot');
var swig  = require('swig');
var chartTemplate = swig.compileFile('./generatechart.swig');

var redis = require('redis').createClient(config.get('redis.port'), config.get('redis.host'), { detect_buffers: true });
var redisWriteStream = require('redis-wstream');
var redisReadStream = require('redis-rstream');


if(config.get('auth.enabled')) {
  var token = config.get('auth.token');

  app.use(function(req, res, next) {

    if(req.query.token != token) {
      res.status(401).json({ error: 'unauthorized' });
      return;  
    }
    
    next();
  });
}


app.get('/chart/build', function (req, res) {

  var chartId = 'chart:' + uuid.v4();



});


app.get('/chart', function (req, res) {
  chartKey = 'chart:' + crypto.createHash('md5').update(JSON.stringify(req.query)).digest('hex');

  if(config.get('cache.enabled')) {

    if(redis.keys(chartKey, function (err, data) {
      if(data.length == 1) {
        console.log('cache hit: ' + chartKey);
        redis.expire(chartKey, config.get('cache.expires'));

        res.writeHead(200, {'Content-Type': 'image/' + config.get('image.format') });
        redisReadStream(redis, chartKey).pipe(res);
      }
      else {
        var width = req.query.width ? req.query.width : '800',
            height = req.query.height ? req.query.height : '300';

        var chartHtml = chartTemplate({
          basePath: __dirname,
          chartConfiguration: unescape(req.query.config) || '{}',
          chartWidth: width,
          chartHeight: height,
          backgroundColor: req.query.bg || 'fff'
        });

        webshot(chartHtml, 
        {
          takeShotOnCallback: true,
          siteType: 'html',
          windowSize: {
            width: width,
            height: height,
          },
          streamType: config.get('image.format'),
          quality: config.get('image.quality')
        },
        function(err, renderStream) {
          if(err) {
            console.log(err);
            res.status(500).json({error: err});
            return;
          }


          res.writeHead(200, {'Content-Type': 'image/' + config.get('image.format') });

          if(config.get('cache.enabled')) {
            var writeStream = redisWriteStream(redis, chartKey);

            console.log('add to cache: ' + chartKey);
            renderStream.pipe(writeStream);

            renderStream.on('end', function () {
              console.log('set cache expiration: ' + chartKey + ', ' + config.get('cache.expires') + 's');
              
              // note here that we set the expiration on the temp key that redis-wstream uses because it hasn't been renamed yet
              redis.expire(writeStream._redisTempKey, config.get('cache.expires'));
            });
          }


          renderStream.pipe(res);
        });


      }

    }));

  }

  

});




var server=app.listen(config.get('server.port'),function(){
  console.log('image-chart running on port ' + config.get('server.port'));
});
