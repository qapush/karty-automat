"use client";

import DeleteButton from "@/components/DeleteButton/DeleteButton";
import styles from "./Cecha.module.css";
import { useState, useCallback } from "react";
import { ToastContainer, toast } from "react-toastify";

export default function Cecha({ cecha, locale }) {
    const [changeMode, setChangeMode] = useState(false);
    
    // Memoize the translation lookup
    const translation = cecha.tlumaczenia.find(i => i.kod_jezyka === locale);

    const [textareaValue, setTextareaValue] = useState(
        translation?.nazwa || "No name available"
    );
    
    // Memoize the translation ID
    const tlumaczenieId = translation?.id;

    const handleSave = useCallback(async () => {
        // Create and store the toast ID
        const toastId = toast.loading("Zapisywanie...");
        
        try {
            const response = await fetch(`/api/cechy/${cecha}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ tlumaczenieId, nazwa: textareaValue, kod_jezyka: locale }),
            });

            console.log(response.ok);
            

            if (!response.ok) {
                const res = await response.json();
                // Update the loading toast to error and ensure it will close
                toast.update(toastId, { 
                    render: res.message || "Error occurred", 
                    type: "error", 
                    isLoading: false,
                    autoClose: 3000,
                    closeButton: true
                });
            } else {
                // Update the loading toast to success with a brief display
                toast.update(toastId, { 
                    render: "Zapisane!", 
                    type: "success", 
                    isLoading: false,
                    autoClose: 1000,
                    closeButton: true
                });
                
                // Force close the toast after a short delay
                setTimeout(() => {
                    setChangeMode(false);
                    toast.dismiss(toastId);
                }, 1000);
            }
        } catch (error) {

            
            // Update the loading toast to error and ensure it will close
            toast.update(toastId, { 
                render: error.message || "An unexpected error occurred", 
                type: "error", 
                isLoading: false,
                autoClose: 3000,
                closeButton: true
            });

            
        }
    }, [cecha.id, tlumaczenieId, textareaValue, locale]);

    const toggleChangeMode = useCallback(() => {
        setChangeMode(prev => !prev);
    }, []);

    const handleTextChange = useCallback((e) => {
        setTextareaValue(e.target.value.toUpperCase());
    }, []);


    return (
        <div>
            {changeMode ? (
                <div className={styles.cecha_change}>
                    <button className="btn" onClick={toggleChangeMode}>X</button>
                    <textarea
                        value={textareaValue.toUpperCase()}
                        onChange={handleTextChange}
                        style={{ margin: 0, display: "block" }}
                    />
                    <div style={{ margin: "1rem 0", display: "block" }}>
                        <button className="btn" onClick={handleSave}>ZAPISZ</button>
                    </div>
                </div>
            ) : (
                <div className={styles.cecha} onClick={toggleChangeMode}>
                    <p dangerouslySetInnerHTML={{ __html: textareaValue.replace(/\n/g, "<br/>").toUpperCase() }}></p>
                    <div className={styles.actions}>
                        <DeleteButton id={cecha.id} />
                    </div>
                </div>
            )}
            <ToastContainer 
                position="top-right" 
                autoClose={3000}
                hideProgressBar={false}
                closeOnClick
                pauseOnHover={false}
                draggable
                theme="light"
            />
        </div>
    );
}