import { PrismaClient } from "@prisma/client";
import DeleteButton from "@/components/DeleteButton/DeleteButton";
import AddPrzewagaForm from "./AddPrzewagaForm";
import styles from "./PrzewagiPage.module.css"; // Importing the styles

export const dynamic = "force-dynamic";

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

  const przewagi = await fetchPrzewagi(); // Fetch cechy on the server side

  console.log(przewagi);
  
  

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Przewagi</h1>

      {/* Client-side Component for Adding New Cechy */}
      <div className={styles.formContainer}>
        <AddPrzewagaForm />
      </div>

      {/* Display the list of Cechy */}
      {przewagi.length > 0 ? (
        <ul className={styles.list}>
          {przewagi
            .map((przewaga) => (
              <li key={przewaga.id} className={styles.listItem}>
                <div>
                  <img
                    className={styles.icon}
                    src={`https://upvxroox3cbu7snu.public.blob.vercel-storage.com/${przewaga.tlumaczenia[0]?.nazwa}.jpg`}
                    alt=""
                  />
                  {przewaga.tlumaczenia[0]?.nazwa || "No name available"}
                  <p>Slug: {przewaga.slug}</p>
                </div>
                <DeleteButton id={przewaga.id} type={"przewagi"} />
              </li>
            ))
            .reverse()}
        </ul>
      ) : (
        <p className={styles.noFeatures}>
          Brak przewag do wyświetlenia. Dodaj nowe przewagi poniżej.
        </p> // Message when no features are available
      )}
    </div>
  );
}
