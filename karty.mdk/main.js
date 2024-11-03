const { entrypoints } = require("uxp");

showAlert = () => {
  alert("This is an alert message");
}

entrypoints.setup({
  plugin: async () => {
    const config = require('./config.json');
    window.config = config;
  },
  panels: {
    Karty: {
      show(node) { }
    }
  }
});




const app = require('photoshop').app;
const constants = require('photoshop').constants;
const fs = require('uxp').storage.localFileSystem;
const SolidColor = require("photoshop").app.SolidColor;
const db = require('./db');


const { TEMPLATE_URL, OUTPUT_DIR, SRC_DIR } = config;
const BASEURL = document.getElementById('discLetter').value + ':/';


// UTILS
const dowthModal = require('./utils/doWithModal');
const openWithModal = require('./utils/openWithModal');
const changeTitle = require('./utils/changeTitle');
const moveLayer = require('./utils/moveLayer');
const alignAtoB = require('./utils/alignAtoB');
const alignAtoBhorizontal = require('./utils/alignAtoBhorizontal');
const changePrevAreaHeight = require('./utils/changePrevAreaHeight');
const changePrevAreaWidth = require('./utils/changePrevAreaWidth');
const selectLayer = require('./utils/selectLayer');


// COLORS
const goldenColor = new SolidColor();
goldenColor.rgb.red = 175;
goldenColor.rgb.green = 134;
goldenColor.rgb.blue = 84;


