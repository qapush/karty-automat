import { cookies } from "next/headers";

import { Link } from "@/i18n/routing";
import { getLocale } from "next-intl/server";

export default async function Header(){

    
    const locale = await getLocale();
    console.log(locale);
    
    
    const cookieStore = await cookies();
    
    const loggedIn = cookieStore.get("initials");
    
    return <header>
    <Link href="/">
      <img
        src="https://upvxroox3cbu7snu.public.blob.vercel-storage.com/logo.jpg"
        alt="Logo"
      />
    </Link>
    <ul>
      <li>
        <Link href="/dekoracje">Wszystkie dekoracje</Link>
      </li>
      <li>
        <Link href="/nowa">Dodaj nową</Link>
      </li>
      <li>
        <Link href="/cechy">Cechy</Link>
      </li>
      <li>
        <Link href="/login">{ loggedIn ? loggedIn.value : 'Zaloguj'}</Link>
      </li>
    </ul>
  </header>
}