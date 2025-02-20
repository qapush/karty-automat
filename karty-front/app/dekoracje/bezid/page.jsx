
import styles from "./dekoracja.module.css";

import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";
import { notFound } from "next/navigation";

// import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";

export default async function EditDekoracjaPage({params}) {
  
  const {id} = await params;
  let dekoracja = {};
  try {
    
  } catch (e) {
    console.log(e);
  }
  
  if(!dekoracja.id) notFound();
  
  return (
    <>
    <div className={styles.container}>
      <a className={styles.backlink} href="/dekoracje">← wszystkie dekoracje</a>
      <h1 className={styles.header}>Dekoracja bez ID</h1>
      <DekoracjaForm dekoracjaData={dekoracja} id={id}/>
    </div>
    </>
    
  );
}
