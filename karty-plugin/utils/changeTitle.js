// Events recognized as notifiers are not re-playable in most of the cases. There is high chance that generated code won't work.

const {executeAsModal} = require("photoshop").core;
const {batchPlay} = require("photoshop").action;


module.exports = async function (layerId, title) {
   
   
   await executeAsModal( async () => batchPlay( [
      {
          "_obj": "select",
          "_target": [
             {
                "_ref": "layer",
                "_name": "TYTUL"
             }
          ],
          "makeVisible": false,
          "layerID": [
              layerId
          ],
          "_isCommand": false
       },
      {
         _obj: "set",
         _target: [
            {
               _ref: "textLayer",
               _enum: "ordinal",
               _value: "targetEnum"
            }
         ],
         to: {
            _obj: "textLayer",
            textKey: title.replace(/\n/g, '\r'),
            warp: {
               _obj: "warp",
               warpStyle: {
                  _enum: "warpStyle",
                  _value: "warpNone"
               },
               warpValue: 0,
               warpPerspective: 0,
               warpPerspectiveOther: 0,
               warpRotate: {
                  _enum: "orientation",
                  _value: "horizontal"
               }
            },
            textGridding: {
               _enum: "textGridding",
               _value: "none"
            },
            orientation: {
               _enum: "orientation",
               _value: "horizontal"
            },
            antiAlias: {
               _enum: "antiAliasType",
               _value: "antiAliasSharp"
            },
            bounds: {
               _obj: "bounds",
               left: {
                  _unit: "pixelsUnit",
                  _value: -5.8328399658203125
               },
               top: {
                  _unit: "pixelsUnit",
                  _value: -173.3244171142578
               },
               right: {
                  _unit: "pixelsUnit",
                  _value: 784.3379516601562
               },
               bottom: {
                  _unit: "pixelsUnit",
                  _value: 57.339900970458984
               }
            },
            boundingBox: {
               _obj: "boundingBox",
               left: {
                  _unit: "pixelsUnit",
                  _value: -5.9375
               },
               top: {
                  _unit: "pixelsUnit",
                  _value: -149.34375
               },
               right: {
                  _unit: "pixelsUnit",
                  _value: 784.234130859375
               },
               bottom: {
                  _unit: "pixelsUnit",
                  _value: 36.1875
               }
            },
            textShape: [
               {
                  _obj: "textShape",
                  char: {
                     _enum: "char",
                     _value: "paint"
                  },
                  orientation: {
                     _enum: "orientation",
                     _value: "horizontal"
                  },
                  transform: {
                     _obj: "transform",
                     xx: 1,
                     xy: 0,
                     yx: 0,
                     yy: 1,
                     tx: 0,
                     ty: 0
                  },
                  rowCount: 1,
                  columnCount: 1,
                  rowMajorOrder: true,
                  rowGutter: {
                     _unit: "pixelsUnit",
                     _value: 0
                  },
                  columnGutter: {
                     _unit: "pixelsUnit",
                     _value: 0
                  },
                  spacing: {
                     _unit: "pixelsUnit",
                     _value: 0
                  },
                  frameBaselineAlignment: {
                     _enum: "frameBaselineAlignment",
                     _value: "alignByAscent"
                  },
                  firstBaselineMinimum: {
                     _unit: "pixelsUnit",
                     _value: 0
                  },
                  base: {
                     _obj: "paint",
                     horizontal: 0,
                     vertical: 0
                  }
               }
            ],
            textStyleRange: [
               {
                  _obj: "textStyleRange",
                  from: 0,
                  to: 1,
                  textStyle: {
                     _obj: "textStyle",
                     styleSheetHasParent: true,
                     fontPostScriptName: "DMSerifText-Italic",
                     fontName: "DM Serif Text",
                     fontStyleName: "Italic",
                     fontScript: 0,
                     fontTechnology: 0,
                     fontAvailable: true,
                     size: {
                        _unit: "pointsUnit",
                        _value: 50
                     },
                     impliedFontSize: {
                        _unit: "pointsUnit",
                        _value: 50
                     },
                     horizontalScale: 100,
                     verticalScale: 100,
                     syntheticBold: false, 
                     syntheticItalic: false,
                     autoLeading: false,
                     leading: {
                        _unit: "pixelsUnit",
                        _value: 189.35533142089844
                     },
                     impliedLeading: {
                        _unit: "pixelsUnit",
                        _value: 99.99999248962392
                     },
                     tracking: 0,
                     baselineShift: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     impliedBaselineShift: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     characterRotation: 0,
                     autoKern: {
                        _enum: "autoKern",
                        _value: "metricsKern"
                     },
                     fontCaps: {
                        _enum: "fontCaps",
                        _value: "normal"
                     },
                     digitSet: {
                        _enum: "digitSet",
                        _value: "arabicDigits"
                     },
                     kashidas: {
                        _enum: "kashidas",
                        _value: "kashidaDefault"
                     },
                     diacVPos: {
                        _enum: "diacVPos",
                        _value: "diacVPosOpenType"
                     },
                     diacXOffset: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     diacYOffset: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     markYDistFromBaseline: {
                        _unit: "pixelsUnit",
                        _value: 100
                     },
                     baseline: {
                        _enum: "baseline",
                        _value: "normal"
                     },
                     otbaseline: {
                        _enum: "otbaseline",
                        _value: "normal"
                     },
                     strikethrough: {
                        _enum: "strikethrough",
                        _value: "strikethroughOff"
                     },
                     underline: {
                        _enum: "underline",
                        _value: "underlineOff"
                     },
                     ligature: true,
                     altligature: false,
                     contextualLigatures: true,
                     alternateLigatures: false,
                     oldStyle: false,
                     fractions: false,
                     ordinals: false,
                     swash: false,
                     titling: false,
                     connectionForms: false,
                     stylisticAlternates: false,
                     stylisticSets: 0,
                     ornaments: false,
                     justificationAlternates: false,
                     figureStyle: {
                        _enum: "figureStyle",
                        _value: "normal"
                     },
                     proportionalMetrics: false,
                     kana: false,
                     italics: false,
                     baselineDirection: {
                        _enum: "baselineDirection",
                        _value: "withStream"
                     },
                     textLanguage: {
                        _enum: "textLanguage",
                        _value: "polishLanguage"
                     },
                     japaneseAlternate: {
                        _enum: "japaneseAlternate",
                        _value: "defaultForm"
                     },
                     mojiZume: 0,
                     gridAlignment: {
                        _enum: "gridAlignment",
                        _value: "roman"
                     },
                     noBreak: false,
                     color: {
                        _obj: "RGBColor",
                        red: 10.001099444925785,
                        grain: 47.99865201115608,
                        blue: 169.99830275774002
                     },
                     strokeColor: {
                        _obj: "RGBColor",
                        red: 255,
                        grain: 255,
                        blue: 255
                     },
                     baseParentStyle: {
                        _obj: "textStyle",
                        fontPostScriptName: "MyriadPro-Regular",
                        fontName: "Myriad Pro",
                        fontStyleName: "Regular",
                        fontScript: 0,
                        fontTechnology: 0,
                        fontAvailable: true,
                        size: {
                           _unit: "pixelsUnit",
                           _value: 12
                        },
                        impliedFontSize: {
                           _unit: "pixelsUnit",
                           _value: 6.337291381609589
                        },
                        horizontalScale: 100,
                        verticalScale: 100,
                        syntheticBold: false,
                        syntheticItalic: false,
                        autoLeading: true,
                        tracking: 0,
                        baselineShift: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        impliedBaselineShift: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        characterRotation: 0,
                        autoKern: {
                           _enum: "autoKern",
                           _value: "metricsKern"
                        },
                        fontCaps: {
                           _enum: "fontCaps",
                           _value: "normal"
                        },
                        digitSet: {
                           _enum: "digitSet",
                           _value: "defaultDigits"
                        },
                        dirOverride: {
                           _enum: "dirOverride",
                           _value: "dirOverrideDefault"
                        },
                        kashidas: {
                           _enum: "kashidas",
                           _value: "kashidaDefault"
                        },
                        diacVPos: {
                           _enum: "diacVPos",
                           _value: "diacVPosOpenType"
                        },
                        diacXOffset: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        diacYOffset: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        markYDistFromBaseline: {
                           _unit: "pixelsUnit",
                           _value: 100
                        },
                        baseline: {
                           _enum: "baseline",
                           _value: "normal"
                        },
                        otbaseline: {
                           _enum: "otbaseline",
                           _value: "normal"
                        },
                        strikethrough: {
                           _enum: "strikethrough",
                           _value: "strikethroughOff"
                        },
                        underline: {
                           _enum: "underline",
                           _value: "underlineOff"
                        },
                        underlineOffset: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        ligature: true,
                        altligature: false,
                        contextualLigatures: false,
                        alternateLigatures: false,
                        oldStyle: false,
                        fractions: false,
                        ordinals: false,
                        swash: false,
                        titling: false,
                        connectionForms: false,
                        stylisticAlternates: false,
                        stylisticSets: 0,
                        ornaments: false,
                        justificationAlternates: false,
                        figureStyle: {
                           _enum: "figureStyle",
                           _value: "normal"
                        },
                        proportionalMetrics: false,
                        kana: false,
                        italics: false,
                        ruby: false,
                        baselineDirection: {
                           _enum: "baselineDirection",
                           _value: "rotated"
                        },
                        textLanguage: {
                           _enum: "textLanguage",
                           _value: "englishLanguage"
                        },
                        japaneseAlternate: {
                           _enum: "japaneseAlternate",
                           _value: "defaultForm"
                        },
                        mojiZume: 0,
                        gridAlignment: {
                           _enum: "gridAlignment",
                           _value: "roman"
                        },
                        enableWariChu: false,
                        wariChuCount: 2,
                        wariChuLineGap: 0,
                        wariChuScale: 0.5,
                        wariChuWidow: 2,
                        wariChuOrphan: 2,
                        wariChuJustification: {
                           _enum: "wariChuJustification",
                           _value: "wariChuAutoJustify"
                        },
                        tcyUpDown: 0,
                        tcyLeftRight: 0,
                        leftAki: -1,
                        rightAki: -1,
                        jiDori: 0,
                        noBreak: false,
                        color: {
                           _obj: "RGBColor",
                           red: 0,
                           grain: 0,
                           blue: 0
                        },
                        strokeColor: {
                           _obj: "RGBColor",
                           red: 0,
                           grain: 0,
                           blue: 0
                        },
                        fill: true,
                        stroke: false,
                        fillFirst: true,
                        fillOverPrint: false,
                        strokeOverPrint: false,
                        lineCap: {
                           _enum: "lineCap",
                           _value: "buttCap"
                        },
                        lineJoin: {
                           _enum: "lineJoin",
                           _value: "miterJoin"
                        },
                        lineWidth: {
                           _unit: "pixelsUnit",
                           _value: 1
                        },
                        miterLimit: {
                           _unit: "pixelsUnit",
                           _value: 4
                        },
                        lineDashoffset: 0
                     }
                  }
               },
               {
                  _obj: "textStyleRange",
                  from: 1,
                  to: title.length,
                  textStyle: {
                     _obj: "textStyle",
                     styleSheetHasParent: true,
                     fontPostScriptName: "Lato-Bold",
                     fontName: "Lato",
                     fontStyleName: "Bold",
                     fontScript: 0,
                     fontTechnology: 1,
                     fontAvailable: true,
                     size: {
                        _unit: "pointsUnit",
                        _value: 50
                     },
                     impliedFontSize: {
                        _unit: "pointsUnit",
                        _value: 50
                     },
                     horizontalScale: 100,
                     verticalScale: 100,
                     syntheticBold: false,
                     syntheticItalic: false,
                     autoLeading: false,
                     leading: {
                        _unit: "pixelsUnit",
                        _value: 189.35533142089844
                     },
                     impliedLeading: {
                        _unit: "pixelsUnit",
                        _value: 99.99999248962392
                     },
                     tracking: 0,
                     baselineShift: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     impliedBaselineShift: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     characterRotation: 0,
                     autoKern: {
                        _enum: "autoKern",
                        _value: "metricsKern"
                     },
                     fontCaps: {
                        _enum: "fontCaps",
                        _value: "normal"
                     },
                     digitSet: {
                        _enum: "digitSet",
                        _value: "arabicDigits"
                     },
                     kashidas: {
                        _enum: "kashidas",
                        _value: "kashidaDefault"
                     },
                     diacVPos: {
                        _enum: "diacVPos",
                        _value: "diacVPosOpenType"
                     },
                     diacXOffset: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     diacYOffset: {
                        _unit: "pixelsUnit",
                        _value: 0
                     },
                     markYDistFromBaseline: {
                        _unit: "pixelsUnit",
                        _value: 100
                     },
                     baseline: {
                        _enum: "baseline",
                        _value: "normal"
                     },
                     otbaseline: {
                        _enum: "otbaseline",
                        _value: "normal"
                     },
                     strikethrough: {
                        _enum: "strikethrough",
                        _value: "strikethroughOff"
                     },
                     underline: {
                        _enum: "underline",
                        _value: "underlineOff"
                     },
                     ligature: true,
                     altligature: false,
                     contextualLigatures: true,
                     alternateLigatures: false,
                     oldStyle: false,
                     fractions: false,
                     ordinals: false,
                     swash: false,
                     titling: false,
                     connectionForms: false,
                     stylisticAlternates: false,
                     stylisticSets: 0,
                     ornaments: false,
                     justificationAlternates: false,
                     figureStyle: {
                        _enum: "figureStyle",
                        _value: "normal"
                     },
                     proportionalMetrics: false,
                     kana: false,
                     italics: false,
                     baselineDirection: {
                        _enum: "baselineDirection",
                        _value: "withStream"
                     },
                     textLanguage: {
                        _enum: "textLanguage",
                        _value: "polishLanguage"
                     },
                     japaneseAlternate: {
                        _enum: "japaneseAlternate",
                        _value: "defaultForm"
                     },
                     mojiZume: 0,
                     gridAlignment: {
                        _enum: "gridAlignment",
                        _value: "roman"
                     },
                     noBreak: false,
                     color: {
                        _obj: "RGBColor",
                        red: 10.001099444925785,
                        grain: 47.99865201115608,
                        blue: 169.99830275774002
                     },
                     strokeColor: {
                        _obj: "RGBColor",
                        red: 255,
                        grain: 255,
                        blue: 255
                     }
                  }
               }
            ],
            paragraphStyleRange: [
               {
                  _obj: "paragraphStyleRange",
                  from: 0,
                  to: 10,
                  paragraphStyle: {
                     _obj: "paragraphStyle",
                     styleSheetHasParent: true,
                     align: {
                        _enum: "alignmentType",
                        _value: "left"
                     },
                     directionType: {
                        _enum: "directionType",
                        _value: "dirLeftToRight"
                     },
                     hyphenate: true,
                     textComposerEngine: {
                        _enum: "textComposerEngine",
                        _value: "textOptycaComposer"
                     },
                     defaultStyle: {
                        _obj: "textStyle",
                        fontPostScriptName: "MyriadPro-Regular",
                        fontName: "Myriad Pro",
                        fontStyleName: "Regular",
                        fontScript: 0,
                        fontTechnology: 0,
                        fontAvailable: true,
                        size: {
                           _unit: "pixelsUnit",
                           _value: 12
                        },
                        horizontalScale: 100,
                        verticalScale: 100,
                        syntheticBold: false,
                        syntheticItalic: false,
                        autoLeading: true,
                        tracking: 0,
                        baselineShift: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        characterRotation: 0,
                        autoKern: {
                           _enum: "autoKern",
                           _value: "metricsKern"
                        },
                        fontCaps: {
                           _enum: "fontCaps",
                           _value: "normal"
                        },
                        digitSet: {
                           _enum: "digitSet",
                           _value: "arabicDigits"
                        },
                        kashidas: {
                           _enum: "kashidas",
                           _value: "kashidaDefault"
                        },
                        diacVPos: {
                           _enum: "diacVPos",
                           _value: "diacVPosOpenType"
                        },
                        diacXOffset: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        diacYOffset: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        markYDistFromBaseline: {
                           _unit: "pixelsUnit",
                           _value: 0
                        },
                        baseline: {
                           _enum: "baseline",
                           _value: "normal"
                        },
                        strikethrough: {
                           _enum: "strikethrough",
                           _value: "strikethroughOff"
                        },
                        underline: {
                           _enum: "underline",
                           _value: "underlineOff"
                        },
                        ligature: true,
                        altligature: false,
                        contextualLigatures: true,
                        alternateLigatures: false,
                        oldStyle: false,
                        fractions: false,
                        ordinals: false,
                        swash: false,
                        titling: false,
                        connectionForms: true,
                        stylisticAlternates: false,
                        stylisticSets: 0,
                        ornaments: false,
                        figureStyle: {
                           _enum: "figureStyle",
                           _value: "normal"
                        },
                        baselineDirection: {
                           _enum: "baselineDirection",
                           _value: "withStream"
                        },
                        textLanguage: {
                           _enum: "textLanguage",
                           _value: "polishLanguage"
                        },
                        color: {
                           _obj: "RGBColor",
                           red: 0,
                           grain: 0,
                           blue: 0
                        },
                        strokeColor: {
                           _obj: "RGBColor",
                           red: 0,
                           grain: 0,
                           blue: 0
                        }
                     }
                  }
               }
            ],
            kerningRange: []
         },
         _options: {
            dialogOptions: "dontDisplay"
         }
      }
   ],
    {}), {"commandName": "Action Commands"});
}
