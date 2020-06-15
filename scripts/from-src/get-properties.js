module.exports = function(componentName, content) {
	const srcProperties = getSrcProperties(content);
	const defaults = getDefaultValues(content);
	return getPropertiesObject(srcProperties, defaults);
};

function getSrcProperties(fileContent) {
	let properties = fileContent.split('properties() {return ');
	if (properties.length === 1) {
		return { '': '' }; // fix tablemark error for empty object
	}
	properties = properties[1].split(';')[0];

	return eval('(' + properties + ')');
}

function getPropertiesObject(srcProperties, defaultValues) {
	const outObject = [];
	Object.keys(srcProperties).forEach((propertyName, index) => {
		const propertyData = srcProperties[propertyName];
		delete propertyData.reflect; // delete reflect since it's not useful information for readme
		outObject[index] = {
			Property: propertyName,
			Attribute: propertyData.attribute || propertyName,
			Type: getPropertyType(propertyData),
			Default: getDefaultValueOfProperty(propertyName, propertyData, defaultValues),
			Description: ''
		};
	});
	return outObject;
}

function getDefaultValues(fileContent) {
	const defaultsContent = fileContent.replace(/;/g, '').replace(/ /g, '');
	let defaults = defaultsContent.split('constructor(){super()')[1];
	if (defaults === undefined) {
		return;
	}
	defaults = defaults.split('}')[0];
	defaults = defaults.split('this.').map(data => data.split('='));
	defaults.shift();

	defaults = defaults.filter(item => item.length === 2);
	return defaults.reduce((o, k) => ((o[k[0]] = k[1]), o), {});
}

function getDefaultValueOfProperty(propertyName, propertyData, defaultValues = {}) {
	if (defaultValues[propertyName]) {
		return defaultValues[propertyName];
	} else if (propertyName === 'dir') {
		return 'ltr';
	} else if (getPropertyType(propertyData) === 'Boolean') {
		return 'false';
	}
	return '';
}

function getPropertyType(propertyData) {
	return propertyData && propertyData.type && propertyData.type.name;
}
