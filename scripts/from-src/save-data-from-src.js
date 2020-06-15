const fs = require('fs');
const path = require('path');

module.exports = function writeToFile(componentName, outObject) {
	const componentDirectory = path.join(process.cwd(), `./packages/components/${componentName}`);

	fs.mkdir(`${componentDirectory}/docs/src`, { recursive: true }, err => {
		if (err) {
			return console.log(err);
		}
		fs.writeFile(`${componentDirectory}/docs/src/properties.json`, JSON.stringify(outObject), function(err) {
			if (err) {
				return console.log(err);
			}
		});
	});
};
