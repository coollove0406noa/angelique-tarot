// components/OneCardTarot2.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { FULL_DECK as DECK, type Card } from "@/lib/deck";
import OneCardTarot from "./OneCardTarot";

type DrawResult = { card: Card; isReversed: boolean };
type HistoryItem = {
  cardId: number;
  name: string;
  isReversed: boolean;
  at: string; // ISO
};

// ランダムに1枚引く
function drawOne(): DrawResult {
  const i = Math.floor(Math.random() * DECK.length);
  return { card: DECK[i], isReversed: Math.random() < 0.5 };
}

export default function OneCardTarot2() {
  const [result, setResult] = useState<DrawResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 初回に1回引く
  useEffect(() => {
    handleDraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // もう一度引く
  const handleDraw = useCallback(() => {
    const r = drawOne();
    setResult(r);

    // 履歴に追加（最新が先頭）
    const item: HistoryItem = {
      cardId: r.card.id,
      name: r.card.name,            // ✅ name_jp ではなく name
      isReversed: r.isReversed,
      at: new Date().toISOString(),
    };
    setHistory((prev) => [item, ...prev].slice(0, 30));
  }, []);

  if (!result) {
    return <p className="text-center">シャッフル中…</p>;
  }

  const { card, isReversed } = result;

  // 詳細文（deck.ts に upright / reversed / advice.all があれば表示）
  const meaning =
    (isReversed ? (card as any).reversed : (card as any).upright) ??
    (card as any).advice?.all ??
    "";

  return (
    <div className="grid gap-4 max-w-[44rem] mx-auto">
      <div className="text-sm opacity-70 text-center">デッキ枚数: {DECK.length}</div>

      <div className="grid place-items-center">
        <OneCardTarot card={card} reversed={isReversed} />
        <div className="text-center text-sm opacity-70 mt-2">
          {isReversed ? "逆位置" : "正位置"} / {card.name}
        </div>
        {meaning ? (
          <p className="text-center leading-7 px-4 whitespace-pre-wrap mt-2">{meaning}</p>
        ) : (
          <p className="text-center text-sm opacity-60 mt-2">※ このカードの意味は未入力です</p>
        )}
        <button
          onClick={handleDraw}
          className="mt-3 px-4 py-2 rounded-lg shadow border bg-white hover:bg-gray-50"
        >
          もう一度引く 🔮
        </button>
      </div>

      {/* 履歴 */}
      <div className="mt-4">
        <h2 className="text-sm font-semibold opacity-70 mb-2">履歴</h2>
        <ul className="space-y-1 text-sm">
          {history.map((h, idx) => (
            <li key={idx} className="flex items-center justify-between border-b py-1">
              <span>
                #{h.cardId} {h.name} {h.isReversed ? "(逆)" : "(正)"}
              </span>
              <time className="opacity-60">{new Date(h.at).toLocaleString()}</time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
