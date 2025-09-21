// app/three/page.tsx
import { MAJOR_ARCANA } from "../../lib/deck";
import OneCardTarot from "../../components/OneCardTarot";

export default function ThreeSpread() {
  const deck = [...MAJOR_ARCANA];
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  const cards = deck.slice(0, 3);
  const labels = ["過去", "現在", "未来"];
  return (
    <main className="p-8 grid md:grid-cols-3 gap-6">
      {cards.map((c, i) => (
        <div key={c.id}>
          <h2 className="text-center font-bold mb-2">{labels[i]}</h2>
          <OneCardTarot card={c} />
        </div>
      ))}
    </main>
  );
}
