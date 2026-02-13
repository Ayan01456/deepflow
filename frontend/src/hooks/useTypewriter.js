import { useState, useEffect } from 'react';

/**
 * Custom hook for typewriter effect
 * @param {string} text - Text to type out
 * @param {number} speed - Speed in milliseconds per character (default 25ms)
 * @param {boolean} enabled - Whether to enable the effect (default true)
 * @returns {string} - Currently displayed text
 */
export function useTypewriter(text, speed = 25, enabled = true) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // If effect is disabled, show full text immediately
    if (!enabled) {
      setDisplayedText(text);
      return;
    }

    // Reset when text changes
    setDisplayedText('');
    setCurrentIndex(0);
  }, [text, enabled]);

  useEffect(() => {
    if (!enabled) return;

    if (currentIndex < text.length) {
      // Add slight random variation to speed (20-30ms) for natural feel
      const randomSpeed = speed + Math.random() * 10 - 5;
      
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, randomSpeed);

      return () => clearTimeout(timeout);
    }
  }, [currentIndex, text, speed, enabled]);

  return displayedText;
}
