'use client';

import { breakpoints, cols, rowHeights, type Breakpoint } from '@/config/consts';
import { cn } from '@/lib/utils';
import { Responsive, useContainerWidth, type ResponsiveGridLayoutProps } from 'react-grid-layout';
import { absoluteStrategy } from 'react-grid-layout/core';

type GridLayoutProps = Readonly<
  Pick<ResponsiveGridLayoutProps, 'layouts' | 'children'> & {
    className?: string;
  }
>;

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
        'mx-auto max-w-300 max-lg:max-w-200 max-md:max-w-93.75 max-sm:max-w-80',
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
