export const VIEW_IDS = ['home', 'articles', 'projects'] as const;

export type ViewId = (typeof VIEW_IDS)[number];

export function parseView(value: string | string[] | null | undefined): ViewId {
  return typeof value === 'string' && (VIEW_IDS as readonly string[]).includes(value)
    ? (value as ViewId)
    : 'home';
}
