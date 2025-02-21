'use client'
import { useState, useEffect } from 'react';
import styles from './SelectPrzewagi.module.css'

export default function SelectPrzewagi({ selected, all, onChange }) {
    

    const [selectedPrzewagi, setSelectedPRzewagi] = useState(selected);

    const handleClick = (id) => {

        
        
        if(selectedPrzewagi.includes(id)){
            setSelectedPRzewagi(prev => prev.filter(i => i !== id))
        } else {
            if(selectedPrzewagi.length >= 4) return;
            setSelectedPRzewagi(prev => [...prev, id])
        }

    }

    useEffect(() => {
        onChange(selectedPrzewagi)
    }, [selectedPrzewagi])

    return <>

        <label>
            Przewagi:
        </label>
        <div className={styles.selectPrzewagi}>
            <div className={styles.col}>
                <h4 className={styles.colTitle}>Do wyboru</h4>
                {
                    all
                    .filter(i => !selectedPrzewagi.includes(i.id))
                    .map(i => PrzewagaItem(i, handleClick))
                }
            </div>
            <div className={styles.col}>
                <h4 className={styles.colTitle}>Wybrane</h4>
                {
                    all
                    .filter(i => {
                        return selectedPrzewagi.some( t => t === i.id)
                    })
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