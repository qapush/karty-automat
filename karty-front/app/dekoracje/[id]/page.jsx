
import styles from "./dekoracja.module.css";
import { dekoracjaData } from "@/utils/dekoracje";
import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";

// import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";

export default async function EditDekoracjaPage({params}) {
  
  const {id} = await params;
  let dekoracja = {};
  try {
    dekoracja = await dekoracjaData(id);
  } catch (e) {
    console.log(e);
  }

  return (
    <>
    <div className={styles.container}>
      <a className={styles.backlink} href="/dekoracje">← wszystkie dekoracje</a>
      <h1 className={styles.header}>ID {id}</h1>
      <DekoracjaForm dekoracjaData={dekoracja} id={id}/>
    </div>
    </>
    
  );
}
