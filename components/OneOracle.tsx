// components/OneOracle.tsx
"use client";

import { useEffect, useState } from "react";
import { FULL_DECK as DECK, type Card } from "../lib/deck";
import OneCardTarot from "./OneCardTarot";

export default function OneOracle() {
  const [card, setCard] = useState<Card | null>(null);
  const draw = () => DECK[Math.floor(Math.random() * DECK.length)];

  useEffect(() => setCard(draw()), []);

  if (!card) return <p className="text-center">シャッフル中…</p>;

  return (
    <div className="grid place-items-center gap-4">
      <div className="text-sm opacity-70">デッキ枚数: {DECK.length}</div>
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
