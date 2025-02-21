import ListaDekoracji from './ListaDekoracji';
import DekoracjaForm from '@/components/Dekoracja/DekoracjaForm';
import { Suspense } from 'react';
import Loader from '@/components/Loader/Loader';
export default async function DekoracjePage() {




  return (
    <div>
      <h1 className='page-title'>Dekoracje</h1>
      <Suspense fallback={<Loader text='Ładuję liste dekoracji'/>}>
        <ListaDekoracji />
      </Suspense>
    </div>
  );
}
