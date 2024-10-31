const {executeAsModal} = require("photoshop").core;
const fs = require('uxp').storage.localFileSystem;


module.exports = async function (somefunc) {
    await executeAsModal( async () => {
       await somefunc();
        return document;
    } , {"commandName": "Open file"});
 }