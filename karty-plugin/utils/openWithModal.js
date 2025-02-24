const {executeAsModal} = require("photoshop").core;
const fs = require('uxp').storage.localFileSystem;
const app = require('photoshop').app;

module.exports = async function (localpath) {
    await executeAsModal( async () => {
        let document = null;
        
        const file = await fs.getEntryWithUrl(localpath);
        
        document = await app.open(file)
        return document;
    } , {"commandName": "Open file"});
 }