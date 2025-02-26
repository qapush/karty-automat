import { fetchDecorations } from '@/lib/fetchDecorations';
import DekoracjeTable from "@/components/Dekoracje/DekoracjeTable";

export default async function ListaDekoracji() {

// Fetch decorations
const dekoracjeResponse = await fetchDecorations();

// Check if the response is okay
if (!dekoracjeResponse.ok) {
  console.error('Failed to fetch decorations');
  return <p className={styles.noFeatures}>Brak dekoracji do wyświetlenia.</p>;
}

const dekoracjeData = await dekoracjeResponse.json(); // Parse the JSON response

  return <DekoracjeTable dekoracjeData={dekoracjeData} />
}
