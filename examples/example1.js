const stats = require('../lib/stats.js');
const globalView = require('../lib/globalView.js');

// document.getElementById('divGlobalView').innerHTML = `mean = ${stats.mean(1, 2, 3, 4.5)} !!!`;
const plot = new globalView.GlobalView(document.querySelector('#divGlobalView'), null);
new RandomDataset(1000, 3, function(dataset) { plot.load(dataset, 0, 1, 2, 2); });
