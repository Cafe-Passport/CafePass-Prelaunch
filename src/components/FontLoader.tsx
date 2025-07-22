'use client';

import { useEffect } from 'react';

export default function FontLoader() {
  useEffect(() => {
    // Add the font link
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    // Add a class to the document element when the font is loaded
    const style = document.createElement('style');
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Special+Gothic+Expanded+One&display=swap');
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(link);
      document.head.removeChild(style);
    };
  }, []);

  return null;
}
