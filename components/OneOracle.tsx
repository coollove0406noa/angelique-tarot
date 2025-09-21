// components/OneOracle.tsx
"use client";

import { useEffect, useState } from "react";
import { MAJOR_ARCANA, type Card } from "@/lib/deck";
import OneCardTarot from "./OneCardTarot";

function drawRandom(): Card {
  const i = Math.floor(Math.random() * MAJOR_ARCANA.length);
  return MAJOR_ARCANA[i];
}

export default function OneOracle() {
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    setCard(drawRandom()); // 初回マウント時に1枚引く
  }, []);

  if (!card) return <p className="text-center">シャッフル中…</p>;

  return (
    <div className="grid place-items-center gap-4">
      <OneCardTarot card={card} />
      <button
        onClick={() => setCard(drawRandom())}
        className="px-4 py-2 rounded-lg shadow border bg-white hover:bg-gray-50"
      >
        もう一度引く 🔮
      </button>
    </div>
  );
}
