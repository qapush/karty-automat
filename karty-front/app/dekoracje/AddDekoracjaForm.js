"use client";

import { useEffect, useState } from "react";
import styles from "./Dekoracje.module.css"; // Ensure to import the styles

const AddDekoracjaForm = () => {
  const [tytul, setTytul] = useState("");
  const [typDekoracji, setTypDekoracji] = useState("");
  const [szerokosc, setSzerokosc] = useState("");
  const [wysokosc, setWysokosc] = useState("");
  const [glebokosc, setGlebokosc] = useState("");
  const [moc, setMoc] = useState("");
  const [iloscLed, setIloscLed] = useState("");
  const [id, setId] = useState('');
  const [jezyk, setJezyk] = useState('pl'); // Default language set to Polish

  // State for fetching typy dekoracji, cechy, and przewagi
  const [typDekoracjiList, setTypDekoracjiList] = useState([]);
  const [przewagiList, setPrzewagiList] = useState([]);
  const [cechyList, setCechyList] = useState([]);

  const [selectedPrzewagi, setSelectedPrzewagi] = useState([]);
  const [selectedCechy, setSelectedCechy] = useState([]);

  useEffect(() => {
    // Fetch TypDekoracji, Przewagi, and Cechy
    const fetchData = async () => {
      try {

        const response = await fetch("/api/typy");
        const typyData = await response.json();
        const translatedTypy = typyData.map((typ) => ({
          id: typ.id,
          nazwa:
            typ.tlumaczenia.length > 0
              ? typ.tlumaczenia[0].nazwa
              : "Brak nazwy", // Fallback if no translation
        }));

        setTypDekoracjiList(translatedTypy);

        const przewagiResponse = await fetch('/api/przewagi');
        const przewagiData = await przewagiResponse.json();

        const translatedPrzewagi = przewagiData.map(przewaga => ({
          id: przewaga.id,
          nazwa: przewaga.tlumaczenia.length > 0 ? przewaga.tlumaczenia[0].nazwa : 'Brak nazwy',
        }));

        setPrzewagiList(translatedPrzewagi);

        const cechyResponse = await fetch('/api/cechy');
        const cechyData = await cechyResponse.json();


        const translatedCechy = cechyData.map(cecha => ({
          id: cecha.id,
          nazwa: cecha.tlumaczenia.length > 0 ? cecha.tlumaczenia[0].nazwa : 'Brak nazwy',
        }));

        setCechyList(translatedCechy);


      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newDekoracja = {
      id, 
      jezyk,
      tytul,
      typ_dekoracji: typDekoracji, // Only single selection for typ dekoracji
      szerokosc: parseFloat(szerokosc),
      wysokosc: parseFloat(wysokosc),
      glebokosc: parseFloat(glebokosc),
      moc: parseFloat(moc),
      ilosc_led: parseInt(iloscLed),
      przewagi: selectedPrzewagi, // Include selected przewagi
      cechy: selectedCechy, // Include selected cechy
    };

    try {
      const response = await fetch("/api/dekoracje", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newDekoracja),
      });

      if (!response.ok) {
        throw new Error("Failed to add decoration");
      }

      const addedDekoracja = await response.json();
      console.log("Decoration added:", addedDekoracja);

      // Optionally reset the form or display a success message
      setId('');
      setTytul("");
      setTypDekoracji("");
      setSzerokosc("");
      setWysokosc("");
      setGlebokosc("");
      setMoc("");
      setIloscLed("");
      setSelectedPrzewagi([]);
      setSelectedCechy([]);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <div>
        <label className={styles.label}>
          ID:
          <input
            type="text"
            className={styles.inputField}
            value={id}
            onChange={(e) => setId(+e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Tytuł (Title):
          <input
            type="text"
            className={styles.inputField}
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
            required
          />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Typ dekoracji (Decoration Type):
          <select
            className={styles.inputField}
            value={typDekoracji}
            onChange={(e) => setTypDekoracji(e.target.value)}
            required
          >
            <option value="">Wybierz typ dekoracji</option>
            {typDekoracjiList.map((typ) => (
              <option key={typ.id} value={typ.id}>
                {typ.nazwa}
              </option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Szerokość (Width):
          <input
            type="number"
            className={styles.inputField}
            value={szerokosc}
            onChange={(e) => setSzerokosc(e.target.value)}
            required
            step="0.01"
          />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Wysokość (Height):
          <input
            type="number"
            className={styles.inputField}
            value={wysokosc}
            onChange={(e) => setWysokosc(e.target.value)}
            required
            step="0.01"
          />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Głębokość (Depth):
          <input
            type="number"
            className={styles.inputField}
            value={glebokosc}
            onChange={(e) => setGlebokosc(e.target.value)}
            required
            step="0.01"
          />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Moc (Power in W):
          <input
            type="number"
            className={styles.inputField}
            value={moc}
            onChange={(e) => setMoc(e.target.value)}
            required
            step="0.01"
          />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Liczba LED (LED Quantity):
          <input
            type="number"
            className={styles.inputField}
            value={iloscLed}
            onChange={(e) => setIloscLed(e.target.value)}
            required
            min="0"
          />
        </label>
      </div>
      <div>
        <label className={styles.label}>
          Przewagi (Advantages):
          <select
            multiple
            className={styles.inputField}
            value={selectedPrzewagi}
            onChange={(e) => {
              const options = e.target.options;
              const value = [];
              for (let i = 0; i < options.length; i++) {
                if (options[i].selected) {
                  value.push(options[i].value);
                }
              }
              setSelectedPrzewagi(value);
            }}
            required
          >
            {przewagiList.map((przewaga) => (
              <option key={przewaga.id} value={przewaga.id}>
                {przewaga.nazwa}
              </option>
            ))}
          </select>
          <p className={styles.label}>Wybierz 1-4 przewagi</p>
        </label>
      </div>
      <div>
  <label className={styles.label}>
    Cechy (Features):
    <select
      multiple
      className={styles.inputField}
      value={selectedCechy}
      onChange={(e) => {
        const options = e.target.options;
        const value = [];
        for (let i = 0; i < options.length; i++) {
          if (options[i].selected) {
            value.push(options[i].value);
          }
        }
        // Limit the selection to a maximum of 3
        if (value.length <= 3) {
          setSelectedCechy(value);
        } else {
          alert('Możesz wybrać tylko 3 cechy.'); // Alert when more than 3 selected
        }
      }}
      required
    >
      {cechyList.map((cecha) => (
        <option key={cecha.id} value={cecha.id}>
          {cecha.nazwa || 'Brak nazwy'} {/* Display name or fallback */}
        </option>
      ))}
    </select>
    <p className={styles.helperText}>Wybierz 1-3 cechy (Select 1-3 features)</p>
  </label>
  <select style={{margin: 50}}value={jezyk} onChange={(e) => setJezyk(e.target.value)}>
          <option value="pl">Polski</option>
          <option value="en">English</option>
          {/* Add more language options as needed */}
      </select>
</div>

      <button type="submit" className={styles.button}>
        Add Dekoracja
      </button>
    </form>
  );
};

export default AddDekoracjaForm;
