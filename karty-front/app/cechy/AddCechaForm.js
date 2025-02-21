'use client';

import { useState } from 'react';
import styles from './CechyPage.module.css'; // Ensure you have the correct styles if you need them
import { redirect } from 'next/navigation';

const AddCechaForm = () => {
  const [name, setName] = useState('');
  const [language, setLanguage] = useState('pl'); // Default to Polish

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/cechy', {
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
    redirect('/cechy');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={styles.label}>
          Nowa cecha:
          <textarea onChange={(e) => setName(e.target.value)}
            required value={name}>
          </textarea>
        </label>
      </div>
      <div>
      </div>
      <button type="submit" className='btn'>Dodaj cechę</button>
    </form>
  );
};

export default AddCechaForm;
