cd C:\dev\angelique-tarot
@'
// lib/deck.ts
export type Card = {
  id: number;
  name: string;
  keywords: string[];
  image: string;
  upright?: string;
  reversed?: string;
};

const NAMES = [
  "愚者","魔術師","女教皇","女帝","皇帝","法王","恋人","戦車","力","隠者",
  "運命の輪","正義","吊るされた男","死神","節制","悪魔","塔","星","月","太陽","審判","世界"
];

const SLUGS = [
  "fool","magician","high_priestess","empress","emperor","hierophant","lovers",
  "chariot","strength","hermit","wheel","justice","hanged_man","death","temperance",
  "devil","tower","star","moon","sun","judgement","world"
];

const UPRIGHT = [
  "自由・純真・冒険","創造・意志・集中","直感・静観・神秘","肥沃・愛情・豊かさ","権威・安定・構造",
  "伝統・学び・信頼","選択・調和・愛","勝利・前進・意志力","勇気・自己制御・慈愛","探求・内省・指導",
  "変化・転機・流れ","公平・バランス・真実","受容・視点転換・奉仕","終結・浄化・再生","調整・節度・融合",
  "影の統合・欲望の自覚","覚醒・崩壊・再構築","希望・癒し・インスピレーション","潜在意識・想像・感性",
  "成功・活力・喜び","目覚め・赦し・決断","完成・達成・統合"
];

const REVERSED = [
  "無謀・優柔不断・遅延","操作・空回り・未熟","鈍感・秘密・閉塞","過保護・浪費・停滞","独裁・硬直・支配",
  "偏狭・形式主義・反抗","不一致・迷い・不和","失速・焦り・方向迷子","弱気・葛藤・自己嫌悪","孤立・固執・閉じこもり",
  "停滞・不運・流れに逆らう","不公正・偏り・自己弁護","犠牲過多・惰性・優柔不断","抵抗・惰性・未練","極端・過剰・不調和",
  "依存・束縛・自己欺瞞","破局・混乱・拒否","失望・現実逃避・枯渇","混乱・誤解・妄想","空元気・過信・消耗",
  "固執・後悔・自己批判","未完・停滞・散漫"
];

// 大アルカナ22枚（画像名は 00_fool.svg ～ 21_world.svg 前提）
export const MAJOR_ARCANA: Card[] = Array.from({ length: 22 }, (_, i) => ({
  id: i,
  name: NAMES[i],
  keywords: [],
  image: `/cards/${String(i).padStart(2, "0")}_${SLUGS[i]}.svg`,
  upright: UPRIGHT[i],
  reversed: REVERSED[i],
}));

// 小アルカナ（必要ならここに追記してください）
export const MINOR_ARCANA: Card[] = [
  // 例）{ id: 100, name: "Ace of Cups", keywords: [], image: "/cards/minor/ace_cups.svg", upright: "愛の芽生え", reversed: "停滞・空虚" },
];

// フルデッキ（画面側はこれを使う）
export const FULL_DECK: Card[] = [...MAJOR_ARCANA, ...MINOR_ARCANA];

// 互換用（OneCardTarot2 などが deck をインポートしている場合）
export const deck = FULL_DECK;
'@ | Set-Content -Encoding UTF8 lib\deck.ts
