'use client';

import { CONTAINER_WIDTH_CLASSES } from '@/components/container';
import { cn } from '@/lib/utils';
import { Responsive, useContainerWidth, type ResponsiveGridLayoutProps } from 'react-grid-layout';
import { absoluteStrategy } from 'react-grid-layout/core';

type GridLayoutProps = Readonly<
  Pick<ResponsiveGridLayoutProps, 'layouts' | 'children'> & {
    className?: string;
  }
>;

type Breakpoint = 'lg' | 'md' | 'sm' | 'xs' | 'xxs';

const breakpoints: Record<Breakpoint, number> = {
  lg: 1199,
  md: 799,
  sm: 374,
  xs: 319,
  xxs: 0,
};

const rowHeights: Record<Breakpoint, number> = {
  lg: 280,
  md: 180,
  sm: 164,
  xs: 136,
  xxs: 132,
};

const cols = { lg: 4, md: 4, sm: 2, xs: 2, xxs: 2 };

const breakpointKeys: Breakpoint[] = ['lg', 'md', 'sm', 'xs', 'xxs'];

const getBreakpoint = (width: number): Breakpoint => {
  return breakpointKeys.find((key) => width > breakpoints[key]) ?? 'xxs';
};

export default function GridLayout({ layouts, className, children }: GridLayoutProps) {
  const { width, containerRef, mounted } = useContainerWidth({
    measureBeforeMount: true,
  });

  const breakpoint = getBreakpoint(width);

  return (
    <section
      ref={containerRef}
      className={cn(
        CONTAINER_WIDTH_CLASSES,
        mounted ? 'opacity-100' : 'opacity-0',
        'transition-opacity duration-700',
        className,
      )}
    >
      {mounted && (
        <Responsive
          width={width}
          layouts={layouts}
          breakpoints={breakpoints}
          cols={cols}
          rowHeight={rowHeights[breakpoint]}
          margin={[16, 16]}
          dragConfig={{
            enabled: breakpoint === 'lg' || breakpoint === 'md',
            bounded: true,
            cancel: '.cancel-drag',
          }}
          resizeConfig={{ enabled: false }}
          positionStrategy={absoluteStrategy}
        >
          {children}
        </Responsive>
      )}
    </section>
  );
}
