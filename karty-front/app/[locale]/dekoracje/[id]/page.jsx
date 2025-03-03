
import styles from "./dekoracja.module.css";
import { dekoracjaData } from "@/utils/dekoracje";
import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";
import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export async function generateMetadata({ params, searchParams }, parent) {
  // read route params
  const { id } = await params

  return {
    title: `ID ${id}`,
}
}

export default async function EditDekoracjaPage({params}) {

  const cookieStore = await cookies();

  if (!cookieStore.get("initials")) {
    redirect("/login");
  }

  
  const {id, locale} = await params;
  let dekoracja = {};
  try {
    dekoracja = await dekoracjaData(id, locale);  
  } catch (e) {
    console.log(e);
  }
  
  

  if(!dekoracja.id) notFound();
  
  return (
    <>
    <div className={styles.container}>
      <a style={{textAlign: 'center', display: 'block'}} href="/dekoracje">← wszystkie dekoracje</a>
      <h1 className={styles.header}>ID {id}</h1>
      <DekoracjaForm dekoracjaData={dekoracja} id={id}/>
    </div>
    </>
    
  );
}
