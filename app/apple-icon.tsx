import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 80,
          background: 'linear-gradient(135deg, #1e1e2e 0%, #11111b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 36,
          border: '4px solid #cba6f7',
          color: '#cba6f7',
          fontFamily: 'sans-serif',
          fontWeight: 'bold',
        }}
      >
        {'>_'}
      </div>
    ),
    { ...size }
  );
}
