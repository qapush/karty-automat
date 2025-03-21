import { PrismaClient } from '@prisma/client';
import AddCechaForm from './AddCechaForm';
import styles from './CechyPage.module.css'; // Importing the styles
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Cecha from '@/components/Cechy/Cecha';

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


export default async function CechyPage({params}) {
  
  const {locale} = await params;
  const cookieStore = await cookies();

  if (!cookieStore.get("initials")) {
    redirect("/login");
  }
  const cechy = await fetchCechy(); // Fetch cechy on the server side

  return (
    <div>
      <h1 className='page-title'>Cechy</h1>

      {/* Display the list of Cechy */}
      {cechy.length > 0 ? (
        <ul className={styles.list}>
          {cechy.map((cecha) => {
            return (
              <li key={cecha.id} className={styles.listItem}>
                <Cecha cecha={cecha} locale={locale}/>
              </li>
            )
          })}
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
