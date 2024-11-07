"use client";

import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import styles from "./dekoracja.module.css";

export default function EditDekoracjaPage(props) {
  const params = use(props.params);
  const router = useRouter();
  const { id } = params; // Using props.params directly here

  const [dekoracja, setDekoracja] = useState(null);
  const [availableCechy, setAvailableCechy] = useState([]);
  const [availablePrzewagi, setAvailablePrzewagi] = useState([]);
  const [availableTypy, setAvailableTypy] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tlumaczenie, setTlumaczenie] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    tlumaczenie_id: "",
    subtitle: "",
    led: "",
    power: "",
    szerokosc: "",
    wysokosc: "",
    glebokosc: "",
    cechy: [],
    przewagi: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch data for dekoracja and other options
        const [dekoracjaRes, cechyRes, przewagiRes, typyRes] = await Promise.all([
          fetch(`/api/dekoracje/${id}`),
          fetch("/api/cechy"),
          fetch("/api/przewagi"),
          fetch("/api/typy"),
        ]);

        const dekoracjaData = await dekoracjaRes.json();
        const cechyData = await cechyRes.json();
        const przewagiData = await przewagiRes.json();
        const typyData = await typyRes.json();

        if (!dekoracjaRes.ok) throw new Error(dekoracjaData.error || "Error fetching data");

        const selectedCechy = cechyData.filter((cecha) =>
          dekoracjaData.cechy.includes(
            cecha.tlumaczenia.find((t) => t.kod_jezyka === "pl")?.nazwa
          )
        ).map((cecha) => cecha.id);

        const selectedPrzewagi = przewagiData.filter((przewaga) =>
          dekoracjaData.przewagi.includes(
            przewaga.tlumaczenia.find((t) => t.kod_jezyka === "pl")?.nazwa
          )
        ).map((przewaga) => przewaga.id);

        // Find matching subtitle by translation and set as preselected
        const selectedSubtitleId = typyData.find((typ) =>
          typ.tlumaczenia.some(
            (t) => t.kod_jezyka === "pl" && t.nazwa === dekoracjaData.subtitle
          )
        )?.id;
        
        
        const tlumaczenieData = dekoracjaData.title.tlumaczenia.filter(i => i.kod_jezyka == 'pl')[0]
        setTlumaczenie(tlumaczenieData);
        
        
        setDekoracja(dekoracjaData);
        
        setAvailableCechy(cechyData);
        setAvailablePrzewagi(przewagiData);
        setAvailableTypy(typyData);
        setFormData({
          title: tlumaczenieData.tytul || "",
          subtitle: selectedSubtitleId || "",
          led: dekoracjaData.led || "",
          power: dekoracjaData.power || "",
          szerokosc: dekoracjaData.szerokosc || "",
          wysokosc: dekoracjaData.wysokosc || "",
          glebokosc: dekoracjaData.glebokosc || "",
          cechy: selectedCechy,
          przewagi: selectedPrzewagi,
          tlumaczenie_id: tlumaczenieData.id
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCechyChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
    if (selectedIds.length <= 3) {
      setFormData((prev) => ({
        ...prev,
        cechy: selectedIds,
      }));
    }
  };

  const handlePrzewagiChange = (e) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) => option.value);
    if (selectedIds.length <= 4) {
      setFormData((prev) => ({
        ...prev,
        przewagi: selectedIds,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare the form data to be in the expected format for the backend
    const updatedData = {
      title: formData.title,
      subtitle_id: formData.subtitle || availableTypy[0].id,  // Make sure subtitle is actually the ID, not the name
      led: formData.led || 0,
      power: formData.power || 0,
      szerokosc: formData.szerokosc || 0,
      wysokosc: formData.wysokosc || 0,
      glebokosc: formData.glebokosc || 0,
      tlumaczenie_id: formData.tlumaczenie_id,
      cechy: formData.cechy,  // These should be an array of IDs
      przewagi: formData.przewagi,  // These should also be an array of IDs
    };

    try {
      // Send PUT request to backend
      const response = await fetch(`/api/dekoracje/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });

      // Handle errors
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error updating data");
      }

      // Redirect or show a success message
      router.push("/dekoracje");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>Edit Dekoracja</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label className={styles.label}>
          Title:
          <textarea
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.textarea}
            rows={3}
          />
        </label>
        <label className={styles.label}>
          Subtitle:
          <select
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            className={styles.select}
          >
            {availableTypy.map((typ) => (
              <option key={typ.id} value={typ.id}>
                {typ.tlumaczenia.find((t) => t.kod_jezyka === "pl")?.nazwa || typ.id}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          LED Count:
          <input
            type="number"
            name="led"
            value={formData.led}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Power (W):
          <input
            type="number"
            name="power"
            value={formData.power}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Width:
          <input
            type="number"
            name="szerokosc"
            value={formData.szerokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Height:
          <input
            type="number"
            name="wysokosc"
            value={formData.wysokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          Depth:
          <input
            type="number"
            name="glebokosc"
            value={formData.glebokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>

        <label className={styles.label}>
          Cechy (Features, max 3):
          <select
            multiple
            value={formData.cechy}
            onChange={handleCechyChange}
            className={styles.select}
          >
            {availableCechy.map((cecha) => (
              <option key={cecha.id} value={cecha.id}>
                {cecha.tlumaczenia.find((t) => t.kod_jezyka === "pl")?.nazwa}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Przewagi (Advantages, max 4):
          <select
            multiple
            value={formData.przewagi}
            onChange={handlePrzewagiChange}
            className={styles.select}
          >
            {availablePrzewagi.map((przewaga) => (
              <option key={przewaga.id} value={przewaga.id}>
                {przewaga.tlumaczenia.find((t) => t.kod_jezyka === "pl")?.nazwa}
              </option>
            ))}
          </select>
        </label>

        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
    </div>
  );
}
