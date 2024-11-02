import styles from "./Dekoracje.module.css"; // Importing the CSS module
import AddDekoracjaForm from "./AddDekoracjaForm";
import { fetchDecorations } from "../../lib/fetchDecorations";

export const dynamic = "force-dynamic";

export default async function DekoracjePage() {
  // Fetch decorations
  const dekoracjeResponse = await fetchDecorations();

  // Check if the response is okay
  if (!dekoracjeResponse.ok) {
    console.error("Failed to fetch decorations");
    return <p className={styles.noFeatures}>Brak dekoracji do wyświetlenia.</p>;
  }

  const dekoracje = await dekoracjeResponse.json(); // Parse the JSON response

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Dekoracje</h1>

      {dekoracje.length > 0 ? (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nazwa</th>
              <th>Typ</th>
              <th>Wymiary</th>
              <th>Moc</th>
              <th>Liczba LED</th>
              <th>Cechy</th>
              <th>Przewagi</th>
            </tr>
          </thead>
          <tbody>
            {dekoracje.map((dekoracja) => (
              <tr key={dekoracja.id}>
                <td>{dekoracja.id}</td>
                <td>
                  {dekoracja.tlumaczenia.length > 0
                    ? dekoracja.tlumaczenia[0].tytul
                    : "No title available"}
                </td>
                <td>{dekoracja.typ_dekoracji.tlumaczenia[0].nazwa}</td>
                <td>
                  {dekoracja.szerokosc} x {dekoracja.wysokosc} x{" "}
                  {dekoracja.glebokosc}
                </td>
                <td>{dekoracja.moc}W</td>
                <td>{dekoracja.ilosc_led}</td>

                <td>
                  {dekoracja.cechy.length > 0 ? (
                    <ul>
                      {dekoracja.cechy.map((dekoracjaCecha) => (
                        <li key={dekoracjaCecha.id}>
                          {dekoracjaCecha.cecha.tlumaczenia.length > 0
                            ? dekoracjaCecha.cecha.tlumaczenia[0].nazwa.replace(
                                /\\r/g,
                                " "
                              ) // Replace literal "\r" with a space
                            : "No feature name"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No features"
                  )}
                </td>

                <td>
                  {dekoracja.przewagi.length > 0 ? (
                    <ul>
                      {dekoracja.przewagi.map((dekoracjaPrzewaga) => (
                        <li key={dekoracjaPrzewaga.id}>
                          {dekoracjaPrzewaga.przewaga.tlumaczenia.length > 0
                            ? dekoracjaPrzewaga.przewaga.tlumaczenia[0].nazwa
                            : "No advantage name"}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    "No advantages"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noFeatures}>Brak dekoracji do wyświetlenia.</p>
      )}
      <AddDekoracjaForm />
    </div>
  );
}
