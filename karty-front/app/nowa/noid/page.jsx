
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";
import { dekoracjaData } from '@/utils/dekoracje';

const usersToNoID = {
  MQ: 41,
  CC: 69,
  PM: 41,
  ZM: 28,
  JS: 11
}


export default async function NoId({params}) {

  const cookieStore = await cookies();

  if(!cookieStore.get('initials')){
    redirect('/login');
  } 


  const initials = await cookieStore.get('initials');
  const dekoID = usersToNoID[initials.value];
  const data = await dekoracjaData(dekoID);
  console.log(data);
  

  return (

    <div>
      <a style={{textAlign: 'center', display: 'block'}} href="/dekoracje">← wszystkie dekoracje</a>
      <h1 className='page-title'>Dekoracja bez ID</h1>
     
      <DekoracjaForm dekoracjaData={data} id={data.id}/>
    </div>
    
  );
  
  
}
