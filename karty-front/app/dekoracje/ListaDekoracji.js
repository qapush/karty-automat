'use client'

import Link from "next/link";
import styles from './Dekoracje.module.css';
import { useState } from "react";

export default function ListaDekoracji({ dekoracjeData }) {

    const [query, setQuery] = useState('');

    const dekoracje = dekoracjeData.filter( dekoracja => dekoracja.id.toString().includes(query));
    
    const handleChange = (e) => {
        setQuery(e.target.value);
    }

  return (
    <>
    <input type="text" value={query} onChange={handleChange} placeholder="szukaj według id"/>
    {    dekoracje.length > 0 ? (
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
            <Link href={`dekoracje/${dekoracja.id}`}>
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    dekoracja?.tlumaczenia.length > 0
                      ? dekoracja?.tlumaczenia[0].tytul.replace(/\n/g, "<br />")
                      : "",
                }}
              ></span>
            </Link>
          </td>
          <td>{dekoracja.typ_dekoracji?.tlumaczenia[0].nazwa}</td>
          <td>
            {dekoracja.szerokosc} x {dekoracja.wysokosc} x {dekoracja.glebokosc}
          </td>
          <td>{dekoracja.moc}W</td>
          <td>{dekoracja.ilosc_led}</td>

          <td>
            {dekoracja.cechy.length > 0 ? (
              <ul>
                {dekoracja.cechy.map((dekoracjaCecha) => (
                  <li
                    key={dekoracjaCecha.id}
                    dangerouslySetInnerHTML={{
                      __html:
                        dekoracjaCecha.cecha?.tlumaczenia.length > 0
                          ? dekoracjaCecha.cecha?.tlumaczenia[0].nazwa.replace(
                              /\n/g,
                              "<br />"
                            )
                          : "No feature name",
                    }}
                  ></li>
                ))}
              </ul>
            ) : (
              "Brak przypisanych cech"
            )}
          </td>

          <td>
            {dekoracja.przewagi.length > 0 ? (
              <ul>
                {dekoracja.przewagi.map((dekoracjaPrzewaga) => (
                  <li key={dekoracjaPrzewaga.id}>
                    {dekoracjaPrzewaga.przewaga?.tlumaczenia.length > 0
                      ? dekoracjaPrzewaga.przewaga?.tlumaczenia[0].nazwa
                      : "No advantage name"}
                  </li>
                ))}
              </ul>
            ) : (
              "Brak przypisanych przewag"
            )}
          </td>
        </tr>
      ))}
          </tbody>
        </table>
      ) : (
        <p className={styles.noFeatures}>Brak dekoracji do wyświetlenia.</p>
      )}
      
    </>
  );
}
