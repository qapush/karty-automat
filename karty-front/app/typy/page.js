import { PrismaClient } from '@prisma/client';
import AddTypForm from './AddTypForm';
import styles from './TypyPage.module.css'; // Importing the styles

const prisma = new PrismaClient();

// Fetch all features (Cechy) from the database
async function fetchTypy() {
  return await prisma.typDekoracji.findMany({
    include: {
      tlumaczenia: true,
    },
  });
}

export default async function TypyPage() {
  const cechy = await fetchTypy(); // Fetch cechy on the server side

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Typy dekoracji</h1>

      {/* Display the list of Cechy */}
      {cechy.length > 0 ? (
        <ul className={styles.list}>
          {cechy.map((typ) => (
            <li key={typ.id} className={styles.listItem}>
              {typ.tlumaczenia[0]?.nazwa || 'No name available'}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noFeatures}>Brak typów do wyświetlenia. Dodaj nowe typy poniżej.</p> // Message when no features are available
      )}

      {/* Client-side Component for Adding New Cechy */}
      <div className={styles.formContainer}>
        <AddTypForm />
      </div>
    </div>
  );
}
