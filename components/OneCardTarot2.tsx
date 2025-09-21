"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { deck, type Card } from "@/lib/deck";

type DrawResult = {
  cardId: Card["id"];
  name: string;
  isReversed: boolean;
  at: string; // ISO
};
type HistoryItem = DrawResult;

const STORAGE_KEY = "onecard_history_v1";
function saveHistory(list: HistoryItem[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(-100)));
}

// これを追加
function isHistoryItem(x: unknown): x is HistoryItem {
  if (typeof x !== "object" || x === null) return false;
  const r = x as Record<string, unknown>;
  return (
    typeof r.cardId === "string" &&
    typeof r.name === "string" &&
    typeof r.isReversed === "boolean" &&
    typeof r.at === "string"
  );
}

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isHistoryItem).slice(-100); // ← 型ガードで安全に絞る
  } catch {
    return [];
  }
}

function drawRandomCard(cards: Card[]): { card: Card; isReversed: boolean } {
  const idx = Math.floor(Math.random() * cards.length);
  const isReversed = Math.random() < 0.5;
  return { card: cards[idx], isReversed };
}

export default function OneCardTarot2() {
  // ✅ フックはコンポーネント関数の“中”で呼ぶ
  const playableDeck = useMemo(
    () => deck.filter((c) => ["fool", "magician", "world"].includes(c.id)),
    []
  );

  const [current, setCurrent] = useState<{ card: Card; isReversed: boolean } | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [filter, setFilter] = useState<"all" | "upright" | "reversed">("all");

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const filteredHistory = useMemo(() => {
    if (filter === "all") return history;
    if (filter === "upright") return history.filter((h) => !h.isReversed);
    return history.filter((h) => h.isReversed);
  }, [history, filter]);

  const handleDraw = useCallback(() => {
    const result = drawRandomCard(playableDeck); // ← deck ではなく playableDeck
    setCurrent(result);

    const item: HistoryItem = {
      cardId: result.card.id,
      name: result.card.name_jp,
      isReversed: result.isReversed,
      at: new Date().toISOString(),
    };
    setHistory((prev) => {
      const next = [...prev, item].slice(-100);
      saveHistory(next);
      return next;
    });
  }, [playableDeck]);

  const handleClearHistory = useCallback(() => {
    setHistory([]);
    saveHistory([]);
  }, []);

  const handleShare = useCallback(async () => {
    if (!current) return;
    const orientation = current.isReversed ? "（逆位置）" : "（正位置）";
    const text = `今日のワンオラクル：${current.card.name_jp}${orientation}\n${
      current.isReversed ? current.card.reversed ?? "" : current.card.upright ?? ""
    }`;

    if (navigator.share) {
      try {
        await navigator.share({ title: "ワンオラクル", text });
      } catch {
        /* noop */
      }
    } else {
      await navigator.clipboard.writeText(text);
      alert("結果をクリップボードにコピーしました。");
    }
  }, [current]);

  const handleFilterChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value as "all" | "upright" | "reversed";
    setFilter(v);
  }, []);

  return (
    <div className="mx-auto max-w-3xl p-4 space-y-6">
      <h1 className="text-2xl font-semibold">ワンオラクル・タロット</h1>

      <div className="flex items-center gap-3">
        <button
          onClick={handleDraw}
          className="px-4 py-2 rounded-xl shadow text-white bg-purple-600 hover:bg-purple-700"
        >
          カードを引く
        </button>

        <button
          onClick={handleShare}
          disabled={!current}
          className="px-4 py-2 rounded-xl shadow bg-white border hover:bg-gray-50 disabled:opacity-50"
        >
          結果をシェア/コピー
        </button>

        <div className="ml-auto flex items-center gap-2">
          <label htmlFor="filter" className="text-sm text-gray-600">
            履歴の表示
          </label>
          <select
            id="filter"
            value={filter}
            onChange={handleFilterChange}
            className="border rounded-lg px-2 py-1 text-sm"
          >
            <option value="all">すべて</option>
            <option value="upright">正位置のみ</option>
            <option value="reversed">逆位置のみ</option>
          </select>
        </div>
      </div>

      {/* 現在のカード */}
      {current ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="flex justify-center">
            <Image
              src={current.card.img ?? "/cards/21_world.svg"} // ← .svg フォールバック
              alt={current.card.name_jp}
              width={240}
              height={384}
              className={`rounded-xl shadow-lg object-cover ${current.isReversed ? "rotate-180" : ""}`}
              priority
            />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold">
              {current.card.name_jp} {current.isReversed ? "（逆位置）" : "（正位置）"}
            </h2>
            <p className="leading-relaxed">
              {current.isReversed
                ? current.card.reversed ?? "（逆位置の説明未設定）"
                : current.card.upright ?? "（正位置の説明未設定）"}
            </p>
          </div>
        </div>
      ) : (
        <p className="text-gray-600">「カードを引く」を押して、今日のメッセージを受け取りましょう。</p>
      )}

      {/* 履歴 */}
      <div className="border rounded-2xl p-4">
        <div className="flex items-center gap-3 mb-3">
          <h3 className="font-semibold">履歴</h3>
          <button onClick={handleClearHistory} className="ml-auto text-sm text-red-600 hover:underline">
            すべて削除
          </button>
        </div>

        {filteredHistory.length === 0 ? (
          <p className="text-sm text-gray-600">履歴はまだありません。</p>
        ) : (
          <ul className="space-y-2">
            {filteredHistory
              .slice()
              .reverse()
              .map((h) => {
                const card = playableDeck.find((c) => c.id === h.cardId);
                return (
                  <li
                    key={`${h.cardId}-${h.at}`}
                    className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50"
                  >
                    <Image
                      src={card?.img ?? "/cards/21_world.svg"} // ← .svg フォールバック
                      alt={h.name}
                      width={40}
                      height={64}
                      className={`rounded-md object-cover ${h.isReversed ? "rotate-180" : ""}`}
                    />
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {h.name} {h.isReversed ? "（逆）" : "（正）"}
                      </p>
                      <p className="text-xs text-gray-500">{new Date(h.at).toLocaleString()}</p>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
      </div>
    </div>
  );
}
