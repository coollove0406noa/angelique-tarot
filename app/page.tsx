// app/page.tsx
import OneOracle from "@/components/OneOracle";

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6 text-center">ワンオラクル 🔮</h1>
      <OneOracle />
    </main>
  );
}
