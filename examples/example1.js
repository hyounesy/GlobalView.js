const stats = require('../lib/stats.js');
const globalView = require('../lib/globalView.js');
const libDataset = require("../lib/dataset.js");

// document.getElementById('divGlobalView').innerHTML = `mean = ${stats.mean(1, 2, 3, 4.5)} !!!`;
const plot = new globalView.GlobalView(document.querySelector('#divGlobalView'), null);
new libDataset.RandomDataset(1000, 3, function(dataset) { plot.load(dataset, 0, 1, 2, 2); });
