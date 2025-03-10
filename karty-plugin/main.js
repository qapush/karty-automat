
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
const generateNoId = require('./tasks/generateNoId');
const dowithModal = require('./utils/doWithModal');
const panelSetup = require('./utils/panelSetup');

panelSetup();

const folderName = () => localStorage.getItem('folderName') ?
        `Ustawione teraz: ${localStorage.getItem('folderName')}` :
        `Nie ustawiono, zmień poniżej`;
        
const designLetter = () => localStorage.getItem('designLetter') ?
        `Ustawiona teraz: ${localStorage.getItem('designLetter')}` :
        `Nie ustawiono, zmień poniżej`;


async function idLoop() {


  // Prompt user to set design drive letter
  if (!localStorage.getItem('designLetter')) {
    const designletterPrompt = window.prompt('Ustaw literę dysku design poniżej. Rowniez można ją zmienić w zakładce "ustawienia"');
    localStorage.setItem('designLetter', designletterPrompt);
    document.getElementById('designLetter').innerText = designLetter();
  }


  // Generate karta by id
  if (document.getElementById('idField').value) {
    const id = document.getElementById('idField').value;
    const locale = document.getElementById('id-locale').value;
    const data = await fetch(`https://karty-automat.vercel.app/api/dekoracje/${id}?locale=${locale}`);
    const element = await data.json();

    if (element.error) {
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


async function noidLoop() {

  // Map users to noid decorations
  const { NOID_MAP } = config;

  // Prompt user to set design drive letter
  if (!localStorage.getItem('designLetter')) {
    const designletterPrompt = window.prompt('Ustaw literę dysku design poniżej. Rowniez można ją zmienić w zakładce "ustawienia"');
    localStorage.setItem('designLetter', designletterPrompt);
    document.getElementById('designLetter').innerText = designLetter();
  }


  // Prompt user to set inititals if creating noid karta
  if (!localStorage.getItem('folderName')) {
    const folderNamePrompt = window.prompt('Ustaw swoje inicjały poniżej. Rowniez można je zmienić w zakładce "ustawienia"');
    localStorage.setItem('folderName', folderNamePrompt);
    document.getElementById('tempFolderNameText').innerText = folderName();
  }

  const id = NOID_MAP[localStorage.getItem('folderName')];
  const data = await fetch(`https://karty-automat.vercel.app/api/dekoracje/${id}`);
  const element = await data.json();

  if (element.error) {  
    alert(error);
    return;
  }

  try {
    await dowithModal(() => generateNoId(element));
  } catch (error) {
    console.error(error);
    alert(error)
  }


}




document.getElementById('btnGenerate').addEventListener('click', idLoop);
document.getElementById('btnGenerateNoid').addEventListener('click', noidLoop);