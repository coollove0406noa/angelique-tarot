// components/OneCardTarot.tsx
"use client";

import Image from "next/image";
 import { FULL_DECK as DECK, type Card } from "@/lib/deck"
type Props = {
  card: Card;
  reversed?: boolean; // 逆位置なら 180° 回転
};

export default function OneCardTarot({ card, reversed = false }: Props) {
  // キャッシュ無効化用のクエリ（ローカルは毎回変わるように）
// components/OneCardTarot.tsx
const v = process.env.NEXT_PUBLIC_BUILD_ID ?? Date.now().toString();
const src = `${card.image}?v=${v}`;
<Image src={src} alt={card.name} width={440} height={640} className={reversed?"rotate-180":""} />
// components/OneOracle.tsx
const meaning =
  (reversed ? card.reversed : card.upright)
  ?? (card as any).advice?.all
  ?? "";

  return (
    <div className="select-none">
      <Image
        src={src}
        alt={card.name}
        width={440}
        height={640}
        priority
        draggable={false}
        className={`block drop-shadow ${reversed ? "rotate-180" : ""}`}
      />
    </div>
  );
}
