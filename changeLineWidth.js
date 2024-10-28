// Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.

const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;


module.exports = async function (lineLayer, width) {
   await executeAsModal( async () => batchPlay( 
      [
         {
            _obj: "select",
            _target: [
               {
                  _ref: "layer",
                  _name: lineLayer.name
               }
            ],
            makeVisible: false,
            layerID: [
               lineLayer.id
            ],
            _options: {
               dialogOptions: "dontDisplay"
            }
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
               _value: "QCSSide3"
            },
            offset: {
               _obj: "offset",
               horizontal: {
                  _unit: "pixelsUnit",
                  _value: 0
               },
               vertical: {
                  _unit: "pixelsUnit",
                  _value: 0
               }
            },
            width: {
               _unit: "pixelUnit",
               _value: width
            },
            interfaceIconFrameDimmed: {
               _enum: "interpolationType",
               _value: "bilinear"
            },
            _options: {
               dialogOptions: "dontDisplay"
            }
         }
      ],
    {}), {"commandName": "Action Commands"});
}
