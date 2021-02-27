const fs = require('fs');
const argv = process.argv;

const cat = (path) => {
    fs.readFile(path, 'utf8', (err, data) => {
        if(err){
            console.log(`ERROR: Unable to read ${path}`);
            console.log("ERROR: ", err);
            process.exit(1);
        }
        console.log("File: ", data);
    })
}
cat(argv[2]);