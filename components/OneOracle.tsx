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
  const v = process.env.NEXT_PUBLIC_BUILD_ID ?? Date.now().toString();
  const src = `${card.image}?v=${v}`;

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
