import { DM_Sans, Fraunces } from 'next/font/google';

export const dmSans = DM_Sans({
  subsets: ['latin'],
});

export const fraunces = Fraunces({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-fraunces',
});
