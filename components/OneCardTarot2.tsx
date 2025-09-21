// components/OneCardTarot2.tsx
"use client";

import { useMemo, useState } from "react";
import { MAJOR_ARCANA, type Card } from "../lib/deck"; // @ が効くなら "@/lib/deck"
import OneCardTarot from "./OneCardTarot";

export default function OneCardTarot2() {
  const playableDeck = useMemo(() => MAJOR_ARCANA, []);
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
