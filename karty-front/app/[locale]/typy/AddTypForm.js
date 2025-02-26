'use client';

import { useState } from 'react';
import { redirect } from "next/navigation";
import styles from './TypyPage.module.css'; // Ensure you have the correct styles if you need them

const AddCechaForm = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('pl'); // Default to Polish

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/typy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, language }), // No opis field here
      });

      if (!response.ok) {
        throw new Error('Failed to add feature');
      }

      const newFeature = await response.json();
      console.log('Feature added:', newFeature);

      // Optionally, reset the form or display success message
    } catch (error) {
      console.error('Error:', error);
    }
    redirect('/typy');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label >
          Nazwa (Name):
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label >
          Kod języka (Language Code):
          <input
            type="text"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" className={styles.button}>Add Cechy</button>
    </form>
  );
};

export default AddCechaForm;
