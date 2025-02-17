import styles from './Dekoracje.module.css'; // Importing the CSS module
import { fetchDecorations } from '../../lib/fetchDecorations';
import ListaDekoracji from './ListaDekoracji';
import DekoracjaForm from '@/components/Dekoracja/DekoracjaForm';
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
      <a href="#dodaj-dekoracje">Dodaj nową</a>
      <br />
      <br />
      <ListaDekoracji dekoracjeData={dekoracje}/>
      <h1 id='dodaj-dekoracje'>Dodaj dekoracje</h1>
      <DekoracjaForm add />
    </div>
  );
}
