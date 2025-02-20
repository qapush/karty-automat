
import styles from "./dekoracja.module.css";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";
import { revalidatePath } from "next/cache";


// import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";

async function setInitials(formData) {
  'use server';

  const cookieStore = await cookies()

  const initials = formData.get('initials');
  
  cookieStore.set('initials', initials, { maxAge: 60 * 60 * 24 * 30 })

  revalidatePath('/dekoracje/noid');
  
}

async function resetInitials() {
  
  'use server';
  console.log('reset initials');
  
  const cookieStore = await cookies()

  cookieStore.delete('initials');

  redirect('/dekoracje/noid');
  
}

export default async function NoId({params}) {

  const cookieStore = await cookies()

  if(!cookieStore.get('initials')){
    return (
      <>
      <div className={styles.container}>
        <form action={setInitials}>
          <label>
            Inicjały:
            <br></br>
            <input type="text" name="initials" />
          </label>
          <button>Dodaj</button>
        </form>
      </div>
      </>
    );
  } else {
    return (
      <>
      <div className={styles.container}>
        <a className={styles.backlink} href="/dekoracje">← wszystkie dekoracje</a>
        <h1 className={styles.header}>Dekoracja bez ID</h1>
        <form action={resetInitials}>
        <button>Zmień inicjały</button>
        </form>
        <DekoracjaForm/>
      </div>
      </>
      
    );
  }


  
  
  
}
