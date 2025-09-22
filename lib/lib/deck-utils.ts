// 旧: type が "major" のカードだけを厳密フィルタ → type 未設定カードが全落ち
// export function filterByDeckMode(cards: Card[], mode: "major"|"all") {
//   if (mode === "major") return cards.filter(c => c.type === "major");
//   return cards;
// }

// 新: type が未設定（古いデータ）なら「major扱い」にする
export function filterByDeckMode(cards: any[], mode: "major" | "all") {
  if (mode === "major") {
    return cards.filter((c) => {
      if (!("type" in c)) return true;         // ← 互換: type 無しは major とみなす
      return c.type === "major";
    });
  }
  return cards;
}
