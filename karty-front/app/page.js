import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return <>
    <h1>Karty</h1>
    <br></br>
    <ul>
      <li><a href="/dekoracje">dekoracje</a></li>
      <li><a href="/cechy">cechy</a></li>
      <li><a href="/przewagi">przewagi</a></li>
    </ul>
  </>;
}
