// components/OneOracle.tsx
"use client";

import { useEffect, useState } from "react";
import OneCardTarot from "./OneCardTarot";
import { MAJOR_ARCANA } from "../../lib/deck";


function drawRandom(): Card {
  const i = Math.floor(Math.random() * MAJOR_ARCANA.length);
  return MAJOR_ARCANA[i];
}

export default function OneOracle() {
  const [card, setCard] = useState<Card | null>(null);

  useEffect(() => {
    console.log("DEBUG deck length =", MAJOR_ARCANA.length);
    setCard(drawRandom());
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
