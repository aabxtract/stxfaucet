"use client";

import { useState, useEffect, useRef, useCallback } from 'react';

type TypewriterOptions = {
  typingSpeed?: number;
  deleteSpeed?: number;
  delay?: number;
  loop?: boolean;
};

const defaultOptions: Required<TypewriterOptions> = {
  typingSpeed: 100,
  deleteSpeed: 50,
  delay: 1000,
  loop: true,
};

export const useTypewriter = (
  words: string[],
  options: TypewriterOptions = {}
) => {
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  const { typingSpeed, deleteSpeed, delay, loop } = {
    ...defaultOptions,
    ...options,
  };

  const handleTyping = useCallback(() => {
    const currentWord = words[wordIndex];
    const speed = isDeleting ? deleteSpeed : typingSpeed;

    if (isDeleting) {
      setDisplayedText((prev) => prev.slice(0, -1));
    } else {
      setDisplayedText((prev) => currentWord.substring(0, prev.length + 1));
    }

    if (!isDeleting && displayedText === currentWord) {
      if (wordIndex === words.length - 1 && !loop) {
        setIsRunning(false);
        return;
      }
      timeoutRef.current = setTimeout(() => {
        if (options.deleteSpeed !== 0) {
            setIsDeleting(true);
        } else {
            setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, delay);
    } else if (isDeleting && displayedText === '') {
      setIsDeleting(false);
      setWordIndex((prev) => (prev + 1) % words.length);
    }
  }, [
    wordIndex,
    isDeleting,
    displayedText,
    words,
    typingSpeed,
    deleteSpeed,
    delay,
    loop,
    options.deleteSpeed
  ]);

  useEffect(() => {
    if (isRunning) {
      timeoutRef.current = setTimeout(handleTyping, isDeleting ? deleteSpeed : typingSpeed);
      return () => clearTimeout(timeoutRef.current);
    }
  }, [displayedText, handleTyping, isDeleting, typingSpeed, deleteSpeed, isRunning]);

  const start = () => {
    if (!isRunning) {
      setIsRunning(true);
      setDisplayedText('');
      setWordIndex(0);
      setIsDeleting(false);
    }
  };

  const stop = () => {
    clearTimeout(timeoutRef.current);
    setIsRunning(false);
  };

  return { displayedText, start, stop, isRunning };
};
