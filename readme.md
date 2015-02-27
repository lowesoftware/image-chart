image-chart
==============

image-chart is a Chart generation server based on [c3.js](http://c3js.org/), a wrapper of [d3](http://d3js.org/). It allows you to pass chart configuration data via URL query parameters and have an image served back. A great replacement to the deprecated Google Image Charts.


Prerequisites
---

* [Node](http://nodejs.org/) - to host the Chart generation server
* [Redis](http://redis.io/) - to cache the generated images


Installation
---

	git clone https://github.com/lowesoftware/image-chart.git
	npm install


Run The Server
---
	
	node app.js


Generate A Sample Chart
---

	http://localhost:3200/chart?config={"data":{"columns":[["data1",30,200,100,900,150,250],["data2",50,20,10,40,15,25]]}}


Server Configuraton
---

[node-config](https://github.com/lorenwest/node-config) is used to store configuration data. See the [default.json](https://raw.githubusercontent.com/lowesoftware/image-chart/master/config/default.json) in the config folder to change configuration.


Chart Configuration
---

Charts are configured by setting querystring parameters. Available querystring parameters are:

Parameter  | Description
------------- | -------------
bg  | 'default: fff'. Optional. A hex value to set as the background color of the chart.
width  | 'default: 800'. Optional. The width, in pixels of the chart image.
height | 'default: 300'. Optional. The height, in pixels of the chart image.
config | Required. This is a stringified JSON object that will be passed to the C3 chart _generate_ method. For information on how to generate C3 charts see the [Getting Started](http://c3js.org/gettingstarted.html), [Examples](http://c3js.org/examples.html), and [Reference](http://c3js.org/reference.html).
token | 'See config\defaut.json to enable and set'. Not required by default, when enabled this is the api authentication token required to generate a chart.


How It Works
---

When the chart method is called, the basic flow is:

1. Generate a chartKey based on an md5 of the querystring
1. If the chartKey exists in redis then reset the cache expiration and serve the cached image, and stop here
1. If the chartKey does not exist in redis...
1. Configure an object to pass to a swig template that will generate the d3 chart
1. Render the [swig](http://paularmstrong.github.io/swig/) template
1. Use [webshot](https://www.npmjs.com/package/webshot) to pass the rendered html to [PhantomJS](http://phantomjs.org/)
1. Stream the image data to the express response object and to the redis cache
1. Set the expiration of the chart in redis


License
---

[MIT License](https://raw.githubusercontent.com/lowesoftware/image-chart/master/LICENSE)