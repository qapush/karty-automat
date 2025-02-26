import styles from "./dekoracja.module.css";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { headers } from "next/headers";

// import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";

async function setInitials(formData) {
  "use server";

  const cookieStore = await cookies();

  const initials = formData.get("initials");
  if(!initials) return;
  cookieStore.set("initials", initials, { maxAge: 60 * 60 * 24 * 30 });
}

async function resetInitials() {
  "use server";
  console.log("reset initials");

  const cookieStore = await cookies();

  cookieStore.delete("initials");
  redirect("/dekoracje/noid");
}

export default async function NoId({ params }) {
  const cookieStore = await cookies();
  const initials = cookieStore.get("initials");

  const initialsForm = (
    <div className={styles.container}>
      <form action={setInitials}>
        <label>
          {initials ? "Zmień" : "Podaj inicjały"}
          <br></br>
          <br></br>
          <input type="text" name="initials" />
        </label>
        <button className='btn'>Dodaj</button>
      </form>
    </div>
  );

  return <>
  { initials ? <h2 className='page-title'>Ustawione inicjały: {initials.value}</h2> : null }
  {initialsForm}
  </>;
}
