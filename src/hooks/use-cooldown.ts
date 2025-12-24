"use client";

import { useState, useEffect, useCallback, useRef } from 'react';

export const useCooldown = (storageKey: string, cooldownSeconds: number) => {
  const [remainingTime, setRemainingTime] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout>();

  const isCoolingDown = remainingTime > 0;

  const clearTimer = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = undefined;
    }
  };

  const startCooldown = useCallback(() => {
    localStorage.setItem(storageKey, Date.now().toString());
    setRemainingTime(cooldownSeconds);
  }, [storageKey, cooldownSeconds]);

  useEffect(() => {
    const lastClaimTime = localStorage.getItem(storageKey);
    if (lastClaimTime) {
      const timeSinceLastClaim = (Date.now() - parseInt(lastClaimTime, 10)) / 1000;
      const initialRemaining = cooldownSeconds - timeSinceLastClaim;
      if (initialRemaining > 0) {
        setRemainingTime(initialRemaining);
      }
    }
  }, [storageKey, cooldownSeconds]);

  useEffect(() => {
    if (isCoolingDown) {
      intervalRef.current = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev <= 1) {
            clearTimer();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearTimer();
  }, [isCoolingDown]);

  return { isCoolingDown, remainingTime, startCooldown };
};
