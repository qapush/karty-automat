const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;


module.exports = async function (layername, layerId, hoffset, voffset) {
    

    const go = await executeAsModal( async () => await batchPlay(
        [
            {
                "_obj": "select",
                "_target": [
                    {
                        "_ref": "layer",
                        "_name": layername
                    }
                ],
                "makeVisible": false,
                "layerID": [
                    layerId
                ],
                "_isCommand": false
            },

            
            {
                "_obj": "move",
                "_target": [
                   {
                    "_ref": "layer",
                    "_name": layername
                   }
                ],
                "to": {
                   "_obj": "offset",
                   "horizontal": {
                      "_unit": "pixelsUnit",
                      "_value": hoffset
                   },
                   "vertical": {
                      "_unit": "pixelsUnit",
                      "_value": voffset
                   }
                },
                "_isCommand": false
             }

        ],
        {}
    ), { "commandName": "Select  layer" });
}