// cookieDecoder.ts
import pako from "pako";

export function decodeAndDecompressCookie(encgzipss: string): any {
  // Base64 decoding
  const urlSafeBase64DecodedString = atob(encgzipss);

  // Gzip decompression
  const gzipDecompressedArrayBuffer = pako.ungzip(
    new Uint8Array(
      urlSafeBase64DecodedString.split("").map((char) => char.charCodeAt(0)),
    ),
  );

  // Convert the ArrayBuffer to a String and then to a JSON object
  const jwtDecodedObject: any = JSON.parse(
    pako.ungzip(gzipDecompressedArrayBuffer, { to: "string" }),
  );

  return jwtDecodedObject;
}
