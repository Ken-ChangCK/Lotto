"use client";

import { Prize, RARITY_COLORS, RARITY_LABELS } from "../types/prize";

interface PrizeDisplayProps {
  prize: Prize | null;
  onClose: () => void;
}

export default function PrizeDisplay({ prize, onClose }: PrizeDisplayProps) {
  if (!prize) return null;

  const rarityColor = RARITY_COLORS[prize.rarity];
  const rarityLabel = RARITY_LABELS[prize.rarity];

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full mx-4 animate-scaleIn"
        style={{
          boxShadow: `0 0 60px ${rarityColor}40`,
        }}
      >
        {/* 稀有度标签 */}
        <div className="flex justify-center mb-6">
          <span
            className="px-6 py-2 rounded-full text-white font-bold text-sm uppercase tracking-wider"
            style={{ backgroundColor: rarityColor }}
          >
            {rarityLabel}
          </span>
        </div>

        {/* 奖项图标 */}
        <div
          className="text-8xl text-center mb-6 animate-bounce"
          style={{ animationDuration: "1s", animationIterationCount: "3" }}
        >
          {prize.image}
        </div>

        {/* 奖项名称 */}
        <h2
          className="text-3xl font-bold text-center mb-4"
          style={{ color: rarityColor }}
        >
          {prize.name}
        </h2>

        {/* 奖项描述 */}
        {prize.description && (
          <p className="text-gray-600 text-center mb-6">{prize.description}</p>
        )}

        {/* 概率显示 */}
        <p className="text-gray-400 text-center text-sm mb-6">
          中奖概率: {prize.probability}%
        </p>

        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-full hover:shadow-lg hover:scale-105 transition-all duration-200"
        >
          确定
        </button>
      </div>
    </div>
  );
}
