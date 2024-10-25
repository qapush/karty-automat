const core = require('photoshop').core;
const app = require('photoshop').app;
const fs = require('uxp').storage.localFileSystem;


const modalExec = async (somefunc) => {
    await core.executeAsModal(async (executionContext) => {
        await somefunc();
    }, { commandName: "Open and Process File" });
}



const openWithModal = async (filepath) => {
    let document = null;
    const file = await fs.getEntryWithUrl(filepath);
    await modalExec(() => document = app.open(file));
    return document;
}

module.exports = {openWithModal};