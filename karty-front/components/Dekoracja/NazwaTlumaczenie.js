'use client';

import { useState } from "react";
import { getTranslation } from "@/app/actions";


export default function NazwaTlumaczenie({ titles, locale, handleTłumaczenieChange }) {

    const [loading, setLoading] = useState(false);
    const [translation, setTranslation] = useState('');

    const handleClick = async () => {

        const res = await getTranslation(titles, locale);
        console.log(res.translations[0].text);
        setTranslation(res.translations[0].text);
    }

    const handleUseTranslation = () => {
        // Call the parent's handler with the AI translation
        handleTłumaczenieChange({
            target: { name: "title", value: translation, dataset: {locale} }
        });
    };

    return <>
        <label >
            Nazwa {locale.toUpperCase()}:
            <textarea
                required
                name="title"
                value={titles[locale]?.title}
                rows={3}
                onChange={handleTłumaczenieChange}
            />
        </label>
        <div>
            <button className="btn" type='button' onClick={handleClick}>Przetłumacz z AI</button>
        </div>
        <div style={{ margin: '1rem 0' }}>
            {translation ? `Tlumaczenie AI: ${translation}` : null}
            {translation ? <button className="btn" type='button' onClick={handleUseTranslation}>Uzyj tłumaczenia AI</button> : null}
        </div>
    </>
}