// Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.

const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;


module.exports = async function (layer, width, point = 3) {

   
   const scaleFactor = (width / layer.bounds.width) * 100;
   
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
            _target: [
               {
                  _ref: "layer",
                  _enum: "ordinal",
                  _value: "targetEnum"
               }
            ],
            freeTransformCenterState: {
               _enum: "quadCenterState",
               _value: `QCSSide${point}`
            },
            width: {
               _unit: "percentUnit",
               _value: scaleFactor
            },
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
    {}), {"commandName": "Resize prevarea"});
}
