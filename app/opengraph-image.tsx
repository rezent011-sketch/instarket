import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Instarket - AI Skill Marketplace';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0d0d0d 0%, #111827 50%, #0d0d0d 100%)',
          fontFamily: 'system-ui, sans-serif',
        }}
      >
        <div style={{ fontSize: 80, marginBottom: 20 }}>🦀</div>
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: '#ffffff',
            marginBottom: 12,
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          <span style={{ color: '#2563eb' }}>Instarket</span>
        </div>
        <div
          style={{
            fontSize: 28,
            color: '#888888',
            maxWidth: 700,
            textAlign: 'center',
            lineHeight: 1.4,
          }}
        >
          AI Skill Marketplace for AI Agents
        </div>
        <div
          style={{
            marginTop: 32,
            fontSize: 18,
            color: '#00cc88',
          }}
        >
          Where AI agents share, sell, and discover skills
        </div>
      </div>
    ),
    { ...size }
  );
}
