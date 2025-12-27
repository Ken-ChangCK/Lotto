import { useState, useCallback } from "react";
import { Prize } from "../types/prize";
import { DEFAULT_PRIZES } from "../data/prizes";

/**
 * 加权随机抽奖算法
 * @param prizes 奖项列表
 * @returns 抽中的奖项
 */
export function drawPrize(prizes: Prize[]): Prize {
  // 计算总概率
  const totalProbability = prizes.reduce(
    (sum, prize) => sum + prize.probability,
    0
  );

  // 生成随机数
  const random = Math.random() * totalProbability;

  // 累加概率找到中奖项
  let accumulatedProbability = 0;
  for (const prize of prizes) {
    accumulatedProbability += prize.probability;
    if (random <= accumulatedProbability) {
      return prize;
    }
  }

  // 兜底返回第一个奖项
  return prizes[0];
}

export function usePrizeSystem() {
  const [prizes, setPrizes] = useState<Prize[]>(DEFAULT_PRIZES);
  const [drawnPrizes, setDrawnPrizes] = useState<Prize[]>([]);

  // 抽奖
  const draw = useCallback(() => {
    if (prizes.length === 0) {
      console.error("奖池为空！");
      return null;
    }

    const prize = drawPrize(prizes);
    setDrawnPrizes((prev) => [...prev, prize]);
    return prize;
  }, [prizes]);

  // 添加奖项
  const addPrize = useCallback((prize: Prize) => {
    setPrizes((prev) => [...prev, prize]);
  }, []);

  // 删除奖项
  const removePrize = useCallback((prizeId: string) => {
    setPrizes((prev) => prev.filter((p) => p.id !== prizeId));
  }, []);

  // 更新奖项
  const updatePrize = useCallback((prizeId: string, updates: Partial<Prize>) => {
    setPrizes((prev) =>
      prev.map((p) => (p.id === prizeId ? { ...p, ...updates } : p))
    );
  }, []);

  // 重置抽奖记录
  const resetDrawnPrizes = useCallback(() => {
    setDrawnPrizes([]);
  }, []);

  // 验证概率总和
  const validateProbabilities = useCallback(() => {
    const total = prizes.reduce((sum, prize) => sum + prize.probability, 0);
    return Math.abs(total - 100) < 0.01; // 允许浮点误差
  }, [prizes]);

  return {
    prizes,
    drawnPrizes,
    draw,
    addPrize,
    removePrize,
    updatePrize,
    resetDrawnPrizes,
    validateProbabilities,
  };
}
