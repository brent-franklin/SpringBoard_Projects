const fs = require('fs');
const axios = require('axios')
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

const webCat = async (url) => {
    try {
    const webpage = await axios.get(url);
        console.log(webpage.data)    
    } catch (err) {
        console.log(`Error fetching "${url}"`)
        console.log(`Error: Request failed with "${err}"`)
        process.exit(1);
    }
}

if(argv[2].includes("http")){
    webCat(argv[2]);
} else {
    cat(argv[2]);
}