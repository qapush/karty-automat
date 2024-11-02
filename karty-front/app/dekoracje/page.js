import styles from './Dekoracje.module.css'; // Importing the CSS module
import AddDekoracjaForm from './AddDekoracjaForm';
import { fetchDecorations } from '../../lib/fetchDecorations'; // Adjust the import path as necessary

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

      {dekoracje.length > 0 ? (
        <ul className={styles.list}>
          {dekoracje.map((dekoracja) => (
            <li className={styles.listItem} key={dekoracja.id}>
              <h2>ID: {dekoracja.id}</h2>
              <h3>Nazwa: {dekoracja.tlumaczenia.length > 0 ? dekoracja.tlumaczenia[0].tytul : 'No title available'}</h3>
              <p>Typ: {dekoracja.typ_dekoracji.tlumaczenia[0].nazwa}</p>
              <p>Wymiary: {dekoracja.szerokosc} x {dekoracja.wysokosc} x {dekoracja.glebokosc}</p>
              <p>Moc: {dekoracja.moc}W</p>
              <p>Liczba LED: {dekoracja.ilosc_led}</p>
              {/* Display features */}
              {dekoracja.cechy.length > 0 && (
                <div>
                  <h3>Cechy:</h3>
                  <ul>
                    {dekoracja.cechy.map((dekoracjaCecha) => (
                      <li key={dekoracjaCecha.id}>
                        {dekoracjaCecha.cecha.tlumaczenia.length > 0 ? dekoracjaCecha.cecha.tlumaczenia[0].nazwa : 'No feature name'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {/* Display advantages */}
              {dekoracja.przewagi.length > 0 && (
                <div>
                  <h3>Przewagi:</h3>
                  <ul>
                    {dekoracja.przewagi.map((dekoracjaPrzewaga) => (
                      <li key={dekoracjaPrzewaga.id}>
                        {dekoracjaPrzewaga.przewaga.tlumaczenia.length > 0 ? dekoracjaPrzewaga.przewaga.tlumaczenia[0].nazwa : 'No advantage name'}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noFeatures}>Brak dekoracji do wyświetlenia.</p>
      )}
      <AddDekoracjaForm />
    </div>
  );
}
