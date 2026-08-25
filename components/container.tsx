import { cn } from '@/lib/utils';

export const CONTAINER_WIDTH_CLASSES =
  'mx-auto max-w-300 max-lg:max-w-200 max-md:max-w-93.75 max-sm:max-w-80';

interface ContainerProps<T extends React.ElementType> {
  as?: T;
}

export default function Container<T extends React.ElementType = 'div'>({
  as,
  ...props
}: ContainerProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof ContainerProps<T>>) {
  const Component = as ?? 'div';
  return (
    <Component
      {...props}
      className={cn('mx-auto px-4 py-6', CONTAINER_WIDTH_CLASSES, props.className)}
    />
  );
}