const mainProcess = async ({ id, przewagi, title, subtitle, led, power, cechy, bg }) => {

  // OPEN DOCUMENTS
 
  await openWithModal(BASEURL + TEMPLATE_URL);
  await openWithModal(`${BASEURL}${SRC_DIR}/${id}.psd`);
  
  

  // GET DOCUMENTS AND LAYERS

  const templateDocument = await app.documents.getByName('szablon.psd');
  const decorationDocument = await app.documents.getByName(`${id}.psd`);

  // COPY DECORATION LAYER


  await decorationDocument.layers.getByName(id.toString()).copy()
  await decorationDocument.close('DONOTSAVECHANGES')
  await templateDocument.paste()
  await templateDocument.activeLayers[0].move(templateDocument.layers.getByName('TEKSTY'), constants.ElementPlacement.PLACEAFTER)

  // RESIZE DECORATION

  const decorationLayer = templateDocument.layers.getByName(id.toString());
  const VERTICAL = decorationLayer.boundsNoEffects.height > decorationLayer.boundsNoEffects.width;
  const LONG = decorationLayer.boundsNoEffects.width / decorationLayer.boundsNoEffects.height > 2;
  let scale = null;

  if (VERTICAL) {
    scale = 500 / decorationLayer.boundsNoEffects.height * 100;
    decorationLayer.scale(scale, scale);
  } else {
    scale = 500 / decorationLayer.boundsNoEffects.width * 100;
    decorationLayer.scale(scale, scale);
  }


  // ALIGN DECORATION

  await alignAtoB(decorationLayer, templateDocument.layers.getByName('BGAREA'));

  // TITLE    

  const titleLayer = templateDocument.layers.getByName('TEKSTY').layers.getByName('TYTUL');
  await changeTitle(titleLayer.id, title);

  // SUBTITLE

  const subtitleLayer = await templateDocument.createTextLayer({
    contents: subtitle,
    fontSize: 22.92,
    fontName: 'Lato-Regular',
    position: {
      x: titleLayer.boundsNoEffects.left + 3,
      y: titleLayer.boundsNoEffects.bottom + 55
    },
    textColor: goldenColor
  })

  subtitleLayer.name = "PODTYTUL";

  let offset = subtitleLayer.bounds.bottom + 13;

  // PRZEWAGI

  for (const element of przewagi) {
    const przewagaLayer = templateDocument.layers.getByName('TEKSTY').layers.getByName('PRZEWAGI').layers.getByName(element);
    await moveLayer(element, przewagaLayer.id, subtitleLayer.boundsNoEffects.left, offset);
    offset += przewagaLayer.boundsNoEffects.height + 13;
    przewagaLayer.visible = true;
  }

  // CREATE PREVIEW

  const previewGroup = templateDocument.layers.getByName('WYMIARY');
  const previewalign = previewGroup.layers.getByName('previewalign');
  // Move preview group to the bottom
  await moveLayer(previewGroup.name, previewGroup.id, subtitleLayer.boundsNoEffects.left, offset);
  //  Create preview image by duplicate and scale it
  const prevImage = await decorationLayer.duplicate();
  prevImage.name = 'preview image';
  prevImage.move(previewGroup, 'placeInside');

  if (VERTICAL) {
    console.error('VERTICAL');
    const PREVIEWIMAGESCALE = 120 / prevImage.bounds.height * 100;
    await selectLayer(prevImage);
    await prevImage.scale(PREVIEWIMAGESCALE, PREVIEWIMAGESCALE);
    await changePrevAreaHeight(previewalign, prevImage.bounds.height);
    await changePrevAreaWidth(previewalign, prevImage.boundsNoEffects.width, 0);
    await selectLayer(prevImage);
    await alignAtoB(prevImage, previewalign);

  } else if (LONG) {
    console.error('LONG');

    const PREVSCALE = (180) / prevImage.boundsNoEffects.width * 100;
    await selectLayer(prevImage);
    await prevImage.scale(PREVSCALE, PREVSCALE);
    await changePrevAreaHeight(previewalign, prevImage.boundsNoEffects.height);
    await selectLayer(prevImage);
    await alignAtoB(prevImage, previewalign);
  } else {
    console.error('SQUARE');
    const PREVSCALE = (105) / prevImage.boundsNoEffects.width * 100;
    await selectLayer(prevImage);
    await prevImage.scale(PREVSCALE, PREVSCALE);
    await changePrevAreaHeight(previewalign, prevImage.boundsNoEffects.height);
    await selectLayer(prevImage);
    await alignAtoB(prevImage, previewalign);
  }

  previewalign.visible = false;

  // WIDTH
  const widthGroup = previewGroup.layers.getByName('width');
  const widthLine = widthGroup.layers.getByName('width-line');
  const widthText = widthGroup.layers.getByName('width-text');

  await changePrevAreaWidth(widthLine, prevImage.boundsNoEffects.width);
  await selectLayer(widthText);
  await alignAtoBhorizontal(widthText, previewalign);
  await selectLayer(widthLine);
  await alignAtoBhorizontal(widthLine, previewalign);
  await moveLayer(widthGroup.name, widthGroup.id, 0, previewalign.boundsNoEffects.bottom - widthGroup.boundsNoEffects.top + 10);



  // HEIGHT

  const heightGroup = await previewGroup.layers.getByName('height');
  const heightLine = await heightGroup.layers.getByName('height-line');
  const heightText = await heightGroup.layers.getByName('height-text');

  await changePrevAreaWidth(heightLine, prevImage.boundsNoEffects.height);
  await selectLayer(heightText);
  await alignAtoBhorizontal(heightText, heightLine);
  await selectLayer(heightGroup);
  await heightGroup.rotate(-90, constants.AnchorPosition.TOPLEFT);
  await moveLayer(heightGroup.name, heightGroup.id, prevImage.boundsNoEffects.right - heightGroup.boundsNoEffects.left + 10, heightGroup.boundsNoEffects.height);



  // DEPTH

  const depthGroup = await previewGroup.layers.getByName('depth');
  await moveLayer(depthGroup.name, depthGroup.id, heightGroup.boundsNoEffects.right - depthGroup.boundsNoEffects.left - 15, heightGroup.boundsNoEffects.bottom - depthGroup.boundsNoEffects.bottom + 22);

  // ID

  const idTextItem = templateDocument.layers.getByName('TEKSTY').layers.getByName('DANE TECH').layers.getByName('ID').textItem;
  idTextItem.contents = `ID: ${id}`;

  // LED MOC

  const ledMocTextItem = templateDocument.layers.getByName('TEKSTY').layers.getByName('DANE TECH').layers.getByName('LED_MOC').textItem;
  ledMocTextItem.contents = `pkt. led: ${led}, MOC: ${power}W`;


  // PRZEWAGI

  const cecha1 = templateDocument.layers.getByName('TEKSTY').layers.getByName('CECHY').layers.getByName('CECHA_1');
  cecha1.textItem.contents = cechy[0];

  if (cechy.length > 1) {
    let i = 2
    let cechaOffset = cecha1.bounds.right + 40;
    for (const element of cechy.slice(1)) {
      const cecha = await cecha1.duplicate();
      cecha.name = `CECHA_${i}`;
      cecha.textItem.contents = element;
      await selectLayer(cecha);
      await moveLayer(cecha.name, cecha.id, cechaOffset - cecha.bounds.left, 0);
      cechaOffset += cecha.boundsNoEffects.width + 40;
    }
  }

  // BG
  if (templateDocument.layers.getByName('BGS').layers.getByName(bg)) {
    const bgLayer = templateDocument.layers.getByName('BGS').layers.getByName(bg);
    bgLayer.visible = true;
    templateDocument.layers.getByName('BGAREA').visible = false;
  }



  // SAVE
  console.log(`${document.getElementById('discLetter').value}:/${OUTPUT_DIR}/${id}.psd`);
  
  const resultEntry = await fs.createEntryWithUrl(`${document.getElementById('discLetter').value}:/${OUTPUT_DIR}/${id}.psd`, { overwrite: true });
  await templateDocument.saveAs.psd(resultEntry);
  await templateDocument.close('DONOTSAVECHANGES');

  if (document.getElementById('openAfterSave').checked) {
    await openWithModal(`${BASEURL + OUTPUT_DIR}/${id}.psd`);
  }
}

async function mainLoop() {

  if (document.getElementById('idField').value) {

    const id = document.getElementById('idField').value;
    const data = await fetch('https://dekoracjebaz.byst.re');
    const res = await data.json();
    const element = res.filter(entry => entry.id === Number(id))[0];
 
    if(!element){
      alert('PM nie dodał jeszcze tego ID do bazy');
      return;
    }

    try {
      await dowthModal(() => mainProcess(element));
    } catch (error) {
      console.error(error);
    }

  } else {
    return;
  }

}



document.getElementById('btnGenerate').addEventListener('click', mainLoop);