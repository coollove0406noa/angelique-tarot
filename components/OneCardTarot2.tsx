// components/OneCardTarot2.tsx
"use client";

import { useMemo, useState } from "react";
import { FULL_DECK, type Card } from "../lib/deck"; // ← 相対パス（@が使えるなら "@/lib/deck" でもOK）
import OneCardTarot from "./OneCardTarot";

export default function OneCardTarot2() {
  // 例：全カードを使う（フィルタ無し）
  const playableDeck = useMemo(() => FULL_DECK, []);

  // 例：最初の3枚だけ使いたい場合（愚者=0, 魔術師=1, 世界=21）
  // const playableDeck = useMemo(
  //   () => FULL_DECK.filter((c) => [0, 1, 21].includes(c.id)),
  //   []
  // );

  if (playableDeck.length === 0) {
    return <p className="text-center">デッキが空です</p>;
  }

  const [card, setCard] = useState<Card>(playableDeck[0]);

  const draw = () =>
    playableDeck[Math.floor(Math.random() * playableDeck.length)];

  return (
    <div className="grid place-items-center gap-4">
      <OneCardTarot card={card} />
      <button
        onClick={() => setCard(draw())}
        className="px-4 py-2 rounded-lg shadow border bg-white hover:bg-gray-50"
      >
        もう一度引く 🔮
      </button>
    </div>
  );
}
