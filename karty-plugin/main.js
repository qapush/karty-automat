const { entrypoints } = require("uxp");
const {batchPlay} = require("photoshop").action;

// PANEL 

Array.from(document.querySelectorAll(".sp-tab")).forEach(theTab => {
  theTab.onclick = () => {
    localStorage.setItem("currentTab", theTab.getAttribute("id"));
    Array.from(document.querySelectorAll(".sp-tab")).forEach(aTab => {
      if (aTab.getAttribute("id") === theTab.getAttribute("id")) {
        aTab.classList.add("selected");
      } else {
        aTab.classList.remove("selected");
      }
    });
    Array.from(document.querySelectorAll(".sp-tab-page")).forEach(tabPage => {
      if (tabPage.getAttribute("id").startsWith(theTab.getAttribute("id"))) {
        tabPage.classList.add("visible");
      } else {
        tabPage.classList.remove("visible");
      }
    });
  }
});

const designLetter = () => localStorage.getItem('designLetter') ?
                      `Ustawiona teraz: ${localStorage.getItem('designLetter')}` :
                      `Nie ustawiono, zmień poniżej`;

document.getElementById('designLetter').innerText = designLetter();


document.getElementById('btnChangeDesignLetter').addEventListener('click', () =>{
  localStorage.setItem('designLetter', document.getElementById('discLetter').value);
  document.getElementById('designLetter').innerText = designLetter();
});

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



// UTILS
const dowithModal = require('./utils/doWithModal');
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


