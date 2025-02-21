
import styles from "./dekoracja.module.css";
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

// import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";

async function setInitials(formData) {
  
  'use server';

  const cookieStore = await cookies()

  const initials = formData.get('initials');
  
  cookieStore.set('initials', initials, { maxAge: 60 * 60 * 24 * 30 })

  const headersList = headers()
  const referer = headersList.get('referer')

  
}

async function resetInitials() {
  
  'use server';
  console.log('reset initials');
  
  const cookieStore = await cookies()

  cookieStore.delete('initials');
  

  redirect('/dekoracje/noid');
  
}

export default async function NoId({params}) {




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
  


  
  
  
}
