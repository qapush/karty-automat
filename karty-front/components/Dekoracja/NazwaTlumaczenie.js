'use client';

export default function NazwaTlumaczenie({ titles, locale, handleTłumaczenieChange }) {
     
    return <label >
        Nazwa {locale.toUpperCase()}:
        <textarea
            required
            name="title"
            value={titles[locale]?.title}
            rows={3}
            onChange={handleTłumaczenieChange}
        />
    </label>
}