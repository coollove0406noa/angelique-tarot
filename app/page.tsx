// app/page.tsx
import Link from "next/link";
import OneOracle from "@/components/OneOracle"; // エイリアス(@)が無ければ "../components/OneOracle" に

export default function Home() {
  console.log("[HOME] app/page.tsx is live"); // ← ブラウザDevToolsに出ます
  return (
    <main className="grid place-items-center gap-6 p-6">
      {/* ← まずはこれが出るかで“このファイルが使われてる”を確認 */}
      <div className="rounded-lg bg-yellow-200 text-black p-4 text-center text-xl font-bold">
        ✅ THIS IS app/page.tsx
      </div>

      {/* 3枚引きへのリンク */}
      <Link
        href="/three"
        className="px-4 py-2 rounded-lg bg-pink-500 text-white shadow hover:bg-pink-600"
      >
        3枚引きへ
      </Link>

      {/* 1枚引き（ワンオラクル） */}
      <div className="w-full max-w-md">
        <OneOracle />
      </div>
    </main>
  );
}
