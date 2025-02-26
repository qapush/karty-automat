import ListaDekoracji from './ListaDekoracji';
import { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';
import { cookies } from "next/headers";
import { redirect } from "next/navigation";


export default async function DekoracjePage() {

  const cookieStore = await cookies();

  if (!cookieStore.get("initials")) {
    redirect("/login");
  }


  return (
    <div>
      <h1 className='page-title'>Dekoracje</h1>
      <Suspense fallback={<Loader text='Ładuję liste dekoracji'/>}>
        <ListaDekoracji />
      </Suspense>
    </div>
  );
}
