import styles from './Dekoracje.module.css'; // Importing the CSS module
import AddDekoracjaForm from '../../components/Dekoracja/AddDekoracjaForm';
import { fetchDecorations } from '../../lib/fetchDecorations';
import ListaDekoracji from './ListaDekoracji';

export const dynamic = 'force-dynamic';

export default async function DekoracjePage() {
  // Fetch decorations
  const dekoracjeResponse = await fetchDecorations();

  // Check if the response is okay
  if (!dekoracjeResponse.ok) {
    console.error('Failed to fetch decorations');
    return <p className={styles.noFeatures}>Brak dekoracji do wyświetlenia.</p>;
  }

  const dekoracje = await dekoracjeResponse.json(); // Parse the JSON response

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dekoracje</h1>
      <ListaDekoracji dekoracjeData={dekoracje}/>
      <AddDekoracjaForm />
    </div>
  );
}
