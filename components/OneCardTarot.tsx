"use client";

import React, { useMemo, useState } from "react";
import type { Card } from "../lib/deck";
import { FULL_DECK, MAJOR_ARCANA } from "../lib/deck";

// 乱数（デイリー用に固定シードも使える）
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function pickOne<T>(arr: T[], rng: () => number) {
  return arr[Math.floor(rng() * arr.length)];
}

export default function OneCardTarot() {
  const [card, setCard] = useState<Card | null>(null);
  const [isReversed, setIsReversed] = useState(false);
  const [mode, setMode] = useState<"free" | "daily">("free");
  const [reverseRate, setReverseRate] = useState(0.5);
  const [useMajorOnly, setUseMajorOnly] = useState(false);

  const deck = useMemo(() => (useMajorOnly ? MAJOR_ARCANA : FULL_DECK), [useMajorOnly]);

  const draw = () => {
    const seed =
      mode === "daily"
        ? Number(new Date().toISOString().slice(0, 10).replace(/-/g, ""))
        : Math.floor(Math.random() * 1e9);
    const rng = mulberry32(seed);
    const picked = pickOne(deck, rng);
    const reversed = rng() < reverseRate;

    setCard(picked);
    setIsReversed(reversed);
  };

  return (
    <div style={{ padding: 24, fontFamily: "system-ui, sans-serif", lineHeight: 1.6 }}>
      {/* ← タイトルの羽はこの h1 の中に置きます */}
      <h1 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
        Angelique Tarot — ワンオラクル
        <span aria-hidden="true" style={{ marginLeft: 8 }}>🪽</span>
      </h1>

      {/* 操作エリア */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 12,
          alignItems: "center",
          border: "1px solid #eee",
          borderRadius: 12,
          padding: 12,
          marginBottom: 16,
        }}
      >
        <div>
          <label>
            <input
              type="radio"
              name="mode"
              value="free"
              checked={mode === "free"}
              onChange={() => setMode("free")}
            />{" "}
            自由に引く
          </label>
          {"  "}
          <label style={{ marginLeft: 8 }}>
            <input
              type="radio"
              name="mode"
              value="daily"
              checked={mode === "daily"}
              onChange={() => setMode("daily")}
            />{" "}
            デイリー（同じ日は同じ結果）
          </label>
        </div>

        <label style={{ marginLeft: 8 }}>
          <input
            type="checkbox"
            checked={useMajorOnly}
            onChange={(e) => setUseMajorOnly(e.target.checked)}
          />{" "}
          大アルカナのみ
        </label>

        <label style={{ marginLeft: 8 }}>
          逆位置率：{Math.round(reverseRate * 100)}%
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={reverseRate}
            onChange={(e) => setReverseRate(parseFloat(e.target.value))}
            style={{ verticalAlign: "middle", marginLeft: 6 }}
          />
        </label>

        <button
          onClick={draw}
          style={{
            marginLeft: "auto",
            padding: "8px 14px",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#ffe4e6",
            cursor: "pointer",
          }}
        >
          引く
        </button>
        <button
          onClick={() => {
            setCard(null);
            setIsReversed(false);
          }}
          style={{
            padding: "8px 14px",
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fff",
            cursor: "pointer",
          }}
        >
          リセット
        </button>
      </div>

      {/* 結果表示 */}
      {card ? (
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 16,
            display: "grid",
            gridTemplateColumns: "200px 1fr",
            gap: 16,
            alignItems: "start",
          }}
        >
          {/* カード画像（左） */}
          <div
            style={{
              height: 280,
              border: "1px solid #ddd",
              borderRadius: 12,
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
              background: "#fff",
              transform: isReversed ? "rotate(180deg)" : "none",
            }}
            title="ここにカード画像を置けます（/public/cards/...）"
          >
            {card.img ? (
              <img
                src={card.img}
                alt={`${card.name_en} / ${card.name_jp}`}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            ) : (
              <span style={{ fontSize: 48 }}>🪽</span>
            )}
          </div>

          {/* 詳細テキスト（右） */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>
                {card.name_jp} / {card.name_en}
              </h2>
              {/* ← 正逆ラベルの <span> はこの位置。開きタグ～閉じタグまで崩さない */}
              <span
                style={{
                  padding: "2px 8px",
                  borderRadius: 999,
                  fontSize: 12,
                  background: isReversed ? "#ffe4e6" : "#dcfce7",
                  color: isReversed ? "#be123c" : "#166534",
                }}
              >
                {isReversed ? "逆位置" : "正位置"}
              </span>
            </div>

            {/* 詳細本文（長文があれば優先） */}
            <p style={{ marginTop: 10, fontSize: 16 }}>
              {isReversed
                ? (card as any).long_reversed ?? (card as any).reversed ?? ""
                : (card as any).long_upright ?? (card as any).upright ?? ""}
            </p>

            {/* キーワード（あれば） */}
            {(card as any).keywords && (card as any).keywords.length > 0 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 8 }}>
                {(card as any).keywords.map((k: string) => (
                  <span
                    key={k}
                    style={{
                      fontSize: 12,
                      padding: "2px 8px",
                      borderRadius: 999,
                      background: "#fff1f2",
                      color: "#9d174d",
                      border: "1px solid #ffe4e6",
                    }}
                  >
                    {k}
                  </span>
                ))}
              </div>
            )}

            {/* セクション別（あれば） */}
            <div style={{ display: "grid", gap: 8, marginTop: 12 }}>
              {(card as any).love && (
                <div>
                  <strong style={{ color: "#be185d" }}>恋愛：</strong> {(card as any).love}
                </div>
              )}
              {(card as any).work && (
                <div>
                  <strong style={{ color: "#7c3aed" }}>仕事：</strong> {(card as any).work}
                </div>
              )}
              {(card as any).money && (
                <div>
                  <strong style={{ color: "#0f766e" }}>金運：</strong> {(card as any).money}
                </div>
              )}
              {(card as any).advice && (
                <div>
                  <strong style={{ color: "#1f2937" }}>アドバイス：</strong> {(card as any).advice}
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 12,
            padding: 24,
            textAlign: "center",
          }}
        >
          ボタンを押して一枚引いてみましょう。
        </div>
      )}
    </div>
  );
}
