import { CONTAINER_WIDTH_CLASSES } from '@/config/consts';
import { cn } from '@/lib/utils';

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
