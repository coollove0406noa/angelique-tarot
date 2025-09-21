// components/OneCardTarot.tsx
import CardImage from "./CardImage";
import { Card } from "@/lib/deck";

export default function OneCardTarot({ card }: { card: Card }) {
  return (
    <div className="max-w-[320px] mx-auto">
      <div className="rounded-xl shadow-lg ring-1 ring-black/5 overflow-hidden bg-white">
        <CardImage src={card.image} alt={card.name} />
      </div>
      <p className="mt-2 text-center">{card.name}</p>
    </div>
  );
}
