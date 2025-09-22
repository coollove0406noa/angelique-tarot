// components/OneCardTarot2.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { FULL_DECK as DECK, type Card } from "@/lib/deck"; // 相対なら "../lib/deck"

type DrawResult = { card: Card; isReversed: boolean };
type HistoryItem = {
  cardId: number;
  name: string;
  isReversed: boolean;
  at: string; // ISO
};

// ランダムに1枚引く（必ず {card, isReversed} を返す）
function drawOne(): DrawResult {
  const i = Math.floor(Math.random() * DECK.length);
  const card = DECK[i];
  return { card, isReversed: Math.random() < 0.5 };
}

export default function OneCardTarot2() {
  const [current, setCurrent] = useState<DrawResult | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);

  // 起動時に1回引く
  useEffect(() => {
    handleDraw();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // もう一度引く
  const handleDraw = useCallback(() => {
    const result = drawOne();
    if (!result?.card) {
      console.error("drawOne() が card を返しません:", result);
      return;
    }
    setCurrent(result);

    const item: HistoryItem = {
      cardId: result.card.id,
      name: result.card.name,         // ← name_jp は使わない
      isReversed: result.isReversed,
      at: new Date().toISOString(),
    };
    setHistory((prev) => [item, ...prev].slice(0, 30));
  }, []);

  if (!current) return <p className="text-center">シャッフル中…</p>;

  const { card, isReversed } = current;

  // 詳細文（deck.ts に upright/reversed/advice.all があれば表示）
  const meaning =
    (isReversed ? card.reversed : card.upright) ??
    card.advice?.all ??
    "";

  return (
    <div className="grid gap-4 max-w-[44rem] mx-auto">
      <div className="text-sm opacity-70 text-center">デッキ枚数: {DECK.length}</div>

      <div className="grid place-items-center">
        {/* 画像（image を使用。なければ世界でフォールバック） */}
        <Image
          src={card.image ?? "/cards/21_world.svg"}
          alt={card.name}
          width={240}
          height={384}
          className={isReversed ? "rotate-180" : ""}
          priority
        />

        <div className="text-center text-sm opacity-70 mt-2">
          #{card.id} {card.name} / {isReversed ? "逆位置" : "正位置"}
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
              <time className="opacity-60">
                {new Date(h.at).toLocaleString()}
              </time>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
