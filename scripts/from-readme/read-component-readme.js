const fs = require('fs');
const path = require('path');
const componentNames = require('../component-names')();
const componentsPath = './packages/components';

module.exports = function(callback) {
	componentNames.forEach(function(componentName) {
		const componentDirectory = path.join(process.cwd(), `${componentsPath}/${componentName}`);
		fs.readFile(`${componentDirectory}/README.md`, 'utf8', function(err, data) {
			try {
				let propsTable = data.split('## ➤ Properties');
				if (propsTable.length === 1) {
					console.info(componentName, 'No properties table found!');
				} else {
					const table = propsTable[1].split('|\n| --');
					const tableHeader = table[0];
					const tableContent = table[1].split('## ➤')[0].split('- |\n|')[1];
					let tableDataRows = '|'.concat(tableContent).split('|\n');
					tableDataRows = tableDataRows.map(row => {
						const values = row.split('|');
						const trimmed = values.map(value => value.trim());
						trimmed.shift();
						return trimmed;
					});
					const tableHeaderCols = tableHeader.split('|').map(header => header.trim());
					tableHeaderCols.shift();
					tableDataRows.pop();

					const result = tableDataRows.map(row => {
						const rowObj = {};
						row.forEach((col, index) => {
							rowObj[tableHeaderCols[index]] = col;
						});
						return rowObj;
					});
					writeToFile(componentName, result);
				}
			} catch (e) {
				console.log(e);
			}
		});
	});
};

function writeToFile(componentName, outObject) {
	const componentDirectory = path.join(process.cwd(), `${componentsPath}/${componentName}`);

	fs.mkdir(`${componentDirectory}/docs/readme`, { recursive: true }, err => {
		if (err) {
			return console.log(err);
		}
		fs.writeFile(`${componentDirectory}/docs/readme/properties.json`, JSON.stringify(outObject), function(err) {
			if (err) {
				return console.log(err);
			}
		});
	});
}
