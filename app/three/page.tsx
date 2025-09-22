// app/three/page.tsx
import ResultStamp from "@/components/ResultStamp";
import ExportImageButton from "@/components/ExportImageButton";
import ShareActions from "@/components/ShareActions";
import { nowUnix, withParam } from "@/lib/format";
import { useSearchParams } from "next/navigation";

import { MAJOR_ARCANA } from "../../lib/deck";
import OneCardTarot from "../../components/OneCardTarot";

export default function ThreeSpread() {
  const deck = [...MAJOR_ARCANA];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
 const sp = useSearchParams();
const openDefault = sp.get("s") === "1"; // 詳細デフォ開き
const t = nowUnix();
const stampedUrl = withParam(currentShareUrl, "t", String(t));

  const cards = deck.slice(0, 3);
  const labels = ["過去", "現在", "未来"];
  return (
    <main className="p-8 grid md:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <div key={c.id}>
          <h2 className="text-center font-bold mb-2">{labels[i]}</h2>
          <OneCardTarot card={c} />
        </div>
      ))}
    </main>
  );
}
<div id="result" className="mx-auto max-w-[1100px]">
  {/* 3枚カードと説明 */}
  <ResultStamp unix={t} />
</div>

<div className="mt-3 flex flex-wrap gap-2">
  <ExportImageButton targetId="result" filename={`angelique-three-${t}.png`} />
  <ShareActions url={stampedUrl} />
</div>
import DeckSwitch from "@/components/DeckSwitch";

<DeckSwitch />
