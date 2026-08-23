export type Breakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

export const breakpoints: Record<Breakpoint, number> = {
  lg: 1199,
  md: 799,
  sm: 374,
  xs: 319,
  xxs: 0,
};

export const rowHeights: { [key: string]: number } = {
  lg: 280,
  md: 180,
  sm: 164,
  xs: 136,
  xxs: 132,
};

export const cols = { lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 };

export const CONTAINER_WIDTH_CLASSES =
  'mx-auto max-w-300 max-lg:max-w-200 max-md:max-w-93.75 max-sm:max-w-80';
