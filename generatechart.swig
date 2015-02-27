<html>
<head>
	<style>
		body, html {
			border:0;
			padding:0;
			background: #{{backgroundColor}};
		}

		#chart {
			width: {{chartWidth}}px;
			height: {{chartHeight}}px;
			margin:0;
			padding:0;
		}
	</style>

	<!-- Load c3.css -->
	<link href="file://{{basePath}}/node_modules/c3/c3.css" rel="stylesheet" type="text/css">

	<!-- Load d3.js and c3.js -->
	<script src="file://{{basePath}}/node_modules/d3/d3.min.js" charset="utf-8"></script>
	<script src="file://{{basePath}}/node_modules/c3/c3.min.js"></script>

</head>
<body>
	<div id="chart"></div>

	<script>

	var chartConfig = JSON.parse('{{chartConfiguration|raw}}');

	chartConfig.bindto = '#chart';
	chartConfig.onrendered = function () { window.callPhantom('takeShot'); };

	var chart = c3.generate(chartConfig);

	</script>

</body>
</html>