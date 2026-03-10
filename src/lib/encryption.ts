const ALGORITHM = "AES-GCM";

const SECRET_KEY_HEX = process.env.RESULT_SECRET_KEY!;

function hexToBytes(hex: string) {
  const bytes = new Uint8Array(hex.length / 2);
  for (let i = 0; i < bytes.length; i++) {
    bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
  }
  return bytes;
}

async function getKey() {
  const keyBytes = hexToBytes(SECRET_KEY_HEX);

  return crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: ALGORITHM },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encrypt(text: string) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const key = await getKey();

  const encoded = new TextEncoder().encode(text);

  const encrypted = await crypto.subtle.encrypt(
    { name: ALGORITHM, iv },
    key,
    encoded
  );

  const buffer = new Uint8Array(iv.length + encrypted.byteLength);
  buffer.set(iv, 0);
  buffer.set(new Uint8Array(encrypted), iv.length);

  return Buffer.from(buffer).toString("base64");
}

export async function decrypt(data: string) {
  const buffer = Buffer.from(data, "base64");

  const iv = buffer.subarray(0, 12);
  const encrypted = buffer.subarray(12);

  const key = await getKey();

  const decrypted = await crypto.subtle.decrypt(
    { name: ALGORITHM, iv },
    key,
    encrypted
  );

  return new TextDecoder().decode(decrypted);
}