const stats = require('./lib/stats.js');
const globalView = require('./lib/globalView.js');

// const canvas = document.getElementById('canvas');
// globalView.initCanvas(document.querySelector('#canvas'));
// canvas.innerHTML = `mean = ${stats.mean(1, 2, 3)} !`;

const plot = new globalView.GlobalView(document.querySelector('#div1'), null);
// var plot = new GlobalView(document.getElementById('divGlobalView')); /*-- Line 2 --*/
new RandomDataset(1000, 3, function(dataset) { plot.load(dataset, 0, 1, 2, 2); }); /*-- Line 3 --*/
