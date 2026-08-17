import { Fraunces, Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const fraunces = Fraunces({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-fraunces',
});
