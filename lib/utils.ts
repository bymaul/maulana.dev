import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const VIEW_IDS = ['home', 'posts', 'projects'] as const;

export type ViewId = (typeof VIEW_IDS)[number];

export function parseView(value: string | string[] | null | undefined): ViewId {
  return typeof value === 'string' && (VIEW_IDS as readonly string[]).includes(value)
    ? (value as ViewId)
    : 'home';
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
