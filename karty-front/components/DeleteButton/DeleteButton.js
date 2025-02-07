'use client'

import { useRouter } from 'next/navigation'


export default function DeleteButton({id, type}){

    const router = useRouter()

    const handleDelete = async () => {
        console.log('delete start');
        try {
            const response = await fetch(`/api/${type}`, {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({ id }), // No opis field here
            });
      
            if (!response.ok) {
              throw new Error('Failed to remove feature');
            }
    
            router.push('/przewagi')
          } catch (error) {
            console.error('Error:', error);
          }
      }

    return(
        <button onClick={handleDelete}>usuń</button>
    )
}