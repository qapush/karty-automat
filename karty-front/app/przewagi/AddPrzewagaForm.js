'use client';

import { useState } from 'react';
import styles from './PrzewagiPage.module.css'; // Importing the styles

const AddCechaForm = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('pl'); // Default to Polish

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('/api/przewagi', {
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
      setName('');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={styles.label}>
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
        <label className={styles.label}>
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
