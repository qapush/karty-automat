import DekoracjaForm from '@/components/Dekoracja/DekoracjaForm';
export default async function DekoracjePage() {




  return (
    <div>
      <a style={{textAlign: 'center', display: 'block'}} href="/dekoracje">← wszystkie dekoracje</a>
      <h1 className='page-title'>Dodaj dekoracje</h1>
      <a style={{textAlign: 'center', display: 'block'}} href="./dekoracje/noid">dodaj dekorację bez ID</a>
      <DekoracjaForm add />
    </div>
  );
}
