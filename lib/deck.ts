// lib/deck.ts
export type Card = {
  id: string;
  name_jp: string;
  upright?: string;
  reversed?: string;
  img: string;           // /cards/*.svg
  long_upright?: string; // 詳しい説明（正）
  long_reversed?: string;// 詳しい説明（逆）
  love?: string;
  work?: string;
  money?: string;
  advice?: string;
  keywords?: string[];
};

export const deck: Card[] = [
  {
    id: "fool",
    name_jp: "愚者",
    upright: "自由・可能性",
    reversed: "無計画・愚かさ",
    img: "/cards/00_fool.svg",
    long_upright:
      "未知への一歩。固定観念を外し、直感と遊び心を信じて進む時。失敗を恐れない軽やかさが新しい可能性を呼び込みます。",
    long_reversed:
      "準備不足や衝動でのスタートに注意。現実的な段取りや安全策を整え、勢いだけで飛び出さないこと。",
    love: "出会い運◎。自然体で魅力が伝わる。押しつけない自由さが鍵。",
    work: "新規プロジェクト/転職の兆し。小さく試して学ぶ姿勢が吉。",
    money: "学びや体験への投資は◎。衝動買いはNG。",
    advice: "完璧主義より“まず一歩”。",
    keywords: ["始まり", "純粋", "冒険", "直感", "自由"],
  },
  {
    id: "magician",
    name_jp: "魔術師",
    upright: "創造・始まり",
    reversed: "迷い・未熟",
    img: "/cards/01_magician.svg",
    long_upright:
      "意図と行動が一直線に。手元の道具（スキル/人脈/時間）を組み合わせ、目に見える成果へ。",
    long_reversed:
      "“できるフリ”になっていないか見直しを。準備不足や説明不足が誤解を招く恐れ。",
    love: "言葉と行動で誠実さを示すと進展。",
    work: "プレゼン/交渉◎。段取りとデモの準備を入念に。",
    money: "副業やスキルの現金化。情報の真偽を見極めて契約を。",
    advice: "目標を1文で可視化し机に貼る。",
    keywords: ["意図", "表現", "実行", "スキル", "コミュニケーション"],
  },
  {
    id: "high_priestess",
    name_jp: "女教皇",
    upright: "知恵・静寂・直感",
    reversed: "停滞・秘密・閉鎖的",
    img: "/cards/02_high_priestess.svg",
    long_upright:
      "心を静めるほどに真実が見える時。声高な主張よりも、観察と洞察で本質を掴む。",
    long_reversed:
      "感情を抑え込みすぎて伝わらない恐れ。内面の声を言葉にする小さな勇気を。",
    love: "焦らず信頼を育てる。距離感を大切に。",
    work: "リサーチ/分析◎。まずは情報整理から。",
    money: "慎重さが吉。長期視点で貯蓄と学びを優先。",
    advice: "静かな時間を10分つくる。ノートに直感を書き出す。",
    keywords: ["洞察", "受容", "学び", "沈思", "内省"],
  },
  {
    id: "empress",
    name_jp: "女帝",
    upright: "豊かさ・成長・受容",
    reversed: "散漫・過保護・停滞",
    img: "/cards/03_empress.svg",
    long_upright:
      "育む力が満ちる。人や作品、計画がのびのび成長する土壌を整えると実りが大きい。",
    long_reversed:
      "甘やかし/やり過ぎで逆効果に。境界線と優しさのバランスを見直す。",
    love: "愛情表現が実を結ぶ。家庭的な温かさ◎。",
    work: "チームビルディング/育成◎。環境づくりに投資を。",
    money: "生活の質を上げる買い物吉。無駄な浪費は控える。",
    advice: "“ありがとう”を言語化して伝える。",
    keywords: ["豊穣", "育成", "安心", "包容", "実り"],
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
    love: "関係の成熟・公式化に吉。",
    work: "リリース/納品/成果発表◎。共有で価値が最大化。",
    money: "長期計画の完走。次の投資設計へ。",
    advice: "“完了宣言”を言葉にする。",
    keywords: ["達成", "統合", "完了", "節目", "循環"],
  },
];



