import { PrismaClient } from '@prisma/client';
import AddPrzewagaForm from './AddPrzewagaForm';
import styles from './PrzewagiPage.module.css'; // Importing the styles

const prisma = new PrismaClient();

// Fetch all features (Cechy) from the database
async function fetchPrzewagi() {
  return await prisma.przewagi.findMany({
    include: {
      tlumaczenia: true,
    },
  });
}

export default async function PrzewagiPage() {
  const cechy = await fetchPrzewagi(); // Fetch cechy on the server side

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Przewagi</h1>

      {/* Display the list of Cechy */}
      {cechy.length > 0 ? (
        <ul className={styles.list}>
          {cechy.map((przewaga) => (
            <li key={przewaga.id} className={styles.listItem}>
              {przewaga.tlumaczenia[0]?.nazwa || 'No name available'}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noFeatures}>Brak przewag do wyświetlenia. Dodaj nowe przewagi poniżej.</p> // Message when no features are available
      )}

      {/* Client-side Component for Adding New Cechy */}
      <div className={styles.formContainer}>
        <AddPrzewagaForm />
      </div>
    </div>
  );
}
