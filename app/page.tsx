// app/page.tsx  ←この内容に全置換してください
import OneCardTarot2 from "../components/OneCardTarot2";

export default function Page() {
  return (
    <main style={{ maxWidth: 880, margin: "40px auto", padding: 16 }}>
      <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>🌟 ワンオラクル・タロット</h1>
      <OneCardTarot2 />
    </main>
  );
}
