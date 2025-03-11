'use client'
import { useState, useEffect } from 'react';
import styles from './SelectCechy.module.css'

export default function SelectCechy({ selected, all, onChange }) {


    const [selectedCechy, setSelectedCechy] = useState(selected);

    const handleClick = (id) => {



        if (selectedCechy.includes(id)) {
            setSelectedCechy(prev => prev.filter(i => i !== id))
        } else {
            if (selectedCechy.length >= 3) return;
            setSelectedCechy(prev => [...prev, id])
        }

    }

    useEffect(() => {
        onChange(selectedCechy)
    }, [selectedCechy])

    return <>

        <label>
            Cechy:
        </label>
        <div className={styles.selectPrzewagi}>
            <div className={styles.col}>
                <h4 className={styles.colTitle}>Do wyboru</h4>
                {
                    all
                        .filter(i => !selectedCechy.includes(i.id))
                        .sort((a, b) => a?.tlumaczenia?.[0].nazwa.localeCompare(b?.tlumaczenia?.[0].nazwa))
                        .map(i => PrzewagaItem(i, handleClick))
                }
            </div>
            <div className={styles.col}>
                <h4 className={styles.colTitle}>Wybrane</h4>
                {
                    all
                        .filter(i => {
                            return selectedCechy.some(t => t === i.id)
                        })
                        .sort((a, b) => a?.tlumaczenia?.[0].nazwa.localeCompare(b?.tlumaczenia?.[0].nazwa))
                        .map(i => PrzewagaItem(i, handleClick))
                }
            </div>

        </div>
    </>
}

function PrzewagaItem(przewaga, handleClick) {
    return <div key={przewaga.id} className={styles.przewagaItem} onClick={() => handleClick(przewaga.id)}>
        <span>{przewaga.tlumaczenia[0].nazwa}</span>
    </div>
}