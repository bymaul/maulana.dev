'use client';

import { useEffect, useState } from 'react';

function useMounted(delay: number = 0) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, delay);
  }, [delay]);

  return isMounted;
}

export { useMounted };
