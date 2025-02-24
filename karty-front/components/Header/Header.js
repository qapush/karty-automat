import { cookies } from "next/headers";

import Link from "next/link";

export default async function Header(){
    
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
        <a href="/dekoracje">Wszystkie dekoracje</a>
      </li>
      <li>
        <a href="/nowa">Dodaj nową</a>
      </li>
      <li>
        <a href="/cechy">Cechy</a>
      </li>
      <li>
        <a href="/login">{ loggedIn ? loggedIn.value : 'Zaloguj'}</a>
      </li>
    </ul>
  </header>
}