let fs = require('fs');
let inputData = [];
let outputData = {};
let exportFunction = module.exports = {};

exportFunction.FileInteract = function(inputFile, outputFile){
	fs.readFile(inputFile, (error, data) => {
		if (error) {
			return console.error();
		}

		readedData = data.toString();

		let i = 0;
		while (readedData) {
			inputData[i] = readedData.slice(0, readedData.indexOf("\n"));
			i++;
			readedData = readedData.substring(readedData.indexOf("\n") + 1);
		}

		inputData.forEach((value, index) => {
			if (outputData[value[0]]) {
				outputData[value[0]] = outputData[value[0]] + parseInt(value.substring(value.indexOf(" ") + 1));
			} else {
				outputData[value[0]] = parseInt(value.substring(value.indexOf(" ") + 1));
			}
		})

		let appendFile = fs.createWriteStream(outputFile, {'flags' : 'a'});
		for (var j = 0; j < Object.keys(outputData).length; j++) {
			appendFile.write(Object.keys(outputData)[j] + " " + outputData[Object.keys(outputData)[j]] + '\n');
		}
	  appendFile.end();
	})
}
