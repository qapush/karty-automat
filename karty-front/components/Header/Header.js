import { cookies } from "next/headers";
import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import LangSwitcher from "./LangSwitcher";


export default async function Header(){

    
    const locale = await getLocale();
    
    
    
    const cookieStore = await cookies();
    
    
    const loggedIn = cookieStore.get("initials");

    console.log(cookieStore.get("initials"));
    
    
    return <header>
    <Link href="/">
      <img
        src="https://upvxroox3cbu7snu.public.blob.vercel-storage.com/logo.jpg"
        alt="Logo"
      />
    </Link>
  <LangSwitcher />
    <ul>
      <li>
        <Link href="/dekoracje">Wszystkie dekoracje</Link>
      </li>
      <li>
        <Link href="/nowa">Dodaj nową</Link>
      </li>
    { cookieStore.get("initials")?.value === 'MQ' 
      && 
      <li>
        <Link href="/cechy">Cechy</Link>
      </li>
      }
    { cookieStore.get("initials")?.value === 'MQ' 
      && 
      <li>
        <Link href="/przewagi">Przewagi</Link>
      </li>
      }
      <li>
        <Link href="/login">{ loggedIn ? loggedIn.value : 'Zaloguj'}</Link>
      </li>
    </ul>
  </header>
}