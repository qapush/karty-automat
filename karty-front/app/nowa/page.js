import DekoracjaForm from "@/components/Dekoracja/DekoracjaForm";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function DekoracjePage() {
  const cookieStore = await cookies();

  if (!cookieStore.get("initials")) {
    redirect("/login");
  }

  return (
    <div>
      <a style={{ textAlign: "center", display: "block" }} href="/dekoracje">
        ← wszystkie dekoracje
      </a>
      <h1 className="page-title">Dodaj dekoracje</h1>
      <a
        style={{ textAlign: "center", display: "block" }}
        href="./dekoracje/noid"
      >
        dodaj dekorację bez ID
      </a>
      <DekoracjaForm add />
    </div>
  );
}
