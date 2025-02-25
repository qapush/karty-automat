const features = [
    "Świetlne \nsploty",
    "Dekoracyjne \nbombki",
    "Artystyczna forma\nkonstrukcji",
    "Efekt spadającej\ngwiazdy",
    "Efekt \nskrzącego śniegu",
    "Zmiana barwy światła\nciepłe/zimne",
    "LED \nNeon",
    "Świetlny\nkaseton",
    "Wielobarwna animacja \nRGB - punktowa",
    "Wielobarwna animacja\nRGB - liniowa",
    "Efekt topniejącego\nlodu",
    "Efekt płynącej\nwody",
    "Dodatkowe doświetlenie\ndekoracji",
    "Naturalnie wyglądające\nigliwie",
    "Efekt śniegu na gałązkach",
    "Ozdobne wykończenie\nrombowe",
    "Dekoracyjne wykończenie\nlustrzane",
    "Efekt\nwitrażu",
    "Wzorzyste\nwypełnienia",
    "Animowany\npłomień",
    "Metalowe\nzdobienia",
    "Atrakcyjny\nFotopunkt",
    "Aluminiowa\nkonstrukcja",
    "Lakierowana\nkonstrukcja",
    "Dekoracja\nobrotowa",
    "Barwne\nprzewody",
    "Bezpieczne niskie\nnapięcie",
    "EKO\nLED",
    "Żarówka\nbłyskowa LED",
    "Ozdobne\nwykończenie",
    "Przyjazna naturze\nsklejka dekoracyjna",
    "Efekty dźwiękowe\ndekoracji",
    "Element z możliwością\nwejścia do środka",
    "Dekoracja z przejściem\nprzez element",
    "Funkcja\nedukacyjna",
    "Strefa\nwypoczynkowa",
    "Miejsce\nna personalizację",
    "Indywidualne cechy\ndla konkretnych dekoracji",
    "Unikalna\ngra kolorów",
    "System\nszybkiego montażu",
    "Korbka uruchamiająca\nmuzykę",
    "Ornamenty \nręcznie rzeźbione",
    "Dekoracyjna\nkula świetlna",
    "Dekoracyjne\nżarówki",
    "Druk 3D",
    "Blacha\nperforowana"
  ];
  
  const endpoint = 'https://karty-automat.vercel.app/api/cechy';
  
  // Function to post each feature
  const postFeature = async (feature) => {
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: feature,
          language: 'pl'
        })
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log(`Success: ${feature} ->`, data);
    } catch (error) {
      console.error(`Failed to post ${feature}:`, error.message);
    }
  };
  
  const postAllFeatures = async () => {
    for (const feature of features) {
      await postFeature(feature);
    }
    console.log('All features processed.');
  };
  
  postAllFeatures();
  