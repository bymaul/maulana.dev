import { siteConfig } from '@/config/site';

interface OgCardProps {
  title: string;
  badge: string;
}

export default function OgCard({ title, badge }: OgCardProps) {
  const domain = new URL(siteConfig.url).host;
  const fontSize = title.length > 70 ? 52 : title.length > 40 ? 64 : 76;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 72,
        backgroundColor: '#f3f4f6',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex' }}>
        <div
          style={{
            display: 'flex',
            padding: '10px 28px',
            borderRadius: 9999,
            border: '2px solid #d1d5db',
            fontSize: 24,
            letterSpacing: 4,
            textTransform: 'uppercase',
            color: '#4b5563',
          }}
        >
          {badge}
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          fontSize,
          fontWeight: 700,
          lineHeight: 1.15,
          color: '#111827',
        }}
      >
        {title}
      </div>

      <div
        style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 30, color: '#6b7280' }}
      >
        <span>{siteConfig.author}</span>
        <span>{'\u2022'}</span>
        <span>{domain}</span>
      </div>
    </div>
  );
}
