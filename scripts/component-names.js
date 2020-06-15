const fs = require('fs');
const path = require('path');

module.exports = function() {
	const componentsPath = path.join(process.cwd(), '/packages/components');
	return fs.readdirSync(componentsPath).filter(file => !['.DS_Store', 'root'].includes(file));
};
