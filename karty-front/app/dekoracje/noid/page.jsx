
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation';
import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";




// import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";


export default async function NoId({params}) {

  const cookieStore = await cookies()

  if(!cookieStore.get('initials')){
    redirect('/login');
  } else {
    return (

      <div>
        <a style={{textAlign: 'center', display: 'block'}} href="/dekoracje">← wszystkie dekoracje</a>
        <h1 className='page-title'>Dekoracja bez ID</h1>
       
        <DekoracjaForm/>
      </div>
      
    );
  }


  
  
  
}