const mainProcess = async ({ id, przewagi, title, subtitle, led, power, cechy, szerokosc, wysokosc, glebokosc }) => {
  
  
  const BASEURL = localStorage.getItem('designLetter') + ':/';
  
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
  await templateDocument.activeLayers[0].move(templateDocument.layers.getByName('DEKORACJA'), constants.ElementPlacement.PLACEINSIDE)

  // RESIZE DECORATION

  const decorationLayer = templateDocument.layers.getByName('DEKORACJA').layers.getByName(id.toString());
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
  
  
  await changeTitle(titleLayer.id, title.tlumaczenia.filter( i => i.kod_jezyka === 'pl')[0].tytul.toLowerCase());

  // SUBTITLE

  const subtitleLayer = await templateDocument.createTextLayer({
    contents: subtitle,
    fontSize: 22.92,
    fontName: 'Lato-Regular',
    position: {
      x: titleLayer.boundsNoEffects.left - 1,
      y: titleLayer.boundsNoEffects.bottom + 56
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

  // CLEANUP PRZEWAGI

  templateDocument.layers.getByName('TEKSTY').layers.getByName('PRZEWAGI').layers.forEach( (i) => {
    if(!i.visible) i.delete()
  })

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
    
    const PREVIEWIMAGESCALE = 120 / prevImage.bounds.height * 100;
    await selectLayer(prevImage);
    await prevImage.scale(PREVIEWIMAGESCALE, PREVIEWIMAGESCALE);
    await changePrevAreaHeight(previewalign, prevImage.bounds.height);
    await changePrevAreaWidth(previewalign, prevImage.boundsNoEffects.width, 0);
    await selectLayer(prevImage);
    await alignAtoB(prevImage, previewalign);

  } else if (LONG) {


    const PREVSCALE = (180) / prevImage.boundsNoEffects.width * 100;
    await selectLayer(prevImage);
    await prevImage.scale(PREVSCALE, PREVSCALE);
    await changePrevAreaHeight(previewalign, prevImage.boundsNoEffects.height);
    await selectLayer(prevImage);
    await alignAtoB(prevImage, previewalign);
  } else {

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
  
  if(szerokosc != 0){
    if(String(szerokosc).includes('.')) szerokosc = String(szerokosc).replace('.',',');
  } else {
    widthGroup.visible = false;
  }
  
  widthText.textItem.contents = szerokosc  + ' M';
  


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
  
  
  if(wysokosc != 0){
    if(String(wysokosc).includes('.')) wysokosc = String(wysokosc).replace('.',',');
  } else {
    heightGroup.visible = false;
  }
  
  heightText.textItem.contents = wysokosc  + ' M';
  // DEPTH

  const depthGroup = await previewGroup.layers.getByName('depth');
  const depthText = await depthGroup.layers.getByName('depth-text');
  await moveLayer(depthGroup.name, depthGroup.id, heightGroup.boundsNoEffects.right - depthGroup.boundsNoEffects.left - 15, heightGroup.boundsNoEffects.bottom - depthGroup.boundsNoEffects.bottom + 22);
  
  
  
  
  if(glebokosc != 0){
    if(String(glebokosc).includes('.')) glebokosc = String(glebokosc).replace('.',',');
  } else {
    depthGroup.visible = false;
  }
  
  depthText.textItem.contents = glebokosc + ' M';
  // ID

  const idTextItem = templateDocument.layers.getByName('TEKSTY').layers.getByName('DANE TECH').layers.getByName('ID').textItem;
  idTextItem.contents = `ID: ${id}`;

  // LED MOC

  const ledMocTextItem = templateDocument.layers.getByName('TEKSTY').layers.getByName('DANE TECH').layers.getByName('LED_MOC').textItem;
  ledMocTextItem.contents = `pkt. led: ${led}, MOC: ${power}W`;


  // PRZEWAGI

  const cecha1 = templateDocument.layers.getByName('TEKSTY').layers.getByName('CECHY').layers.getByName('CECHA_1');
  
  if(cechy.length === 0) {
    templateDocument.closeWithoutSaving();
    throw new Error('Nie ma cech');
  }
    
  cecha1.textItem.contents = cechy[0].replace(/\n/g, '\r');

  if (cechy.length > 1) {
    let i = 2
    let cechaOffset = cecha1.bounds.right + 40;
    for (const element of cechy.slice(1)) {
     
      
      const cecha = await cecha1.duplicate();
      cecha.name = `CECHA_${i}`;
  
      cecha.textItem.contents = element.replace(/\n/g, '\r');
      await selectLayer(cecha);
      await moveLayer(cecha.name, cecha.id, cechaOffset - cecha.bounds.left, 0);
      cechaOffset += cecha.boundsNoEffects.width + 40;
    }
  }

  // BG
  templateDocument.layers.getByName('BGAREA').delete();
  templateDocument.layers.getByName('BGS').layers.forEach( i => {
    if(i.name !== subtitle) {
      i.merge()
      i.delete()
    }
  })
  



  // REMOVE MIARKI GROUP

  templateDocument.layers.getByName('MIARKI').layers.forEach( i => i.delete());
  templateDocument.layers.getByName('MIARKI').delete();


  // COLLAPSE ALL GROUPS
  await batchPlay(
    [
       // collapse current selected group
          {
            "_obj": "collapseAllGroupsEvent",
            "_isCommand": true,
            "_options": {
              "dialogOptions": "dontDisplay"
            }
          }
    ],{});


  // SAVE

  
  const resultEntry = await fs.createEntryWithUrl(`${localStorage.getItem('designLetter')}:/${OUTPUT_DIR}/${id}.psd`, { overwrite: true });
  await templateDocument.saveAs.psd(resultEntry);
  await templateDocument.close('DONOTSAVECHANGES');

  if (document.getElementById('openAfterSave').checked) {
    await openWithModal(`${BASEURL + OUTPUT_DIR}/${id}.psd`);
  }
}

async function mainLoop() {

  if (document.getElementById('idField').value) {

    const id = document.getElementById('idField').value;
    const data = await fetch(`https://karty-automat.vercel.app/api/dekoracje/${id}`);
    const element = await data.json();
 
    if(element.error){
      alert(`ID ${id} nie znaleziono w bazie`);
      return;
    }

    try {
      await dowithModal(() => mainProcess(element));
    } catch (error) {
      console.error(error);
      alert(error)
    }

  } else {
    return;
  }

}



document.getElementById('btnGenerate').addEventListener('click', mainLoop);