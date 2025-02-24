const openWithModal = require('../utils/openWithModal');

module.exports = async () => {

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

    // SETTINGS DESIGNLETTER

    const designLetter = () => localStorage.getItem('designLetter') ?
        `Ustawiona teraz: ${localStorage.getItem('designLetter')}` :
        `Nie ustawiono, zmień poniżej`;

    document.getElementById('designLetter').innerText = designLetter();


    document.getElementById('btnChangeDesignLetter').addEventListener('click', () => {
        if (true || document.getElementById('discLetter').value) {
            localStorage.setItem('designLetter', document.getElementById('discLetter').value);
            document.getElementById('discLetter').value = '';
            document.getElementById('designLetter').innerText = designLetter();
        }
    });

    // SETTINGS FOLDER NAME

    const folderName = () => localStorage.getItem('folderName') ?
        `Ustawione teraz: ${localStorage.getItem('folderName')}` :
        `Nie ustawiono, zmień poniżej`;

    document.getElementById('tempFolderNameText').innerText = folderName();


    document.getElementById('btnChangeTempFolderName').addEventListener('click', () => {
        if (true || document.getElementById('tempFolderName').value) {
            localStorage.setItem('folderName', document.getElementById('tempFolderName').value);
            document.getElementById('tempFolderNameText').innerText = folderName();
            document.getElementById('tempFolderName').value = '';
        }
    });


    // OPEN NO ID FILE

    document.getElementById('btnNoIdPsd').addEventListener('click', async () => {

        const { TEMP_DIR } = config;

        const BASEURL = localStorage.getItem('designLetter') + ':/';

        if (!localStorage.getItem('folderName')) {

            const folderNamePrompt = window.prompt('Ustaw swoje inicjały poniżej. Rowniez można je zmienić w zakładce "ustawienia"');
            localStorage.setItem('folderName', folderNamePrompt);
            document.getElementById('tempFolderNameText').innerText = folderName();
        }

        if (localStorage.getItem('folderName')) {
            await openWithModal(`${BASEURL}${TEMP_DIR}/${localStorage.getItem('folderName')}/${localStorage.getItem('folderName')}.psd`);
            alert('Pamiętaj aby nazwać warstwę inicjałami :)')
        }
    });
}