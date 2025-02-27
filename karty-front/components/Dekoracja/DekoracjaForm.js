"use client";

import { useEffect, useState } from "react";
import styles from "./DekoracjaForm.module.css"; // Ensure to import the styles
import { ToastContainer, toast } from 'react-toastify';
import { putPostDekoracja } from "@/utils/putPostDekoracja";
import SelectPrzewagi from "./SelectPrzewagi";
import { useLocale } from "next-intl";
import NazwaTlumaczenie from "./NazwaTlumaczenie";


const DekoracjaForm = ({ dekoracjaData = null, id = '', add = false }) => {


  const locale = useLocale();

  const [typy, setTypy] = useState([]);
  const [cechy, setCechy] = useState([]);
  const [przewagi, setPrzewagi] = useState([]);

  const getTitles = (data) => {
    const res = {};

    data.forEach(item => {
      res[item.kod_jezyka] = {
        title: item.tytul,
        id: item.id
      }
    });
    

    return res;
  }
  
  

  const initializeFormData = (data) => ({
    id,
    titles: data?.title ? getTitles(data.title) : "",
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
        render({ data }) {
          return <div>
            <h5>{data.message}</h5>
            <div>
              {add && data.id && <div style={{ marginTop: 40 }}>
                <a style={{ color: 'red' }} href={`/dekoracje/${data.id}`}>Przejdź do dekoracji →</a>
              </div>}
            </div>
          </div>;
        }
      },
      error: {
        render({ data }) {
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

  const handleSelectPrzewagi = (selected) => {


    setFormData((prev) => ({
      ...prev,
      przewagi: [...selected],
    }));



  }

  const handleTłumaczenieChange = (e) => {

    const titleLocale = e.target.dataset.locale === 'pl' ? 'pl' : locale;

    setFormData((prev) => ({
      ...prev,
      titles: {
        ...prev.titles,
        [titleLocale]: {
          ...prev.titles[titleLocale],
          title: e.target.value
        }
      }
    }))
    
  }


  return (
    <>
      <form onSubmit={handleSubmit}>
        {add && <label >
          ID:
          <input
            type="text"
            required
            name="id"
            value={formData.id}
            onChange={handleChange}
            className={styles.textarea}
          />
        </label>}
       
        <label >
          Nazwa PL:
          <textarea
            required
            data-locale="pl"
            name="title"
            value={formData.titles['pl'].title}
            onChange={handleTłumaczenieChange
              
            }
            className={styles.textarea}
            rows={3}
          />
        </label>
        {locale !== 'pl' && <NazwaTlumaczenie titles={formData.titles} locale={locale} handleTłumaczenieChange={handleTłumaczenieChange} />}
        <label >
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
        {/* TYKO WEW */}
        {(formData.typ === "ee978b21-6056-432c-a8f8-6cda529985d8"
          || formData.typ === "3c18ed57-02f7-4853-94c4-14abf2eb246c") && <div style={{ padding: 10, borderRadius: 1, backgroundColor: "lightgreen", margin: "1rem 0" }}><span>Ten typ dekoracji może byc tylko wewnętrzny</span></div>}

        {/* TYLKO ZEW */}

        {(formData.typ === "97d0523e-7896-4b04-9996-be06c7cde94b"
          || formData.typ === "617fc7bb-3da3-41a3-985c-4cbbdc3011c3"
          || formData.typ === "812385a0-341d-43bc-9232-6e855e32ff50"
          || formData.typ === "31f5f61c-7f04-4e12-9103-b6bd104d033c"
          || formData.typ === "a11617a0-b8f8-4a92-b616-7e47dbec0c5f"
          || formData.typ === "51cc0396-1774-4646-af27-e6b74aa4757d") && <div style={{ padding: 10, borderRadius: 1, backgroundColor: "lightgreen", margin: "1rem 0" }}><span>Ten typ dekoracji może byc tylko zewnętrzny</span></div>}
        <SelectPrzewagi selected={formData.przewagi} all={przewagi} onChange={handleSelectPrzewagi} />

        <label >
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
                {String(cecha.tlumaczenia[0].nazwa).toUpperCase()}
              </option>
            ))}
          </select>
        </label>

        <label >
          Ilość LED:
          <input
            type="number"
            name="led"
            value={formData.led}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label >
          MOC:
          <input
            type="number"
            step={0.1}
            name="power"
            value={formData.power}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label >
          SZEROKOŚĆ:
          <input
            type="number"
            step={0.1}
            name="szerokosc"
            value={formData.szerokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label >
          WYSOKOŚĆ:
          <input
            type="number"
            step={0.1}
            name="wysokosc"
            value={formData.wysokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <label >
          GŁĘBOKOŚĆ:
          <input
            type="number"
            step={0.1}
            name="glebokosc"
            value={formData.glebokosc}
            onChange={handleChange}
            className={styles.input}
          />
        </label>
        <button type="submit" className='btn'>
          {add ? 'Dodaj dekorację' : 'Zapisz zmiany'}
        </button>
      </form>
      <ToastContainer />
    </>


  );
};

export default DekoracjaForm;
