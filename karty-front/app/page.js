import Link from 'next/link';

export default function Home() {
  return (
    <div style={{ maxWidth: 800, margin: 'auto', marginTop: '2rem' }}>
      <h2>Dekoracje bez ID</h2>
      <ul style={{ marginTop: '2rem' }}>
        <li>
          <Link prefetch={false} href="/dekoracje/28">
            ZM
          </Link>
        </li>
        <li>
          <Link prefetch={false} href="/dekoracje/69">
            CC
          </Link>
        </li>
        <li>
          <Link prefetch={false} href="/dekoracje/41">
            MQ
          </Link>
        </li>
        <li>
          <Link prefetch={false} href="/dekoracje/42">
            PM
          </Link>
        </li>
        <li>
          <Link prefetch={false} href="/dekoracje/11">
            JS
          </Link>
        </li>
      </ul>
    </div>
  );
}
