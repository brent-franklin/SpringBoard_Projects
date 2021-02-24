const fs = require('fs');
const axios = require('axios');
const argv = process.argv;

const cat = (path, fileName) => {
        fs.readFile(path, 'utf8', (err, data) => {
            if(err){
                console.log(`ERROR: Unable to read ${path}`);
                console.log("ERROR: ", err);
                process.exit(1);
            }
        if(fileName){
            writeToFile(fileName, data);
        } else {
            console.log(data);
        }
    })
}

const webCat = async (url, fileName) => {
    try {
        const webpage = await axios.get(url);
        if(fileName){
            writeToFile(fileName, webpage.data, url);
        } else {
            console.log(webpage.data);
        }
    } catch (err) {
        console.log(`Error fetching "${url}"`);
        console.log(`Error: Request failed with "${err}"`);
    } 
}

const writeToFile = (fileName, data, url) => {
    fs.writeFile(fileName, data, 'utf8', (err) => {
        if(err){
            console.log(`Error wrting from "${url}"`);
            console.log(`Error: Request failed with "${err}"`);
            process.exit(1);
        }       
    })
}

const readFromFile = (data, fileName, action) => {
             fs.readFile(data, 'utf8', (err, info) => {
                if(err){
                    console.log(`ERROR: Unable to read ${data}`);
                    console.log("ERROR: ", err);
                    process.exit(1);
                }
                action(fileName, info);
            })
}

const appendFromFile = (fileName, info) => {
    fs.appendFile(fileName, info, (err) =>{
                    if(err){
                        console.log(`Error writing from "${info}"`);
                        console.log(`Error: Request failed with "${err}"`);
                        process.exit(1);
                    }
                })

}

const appendFromURL = async (fileName, url) => {
            try{
                const webpage = await axios.get(url);
                fs.appendFile(fileName, webpage.data, (err) =>{
                    if(err){
                        console.log(`Error writing from "${url}"`);
                        console.log(`Error: Request failed with "${err}"`);
                        process.exit(1);
                    }
                })
            } catch (err) {
                console.log(`Error fetching "${url}"`);
                console.log(`Error: Request failed with "${err}"`);
            }
}

const fileOutput = (input=argv[4], newFile=argv[3]) => {
        if(input.includes("http")){
            webCat(input, newFile);
        } else {
            cat(input, newFile);
        }     
}

const consoleOutput = (input=argv[2]) => {
        if(input.includes("http")){
            webCat(input);
        } else {
            cat(input);
        }
}

const handleInput = (args) => {
    if(args[2] === '--multi' || args[3] === '--multi'){
        if(args[3] === '--out' || args[2] === '--out'){
            const [,,,,,...multiArgs] = argv;
            multiArgs.forEach((arg)=>{
                if(arg.includes('http')){
                    appendFromURL(args[4], arg);
                } else {
                    readFromFile(arg, args[4], appendFromFile);
                }
            }) 
        } else {
            const [,,,...multiArgs] = argv;
            multiArgs.forEach((arg) => {
                consoleOutput(arg);
            })
        }
    } else if(args[2] === '--out'){
        fileOutput();
    } else {
        consoleOutput();
    }
}

handleInput(argv);