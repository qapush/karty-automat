
const { entrypoints } = require("uxp");
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

const generateById = require('./tasks/generateById');
const dowithModal = require('./utils/doWithModal');
const panelSetup = require('./utils/panelSetup');

panelSetup();

async function mainLoop() {
  
  // Map users to noid decorations
  const { NOID_MAP } = config;
  const noid = document.getElementById('noid').checked;

  
  // Prompt user to set design drive letter
  if(!localStorage.getItem('designLetter')) {
    const designletterPrompt = window.prompt('Ustaw literę dysku design poniżej. Rowniez można ją zmienić w zakładce "ustawienia"');
    localStorage.setItem('designLetter', designletterPrompt);
    document.getElementById('designLetter').innerText = designLetter();
  }
  

  // Prompt user to set inititals if creating noid karta
  if( noid && !localStorage.getItem('folderName')) {
    const folderNamePrompt = window.prompt('Ustaw swoje inicjały poniżej. Rowniez można je zmienić w zakładce "ustawienia"');
    localStorage.setItem('folderName', folderNamePrompt);
    document.getElementById('tempFolderNameText').innerText = folderName();
  }
  
  // Create karta by ID or NOID
  if (document.getElementById('idField').value || document.getElementById('noid').checked) {
    
    const id = document.getElementById('noid').checked ? NOID_MAP[localStorage.getItem('folderName')] : document.getElementById('idField').value;
    const data = await fetch(`https://karty-automat.vercel.app/api/dekoracje/${id}`);
    const element = await data.json();
 
    if(element.error){
      alert(`ID ${id} nie znaleziono w bazie`);
      return;
    }

    try {
      await dowithModal(() => generateById(element));  
    } catch (error) {
      console.error(error);
      alert(error)
    }

  } else {
    alert('Podaj ID')
    return;
  }

}



document.getElementById('btnGenerate').addEventListener('click', mainLoop);