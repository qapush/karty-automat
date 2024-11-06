"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function EditDekoracjaPage({ params }) {
  const router = useRouter();
  const { id } = params;
  const [dekoracja, setDekoracja] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
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
    // Fetch dekoracja data to prefill the form
    async function fetchDekoracja() {
      try {
        const response = await fetch(`/api/dekoracje/${id}`);
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Error fetching data");

        // Set the fetched data
        setDekoracja(data);
        setFormData({
          title: data.title || "",
          subtitle: data.subtitle || "",
          led: data.led || "",
          power: data.power || "",
          szerokosc: data.szerokosc || "",
          wysokosc: data.wysokosc || "",
          glebokosc: data.glebokosc || "",
          cechy: data.cechy || [],
          przewagi: data.przewagi || [],
        });
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }

    fetchDekoracja();
  }, [id]);

  // Update the form state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update dekoracja
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/dekoracje/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error updating data");
      }

      // Redirect to dekoracje list page after successful update
      router.push("/dekoracje");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Edit Dekoracja</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </label>
        <label>
          Subtitle:
          <input
            type="text"
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
          />
        </label>
        <label>
          LED Count:
          <input
            type="number"
            name="led"
            value={formData.led}
            onChange={handleChange}
          />
        </label>
        <label>
          Power (W):
          <input
            type="number"
            name="power"
            value={formData.power}
            onChange={handleChange}
          />
        </label>
        <label>
          Width:
          <input
            type="number"
            name="szerokosc"
            value={formData.szerokosc}
            onChange={handleChange}
          />
        </label>
        <label>
          Height:
          <input
            type="number"
            name="wysokosc"
            value={formData.wysokosc}
            onChange={handleChange}
          />
        </label>
        <label>
          Depth:
          <input
            type="number"
            name="glebokosc"
            value={formData.glebokosc}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
}
