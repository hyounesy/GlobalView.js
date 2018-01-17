/* eslint-disable */

const globalView = require('../lib/globalView.js');
const domready = require("domready");

function EmptyDataset(n)
{
	Dataset.call(this);
	this.length = n;
}

domready(function () {	
	var plot = new globalView.GlobalView(document.getElementById('divGlobalView'), {
	pointSize: 1.5,
	pointColor: "white"
	});
	var dataset = new EmptyDataset(10000);
	dataset.dataVectors.push(new DataVector(dataset, "i"));
	dataset.dataVectors.push(new DataVector(dataset, "sin(i * 8.0 * PI / n)"));
	dataset.dataVectors.push(new DataVector(dataset, "0.0"));
	plot.load(dataset, 0, 1, 2, 2);
});
