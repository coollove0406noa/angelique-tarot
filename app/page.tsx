// index.tsx または page.tsx に貼る
import { MAJOR_ARCANA } from "@/lib/deck";
import OneCardTarot from "@/components/OneCardTarot";

export default function Home() {
  const randomIndex = Math.floor(Math.random() * MAJOR_ARCANA.length);
  const card = MAJOR_ARCANA[randomIndex];

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">ワンオラクル 🔮</h1>
      <OneCardTarot card={card} />
    </main>
  );
}
