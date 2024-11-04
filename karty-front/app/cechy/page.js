import { PrismaClient } from '@prisma/client';
import AddCechaForm from './AddCechaForm';
import styles from './CechyPage.module.css'; // Importing the styles


const prisma = new PrismaClient();

export const dynamic = 'force-dynamic'

// Fetch all features (Cechy) from the database
async function fetchCechy() {
  return await prisma.cechy.findMany({
    include: {
      tlumaczenia: true,
    },
  });
}

export default async function CechyPage() {
  const cechy = await fetchCechy(); // Fetch cechy on the server side

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cechy</h1>

      {/* Display the list of Cechy */}
      {cechy.length > 0 ? (
        <ul className={styles.list}>
          {cechy.map((cecha) => (
            <li key={cecha.id} className={styles.listItem} dangerouslySetInnerHTML={{__html: cecha.tlumaczenia[0]?.nazwa.replace(/\n/g, '<br/>') || 'No name available'}}>
              
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noFeatures}>Brak cech do wyświetlenia. Dodaj nowe cechy poniżej.</p> // Message when no features are available
      )}

      {/* Client-side Component for Adding New Cechy */}
      <div className={styles.formContainer}>
        <AddCechaForm />
      </div>
    </div>
  );
}
