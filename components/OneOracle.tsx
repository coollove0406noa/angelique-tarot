"use client";
import { useEffect, useState } from "react";
import { MAJOR_ARCANA, type Card } from "../lib/deck";
import OneCardTarot from "./OneCardTarot";

export default function OneOracle() {
  const [entry, setEntry] = useState<{card: Card; reversed: boolean} | null>(null);

  const draw = () => {
    const i = Math.floor(Math.random() * MAJOR_ARCANA.length);
    return { card: MAJOR_ARCANA[i], reversed: Math.random() < 0.5 };
  };

  useEffect(() => setEntry(draw()), []);

  if (!entry) return null;
  const { card, reversed } = entry;

  return (
    <div className="grid place-items-center gap-3">
      <OneCardTarot card={card} />
      <div className="text-center text-sm opacity-70">
        {reversed ? "逆位置" : "正位置"}
      </div>
      {card.upright || card.reversed ? (
        <p className="max-w-[32rem] text-center leading-7 px-4">
          {reversed ? card.reversed ?? "" : card.upright ?? ""}
        </p>
      ) : null}
      <button
        onClick={() => setEntry(draw())}
        className="px-4 py-2 rounded-lg shadow border bg-white hover:bg-gray-50"
      >
        もう一度引く 🔮
      </button>
    </div>
  );
}
