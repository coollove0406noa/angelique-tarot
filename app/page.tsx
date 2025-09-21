// app/page.tsx
import { MAJOR_ARCANA } from "@/lib/deck";
import OneCardTarot from "@/components/OneCardTarot";

// 👇 これで毎リクエスト動的に（Math.randomがビルド時固定にならない）
export const dynamic = "force-dynamic"; // もしくは export const revalidate = 0;

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
