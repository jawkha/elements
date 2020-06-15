const readFiles = require('./read-component-files');
const getProperties = require('./get-properties');

module.exports = callback => {
	readFiles((componentName, content) => {
		console.log(`getting properties from src for: ${componentName}`);
		const properties = getProperties(componentName, content);
		callback({
			componentName,
			properties
		});
	});
};
