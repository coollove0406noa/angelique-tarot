// lib/deck.ts

// ✅ any回避のため、詳細フィールドを “すべて任意” で型に追加
export type Card = {
  id: "fool" | "magician" | "world";
  name_jp: string;
  upright?: string;
  reversed?: string;
  img: string; // /cards/xxx.svg を入れる

  // 詳細（任意）
  long_upright?: string;
  long_reversed?: string;
  love?: string;
  work?: string;
  money?: string;
  advice?: string;
  keywords?: string[];
};

// --- 大アルカナ（まずは3枚で動作確認） ---
export const deck: Card[] = [
  {
    id: "fool",
    name_jp: "愚者",
    upright: "自由・可能性",
    reversed: "無計画・愚かさ",
    img: "/cards/00_fool.svg",    long_upright:
      "未知への一歩。固定観念を外し、直感と遊び心を信じて進む時。失敗を恐れない軽やかさが新しい可能性を呼び込みます。",
    long_reversed:
      "準備不足や衝動でのスタートに注意。現実的な段取りや安全策を整え、勢いだけで飛び出さないこと。",
    love: "出会い運◎。自然体で魅力が伝わる。関係性では“期待を押しつけない自由さ”が鍵。",
    work: "新規プロジェクト/転職の兆し。小さく試して学ぶ姿勢が吉。",
    money: "小さな投資や学びへの出費は◎。衝動買いはNG。",
    advice: "“まず一歩”を今日中に。完璧主義より行動。",
    keywords: ["始まり", "純粋", "冒険", "直感", "自由"],
  },
   {
    id: "magician",
    name_jp: "魔術師",
    upright: "創造・始まり",
    reversed: "迷い・未熟",
    img: "/cards/01_magician.svg",
    long_upright:
      "意図と行動が一直線に繋がる時。手元の道具（スキル/人脈/時間）を組み合わせ、目に見える成果へ。",
    long_reversed:
      "“できるフリ”になっていないか見直しを。準備の甘さや説明不足が誤解を招く恐れ。",
    love: "告白/アプローチに追い風。言葉と行動で誠実さを示すと進展。",
    work: "プレゼン・営業・交渉◎。段取りとデモ準備を入念に。",
    money: "副業/スキルの現金化。情報の真偽を見極めて契約を。",
    advice: "目標を1文に“可視化”して机に貼る。今日の最小アクションを決める。",
    keywords: ["意図", "表現", "実行", "スキル", "コミュニケーション"],
  },
  {
    id: "world",
    name_jp: "世界",
    upright: "完成・達成",
    reversed: "未完・停滞",
    img: "/cards/21_world.svg",
    long_upright:
      "一区切りの達成。努力が結実し、点と点が線になる。次章へ向けた“卒業”の時期。",
    long_reversed:
      "最後の仕上げ/検収/振り返りが不足。結びのコミュニケーションを怠らないで。",
    love: "関係の成熟・公式化に吉。遠距離/国境を越える縁も。",
    work: "リリース/納品/成果発表◎。ドキュメント整備と共有で価値が最大化。",
    money: "長期計画の完走。利益の再配分/寄付/次の投資設計へ。",
    advice: "“完了宣言”を言葉にする。感謝とともに次の目標を一つ決める。",
    keywords: ["達成", "統合", "完了", "節目", "循環"],
  },
];

// まずは大アルカナだけでプレイアブル

