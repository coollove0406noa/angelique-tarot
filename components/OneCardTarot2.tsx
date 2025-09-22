// components/OneCardTarot.tsx
import Image from "next/image";
import type { Card } from "../lib/deck";

export default function OneCardTarot({ card }: { card: Card }) {
  return (
    <div style={{ width: 300, margin: "0 auto", textAlign: "center" }}>
      <Image src={card.image} alt={card.name} width={300} height={450} />
      <p style={{ marginTop: 8 }}>{card.name}</p>
    </div>
  );
}
