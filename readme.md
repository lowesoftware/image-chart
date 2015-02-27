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

	http://localhost:3200/chart?config={%22data%22:%20{%22columns%22:%20[[%22data1%22,%2030,%20200,%20100,%20900,%20150,%20250],[%22data2%22,%2050,%2020,%2010,%2040,%2015,%2025]]}}


Server Configuraton
---

[node-config](https://github.com/lorenwest/node-config) is used to store configuration data. See the [default.json](https://raw.githubusercontent.com/lowesoftware/image-chart/master/config/default.json) in the config folder to change configuration.


Chart Configuration
---

Charts are configured by setting configuration parameters. Available querystring parameters are:



License
---

[MIT License](https://raw.githubusercontent.com/lowesoftware/image-chart/master/LICENSE)