import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundColor: '#1D6FB7' }}>
      <h1 style={{ fontSize: '3rem', color: '#FFFFFF' }}>Digo</h1>
      <Link href="/mod_facturacion">
      <button style={{ marginTop: '20px', padding: '10px 20px', fontSize: '1rem', backgroundColor: '#FFFFFF', color: '#000048', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
        Comenzar
      </button>
      </Link>
      
      
    </div>
  );
}
