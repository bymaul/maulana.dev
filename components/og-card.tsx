import Mark from './mark';

interface OgCardProps {
  title: string;
  description: string;
}

export default function OgCard({ title, description }: OgCardProps) {
  const fontSize = title.length > 70 ? 48 : title.length > 40 ? 58 : 68;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        backgroundColor: '#0d0d0d',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex' }}>
        <Mark size={72} tone="light" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
        <div
          style={{
            display: 'flex',
            fontSize,
            fontWeight: 700,
            lineHeight: 1.15,
            color: '#ffffff',
          }}
        >
          {title}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 26,
            lineHeight: 1.4,
            color: '#9ca3af',
          }}
        >
          {description}
        </div>
      </div>
    </div>
  );
}
