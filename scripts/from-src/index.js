const getSrcData = require('./get-data-from-src');
const saveDataFromSrc = require('./save-data-from-src');

module.exports = function() {
	console.log(`getting src data`);

	getSrcData(data => {
		console.log('Got data from source, writing it to file', data.componentName);
		saveDataFromSrc(data.componentName, data.properties);
	});
};
