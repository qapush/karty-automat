// Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.

const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;


module.exports = async function () {

   
   await executeAsModal( async () => await batchPlay(
      [
         {
            "_obj": "paste",
            "inPlace": true,
            "_isCommand": false
         }
      ],
    {}), {"commandName": "Paste in place"});
}
