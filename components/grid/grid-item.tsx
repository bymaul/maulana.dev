export default function GridItem({
  id,
  className,
  children,
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className={className}>
      {children}
    </div>
  );
}
