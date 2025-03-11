'use server';

export const getTranslation = async (titles, locale) => {

    const deepKey = process.env.DEEPL_KEY;
    
    const data = await fetch('https://api-free.deepl.com/v2/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `DeepL-Auth-Key ${deepKey}`
        },
        body: JSON.stringify({
            text: [titles?.pl?.title.replace('\n', ' ')],
            target_lang: locale.toUpperCase(),
            source_lang:"PL"
        })
    })

    if(!data.ok) {
        const res = await data.json();
    }
    

    if(data.ok) {
        const res = await data.json();
        return res;
    }
}