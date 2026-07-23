import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const size = { width: 192, height: 192 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 84,
          background: 'linear-gradient(135deg, #11111b 0%, #1e1e2e 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
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
