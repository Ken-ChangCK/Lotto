export type Rarity = "common" | "rare" | "epic" | "legendary";

export interface Prize {
  id: string;
  name: string;
  image: string;
  probability: number; // 0-100
  rarity: Rarity;
  description?: string;
}

export const RARITY_COLORS: Record<Rarity, string> = {
  common: "#94a3b8", // 灰色
  rare: "#3b82f6", // 蓝色
  epic: "#a855f7", // 紫色
  legendary: "#f59e0b", // 金色
};

export const RARITY_LABELS: Record<Rarity, string> = {
  common: "普通",
  rare: "稀有",
  epic: "史诗",
  legendary: "传说",
};
