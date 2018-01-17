/* eslint-disable */

const globalView = require('../lib/globalView.js');

var plot, taOptions = document.getElementById('taOptions'), preStatus = document.getElementById('preStatus');
		
var domready = require("domready");

domready(function () {
	plot = new globalView.GlobalView(document.getElementById('divGlobalView'), {
		pointShape: "Cross"
	});
	
	new RandomDataset(1000, 2, function(dataset) {
		plot.load(dataset, 0, 1, 1, 1);
	});
	
	plot.showData2D();
	
	taOptions.value = JSON.stringify(plot.getOptions(), null, 4);
});

function tOptions_onChange(sender)
{
	var options;
	
	try
	{
		options = JSON.parse(taOptions.value)
	}
	catch (exception)
	{
		preStatus.innerText = exception.message;
		return;
	}
	
	var err;
	if ((err = plot.validateOptions(options)) === true)
	{
		plot.setOptions(options);
		preStatus.innerText = "";
	}
	else
		preStatus.innerText = err;
}