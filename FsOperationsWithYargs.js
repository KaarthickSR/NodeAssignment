//1.FsOperationsWithYargs
var fs = require('fs');
var yargs = require('yargs');
var fileNames = [];

yargs.command({
    command: 'CreateFile',
    describe: 'Creates new file',
    builder: {
        fileName: {
            describe: 'File name',
            demandOption: true, 
            type: 'string'
        }
    },
    handler(argv) {
        fs.writeFile(argv.fileName, 'You are awesome', { flag: "wx" }, (err) => {
            if (err) {
                console.error(argv.fileName, " already exists. Please provide new file name");
                return;
            } else {
                fileNames.push(argv.fileName);
                console.log(argv.fileName, " is created successfully");
                fs.appendFile('FileNames.txt', argv.fileName + " ", (err) => {
                    if (err) {
                        console.log(argv.fileName, " is not appended");
                    } else {
                        console.log(argv.fileName, " is appended successfully");
                    }
                })
            }
        })
    }
});

yargs.parse();
