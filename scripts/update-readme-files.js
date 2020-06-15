const nodePlop = require('node-plop');
const updateDocSource = require('./from-src');
const componentNames = require('./component-names')();

updateDocSource();

const plop = nodePlop(`./plopfile.js`);
const updateReadme = plop.getGenerator('readme');

componentNames.forEach(function(name) {
	updateReadme.runActions({ name }).then(function(results) {
		if (results.failures.length) {
			console.error('failed to update readme file for -> ', name);
			console.error(results.failures);
		}
	});
});
