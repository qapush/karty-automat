import * as deepl from 'deepl-node';

const authKey = process.env.DEEPL_KEY; // Replace with your key
const translator = new deepl.Translator(authKey);

(async () => {
    const result = await translator.translateText('ZAPRZęG łABęDZI'.toLocaleLowerCase(), null, 'fr');
    console.log(result.text); // Bonjour, le monde !
})();