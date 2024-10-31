// Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.

const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;


module.exports = async function (layer) {

   
   await executeAsModal( async () => await batchPlay(
      [
         {
            "_obj": "select",
            "_target": [
               {
                  "_ref": "layer",
                  "_name": layer.name
               }
            ],
            "makeVisible": false,
            "layerID": [
               layer.id
            ],
            "_isCommand": false
         }
      ],
    {}), {"commandName": "Resize prevarea"});
}
