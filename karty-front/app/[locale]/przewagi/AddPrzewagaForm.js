'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation'
import styles from './PrzewagiPage.module.css'; // Importing the styles

const AddCechaForm = () => {
  const router = useRouter()
  const [name, setName] = useState('');
  const [slug, setSlug] = useState(''); // Default to Polish

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
      router.push('/przewagi')
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label >
          Przewaga
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
          Slug
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit" className={styles.button}>Dodaj przewagę</button>
    </form>
  );
};

export default AddCechaForm;
