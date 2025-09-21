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
    console.log("DEBUG deck length =", MAJOR_ARCANA.length);
    console.log("DEBUG names =", MAJOR_ARCANA.map(c => c.name).join(", "));
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

2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
sName="text-center">シャッフル中…</p>;

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
