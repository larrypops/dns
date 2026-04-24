import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'DNS Service - Stop aux nuisibles';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '56px',
          background:
            'linear-gradient(135deg, #0f4f2d 0%, #1f7f45 45%, #1565C0 100%)',
          color: 'white',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 18,
              background: 'rgba(255,255,255,0.15)',
              border: '2px solid rgba(255,255,255,0.35)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 34,
            }}
          >
            DNS
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 44, fontWeight: 800, lineHeight: 1.05 }}>DNS Service</span>
            <span style={{ fontSize: 22, opacity: 0.9, marginTop: 6 }}>Stop aux nuisibles</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 980 }}>
          <div style={{ fontSize: 52, fontWeight: 800, lineHeight: 1.08 }}>
            Assainissement, Agricole et Pisciculture
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.3, opacity: 0.95 }}>
            Yaoundé et ses environs • Référence nationale • Solutions durables pour bâtiments et exploitations
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
