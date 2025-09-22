// app/page.tsx
import OneOracle from "@/components/OneOracle";
import Link from "next/link";

export default function Home() {
  return (
    <main className="grid place-items-center gap-6 p-6">
      <h1 className="text-2xl font-bold">Angelique Tarot</h1>

      {/* ✅ 3枚引きへのリンク */}
      <Link
        href="/three"
        className="px-4 py-2 rounded-lg bg-pink-500 text-white shadow hover:bg-pink-600"
      >
        3枚引きへ
      </Link>

      <div className="w-full max-w-md">
        <OneOracle />
      </div>
    </main>
  );
}


import ExportImageButton from "@/components/ExportImageButton";
import ShareActions from "@/components/ShareActions";
import { nowUnix, withParam } from "@/lib/format";

import { MAJOR_ARCANA } from "../../lib/deck";

// どこか見出しの下あたりに
<p className="text-center mt-2">
  <a href="/three" className="underline opacity-80">三枚引きへ →</a>
</p>

export const dynamic = "force-dynamic";

export default function DebugDeck() {
  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">
        デッキ確認（{MAJOR_ARCANA.length} 枚）
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MAJOR_ARCANA.map(c => (
          <div key={c.id} className="p-2 border rounded">
            <img src={c.image} alt={c.name} width={150} height={225} />
            <div className="mt-1 text-sm text-center">{c.id}: {c.name}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
const t = nowUnix();
const stampedUrl = withParam(currentShareUrl, "t", String(t));
<div id="result" className="mx-auto max-w-[1100px]">
  {/* カード表示やテキスト結果 */}
  <ResultStamp unix={t} />
</div>

<div className="mt-3 flex flex-wrap gap-2">
  <ExportImageButton targetId="result" filename={`angelique-one-${t}.png`} />
  <ShareActions url={stampedUrl} />
</div>
