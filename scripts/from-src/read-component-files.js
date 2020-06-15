const fs = require('fs');
const path = require('path');
const componentNames = require('../component-names')();

module.exports = function(callback) {
	const componentsPath = path.join(__dirname, '../../packages/components');
	componentNames.forEach(function(componentName) {
		const componentDirectory = `${componentsPath}/${componentName}`;
		fs.readFile(`${componentDirectory}/src/${componentName}.js`, 'utf8', function(err, data) {
			if (err) {
				console.log('Error while reading source file', err);
				return;
			}
			const content = data.replace(/\n|\r/g, '').replace(/\t|\r/g, '');
			callback(componentName, content);
		});
	});
};
