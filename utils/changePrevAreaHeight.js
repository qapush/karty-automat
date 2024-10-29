// Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.

const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;


module.exports = async function (layer, height) {

   const scaleFactor = (height / layer.bounds.height) * 100;
   
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
         },
         {
            _obj: "transform",
            "_target": [
               {
                  "_ref": "layer",
                  "_name": "previewalign"
               }
            ],
            
            freeTransformCenterState: {
               _enum: "quadCenterState",
               _value: "QCSSide0"
            },
            height: {
               _unit: "pixelsUnit",
               _value: scaleFactor
            },
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
    {}), {"commandName": "Resize prevarea"});
}
