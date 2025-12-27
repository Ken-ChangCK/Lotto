import { Prize } from "../types/prize";

export const DEFAULT_PRIZES: Prize[] = [
  // 传说级 - 1%
  {
    id: "legendary-1",
    name: "超级大奖",
    image: "🏆",
    probability: 1,
    rarity: "legendary",
    description: "恭喜你抽中超级大奖！",
  },

  // 史诗级 - 4%
  {
    id: "epic-1",
    name: "稀有道具",
    image: "💎",
    probability: 2,
    rarity: "epic",
    description: "非常珍贵的道具",
  },
  {
    id: "epic-2",
    name: "限定角色",
    image: "⭐",
    probability: 2,
    rarity: "epic",
    description: "限定版角色卡",
  },

  // 稀有级 - 15%
  {
    id: "rare-1",
    name: "高级装备",
    image: "⚔️",
    probability: 5,
    rarity: "rare",
    description: "高级战斗装备",
  },
  {
    id: "rare-2",
    name: "魔法卷轴",
    image: "📜",
    probability: 5,
    rarity: "rare",
    description: "强力魔法卷轴",
  },
  {
    id: "rare-3",
    name: "神秘药水",
    image: "🧪",
    probability: 5,
    rarity: "rare",
    description: "增益药水",
  },

  // 普通级 - 80%
  {
    id: "common-1",
    name: "基础道具",
    image: "🎁",
    probability: 20,
    rarity: "common",
    description: "基础道具包",
  },
  {
    id: "common-2",
    name: "金币",
    image: "💰",
    probability: 20,
    rarity: "common",
    description: "一些游戏金币",
  },
  {
    id: "common-3",
    name: "经验书",
    image: "📚",
    probability: 20,
    rarity: "common",
    description: "经验值书籍",
  },
  {
    id: "common-4",
    name: "材料包",
    image: "📦",
    probability: 20,
    rarity: "common",
    description: "基础材料包",
  },
];
