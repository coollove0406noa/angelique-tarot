console.log("[OneOracle] mounted");
// components/OneOracle.tsx
"use client";

import { useEffect, useState } from "react";
import OneCardTarot from "./OneCardTarot";
// パスエイリアス(@)が無ければ "../lib/deck" に変えてOK
import { FULL_DECK as DECK, type Card } from "@/lib/deck";

type Draw = { card: Card; reversed: boolean };

export default function OneOracle() {
  const [entry, setEntry] = useState<Draw | null>(null);

  // 1枚引く
  const draw = (): Draw => {
    const i = Math.floor(Math.random() * DECK.length);
    return { card: DECK[i], reversed: Math.random() < 0.5 };
  };

  // 初回に1回だけ引く
  useEffect(() => {
    setEntry(draw());
  }, []);

  if (!entry) return <p className="text-center">シャッフル中…</p>;

  const { card, reversed } = entry;

  // 詳細文：upright/reversed → advice.all の順でフォールバック
 const meaning =
  (reversed ? (card as any).reversed : (card as any).upright)
  ?? (card as any).advice?.all
  ?? "";

  return (
    <div className="grid place-items-center gap-3 max-w-[40rem] mx-auto">
      <div className="text-sm opacity-70">デッキ枚数: {DECK.length}</div>

      {/* カード本体（逆位置は180°回転） */}
      <OneCardTarot card={card} reversed={reversed} />

      <div className="text-center text-sm opacity-70">
        {reversed ? "逆位置" : "正位置"}
      </div>

      {/* 詳細文 */}
      {meaning ? (
        <p className="text-center leading-7 px-4 whitespace-pre-wrap">{meaning}</p>
      ) : (
        <p className="text-center text-sm opacity-60">※ このカードの意味は未入力です</p>
      )}

      <button
        onClick={() => setEntry(draw())}
        className="px-4 py-2 rounded-lg shadow border bg-white hover:bg-gray-50"
      >
        もう一度引く 🔮
      </button>
    </div>
  );
}
