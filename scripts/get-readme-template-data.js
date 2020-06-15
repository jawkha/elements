const fs = require('fs');
const path = require('path');
const tablemark = require('tablemark');
const componentsPath = `./packages/components`;

module.exports = function(componentName) {
	const propsFromSrc = readComponentFile(componentName, '/docs/src/properties.json');
	const propsFromReadme = readComponentFile(componentName, '/docs/readme/properties.json');
	propsFromSrc.map(propertyData => {
		// console.log('___________________ ', propertyData.Property, '___________________ ');

		if (propsFromReadme) {
			const samePropFromReadme = propsFromReadme.filter(prop => prop.Property === propertyData.Property);
			// console.log(samePropFromReadme);
			// console.log('&*&*&*&*&&*&*&*& before &*&*&*&*&&*&*&*& ');
			// console.log(propertyData);
			Object.assign(propertyData, samePropFromReadme[0]);
			// console.log('&*&*&*&*&&*&*&*& after &*&*&*&*&&*&*&*& ');
			// console.log(propertyData);
			return propertyData;
		}
	});

	console.log('table input');
	console.table(propsFromSrc);
	console.log('table output');
	console.log(tablemark(propsFromSrc));
	return {
		properties: tablemark(propsFromSrc)
	};
};

function readComponentFile(componentName, filePth) {
	const filePath = path.join(process.cwd(), `${componentsPath}/${componentName}${filePth}`);
	return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
