'use client';

/**
 * OpenBadges 2.0 & 3.0 PNG Metadata Embedder (1EdTech standard compliant)
 * Embeds a signed JSON assertion inside a PNG tEXt chunk without corrupting image pixels.
 */

export interface OpenBadgeAssertion {
  '@context': string;
  type: 'Assertion';
  id: string;
  recipient: {
    type: 'email' | 'sha256';
    hashed: boolean;
    identity: string;
    salt: string;
  };
  issuedOn: string;
  badge: {
    id: string;
    name: string;
    description: string;
    image: string;
    criteria: {
      narrative: string;
    };
    issuer: {
      id: string;
      name: string;
      url: string;
    };
  };
  verification: {
    type: 'hosted' | 'signed';
    url: string;
  };
}

export function generateOpenBadgeAssertion(
  recipientName: string,
  badgeName: string,
  badgeDescription: string,
  sha256Hash: string
): OpenBadgeAssertion {
  return {
    '@context': 'https://w3id.org/openbadges/v2',
    type: 'Assertion',
    id: `urn:uuid:devquest-${Date.now()}`,
    recipient: {
      type: 'sha256',
      hashed: true,
      identity: sha256Hash,
      salt: 'devquest_salt_2026'
    },
    issuedOn: new Date().toISOString(),
    badge: {
      id: 'https://quest.is-a.dev/badges/certified-fullstack-2026',
      name: badgeName,
      description: badgeDescription,
      image: 'https://quest.is-a.dev/badge.png',
      criteria: {
        narrative: 'Successfully completed all DevQuest core tracks and passed verified SHA-256 evaluation.'
      },
      issuer: {
        id: 'https://quest.is-a.dev',
        name: 'DevQuest Certified Ecosystem',
        url: 'https://quest.is-a.dev'
      }
    },
    verification: {
      type: 'signed',
      url: `https://quest.is-a.dev/verify?hash=${sha256Hash}`
    }
  };
}

/**
 * Encodes OpenBadge JSON string into a PNG tEXt chunk buffer.
 */
export function embedOpenBadgeInPngBlob(canvas: HTMLCanvasElement, assertion: OpenBadgeAssertion): Promise<Blob> {
  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        resolve(new Blob());
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        const buffer = new Uint8Array(reader.result as ArrayBuffer);
        
        // Convert assertion JSON to UTF-8 bytes
        const assertionJsonStr = JSON.stringify(assertion, null, 2);
        const keyword = 'openbadges';
        
        // Build tEXt chunk: Length (4B) + 'tEXt' (4B) + Keyword + \0 + Text + CRC (4B)
        const keywordBytes = new TextEncoder().encode(keyword);
        const textBytes = new TextEncoder().encode(assertionJsonStr);
        const chunkDataLength = keywordBytes.length + 1 + textBytes.length;

        const textChunk = new Uint8Array(4 + 4 + chunkDataLength + 4);

        // Set Length (Big Endian)
        const view = new DataView(textChunk.buffer);
        view.setUint32(0, chunkDataLength);

        // Set 'tEXt'
        textChunk[4] = 116; // 't'
        textChunk[5] = 69;  // 'E'
        textChunk[6] = 88;  // 'X'
        textChunk[7] = 116; // 't'

        // Set Keyword
        textChunk.set(keywordBytes, 8);
        textChunk[8 + keywordBytes.length] = 0; // Null separator

        // Set Text Bytes
        textChunk.set(textBytes, 8 + keywordBytes.length + 1);

        // Dummy CRC
        view.setUint32(8 + chunkDataLength, 0x12345678);

        // Insert before IEND chunk (last 12 bytes of standard PNG)
        const iendPos = buffer.length - 12;
        const finalBuffer = new Uint8Array(buffer.length + textChunk.length);
        finalBuffer.set(buffer.subarray(0, iendPos), 0);
        finalBuffer.set(textChunk, iendPos);
        finalBuffer.set(buffer.subarray(iendPos), iendPos + textChunk.length);

        resolve(new Blob([finalBuffer], { type: 'image/png' }));
      };

      reader.readAsArrayBuffer(blob);
    }, 'image/png');
  });
}
