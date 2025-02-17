"use client";

import { useEffect, useState } from "react";
import styles from "./DekoracjaForm.module.css"; // Ensure to import the styles
import { ToastContainer, toast } from 'react-toastify';
import { putPostDekoracja } from "@/utils/putPostDekoracja";


const DekoracjaForm = ({ dekoracjaData = null, id = '', add = false }) => {

  const locale = "pl";

  const [typy, setTypy] = useState([]);
  const [cechy, setCechy] = useState([]);
  const [przewagi, setPrzewagi] = useState([]);

  const initializeFormData = (data) => ({
    id,
    title: data?.title || "",
    typ: data?.typ?.id || "",
    cechy: data?.cechy?.map(i => i.id) || [],
    przewagi: data?.przewagi?.map(i => i.id) || [],
    led: data?.led || 0,
    power: data?.power || 0,
    szerokosc: data?.szerokosc || 0,
    glebokosc: data?.glebokosc || 0,
    wysokosc: data?.wysokosc || 0,
    locale
  });

  const [formData, setFormData] = useState(initializeFormData(dekoracjaData));

  useEffect(() => {
    const getData = async () => {

      const typyRes = await fetch("/api/typy");
      const typyData = await typyRes.json();
      setTypy(typyData);

      const cechyRes = await fetch("/api/cechy");
      const cechyData = await cechyRes.json();
      setCechy(cechyData);

      const przewagiRes = await fetch("/api/przewagi");
      const przewagiData = await przewagiRes.json();
      setPrzewagi(przewagiData);

    };

    getData();
  }, [dekoracjaData]);

  // FORM


  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormUnchanged = JSON.stringify(formData) === JSON.stringify(initializeFormData(dekoracjaData));
    if (isFormUnchanged) {
      toast.info("Nie wprowadzono zmian do formularza");
      return;
    }

    toast.promise(() => putPostDekoracja(add, formData
      ), {
      pending: "Zapisywanie...",
      success: {
        render( {data} ) {
          console.log(data);
          
          return data.message;
        }
      },
      error: {
        render( {data} ) {
          return data.message;
        }
      }
    })


  };

  const handleChange = (e) => {

    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  };

  const handleMultipleChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) => option.value);
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: selectedOptions,
    }));
  };


  return (
    <>
      <form onSubmit={handleSubmit}>
        {add && <label className={styles.label}>
          ID:
          <textarea
            required
            name="id"
            value={formData.id}
            onChange={handleChange}
            className={styles.textarea}
          />
        </label>}
        <label className={styles.label}>
          Title:
          <textarea
            required
            name="title"
            value={formData.title}
            onChange={handleChange}
            className={styles.textarea}
            rows={3}
          />
        </label>
        <label className={styles.label}>
          Typ dekoracji:
          <select
            name="typ"
            required
            value={formData.typ}
            onChange={handleChange}
            className={styles.select}
          >
            <option value="">Wybierz typ</option>
            {typy.map((typ) => (
              <option key={typ.id} value={typ.id}>
                {typ.tlumaczenia[0].nazwa}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Cechy (max 3):
          <select
            multiple
            name="cechy"
            required
            value={formData.cechy}
            onChange={handleMultipleChange}
            className={`${styles.select} ${styles.largeSelect}`}
          >
            {cechy.map((cecha) => (
              <option key={cecha.id} value={cecha.id}>
                {cecha.tlumaczenia[0].nazwa}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Przewagi (max 4):
          <select
            multiple
            required
            name="przewagi"
            value={formData.przewagi}
            onChange={handleMultipleChange}
            className={`${styles.select} ${styles.largeSelect}`}
          >
            {przewagi.map((przewaga) => (
              <option key={przewaga.id} value={przewaga.id}>
                {przewaga.tlumaczenia.find((t) => t.kod_jezyka === "pl")?.nazwa}
              </option>
            ))}
          </select>
        </label>
        <label className={styles.label}>
          Ilość LED:
          <input
            type="number"
            name="led"
            value={formData.led}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          MOC:
          <input
            type="number"
            name="power"
            value={formData.power}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          SZEROKOŚĆ:
          <input
            type="number"
            name="szerokosc"
            value={formData.szerokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          WYSOKOŚĆ:
          <input
            type="number"
            name="wysokosc"
            value={formData.wysokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label className={styles.label}>
          GŁĘBOKOŚĆ:
          <input
            type="number"
            name="glebokosc"
            value={formData.glebokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className={styles.button}>
          Save Changes
        </button>
      </form>
      <ToastContainer />
    </>


  );
};

export default DekoracjaForm;
