'use client';

import { useEffect, useState } from 'react';

function useMounted(delay: number = 0) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsMounted(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return isMounted;
}

export { useMounted };
