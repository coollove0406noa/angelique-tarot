// components/OneCardTarot.tsx
"use client";

import Image from "next/image";
import type { Card } from "../lib/deck";

// 大アルカナ 22枚用のスラッグ（ファイル名が 00_fool.svg 〜 21_world.svg の想定）
const SLUGS = [
  "fool","magician","high_priestess","empress","emperor","hierophant","lovers",
  "chariot","strength","hermit","wheel","justice","hanged_man","death","temperance",
  "devil","tower","star","moon","sun","judgement","world"
];

type Props = {
  card: Card;
  reversed?: boolean; // 逆位置なら 180° 回転
};

function resolveImagePath(card: any) {
  // 1) deck に image があれば最優先
  if (card?.image) return card.image as string;

  // 2) id → 2桁ゼロ埋め + 既知スラッグ 例: /cards/00_fool.svg
  const two = String(card.id).padStart(2, "0");
  const slug = SLUGS[card.id];
  if (typeof slug === "string") return `/cards/${two}_${slug}.svg`;

  // 3) 最後の保険: 2桁だけ or name からざっくり生成
  if (card?.name) {
    const rough = String(card.name).toLowerCase().replace(/\s+/g, "_");
    return `/cards/${two}_${rough}.svg`;
  }
  return `/cards/${two}.svg`;
}

export default function OneCardTarot({ card, reversed = false }: Props) {
  // キャッシュ無効化（ローカル検証用。公開環境は NEXT_PUBLIC_BUILD_ID を推奨）
  const v = process.env.NEXT_PUBLIC_BUILD_ID ?? Date.now().toString();
  const src = `${resolveImagePath(card)}?v=${v}`;

  return (
    <div className="select-none">
      <Image
        src={src}
        alt={card.name}
        width={440}
        height={640}
        priority
        draggable={false}
        className={`block drop-shadow ${reversed ? "rotate-180" : ""}`}
      />
    </div>
  );
}
