import { Buffer } from "buffer";

export const arrayBufferToBase64 = (imageBuffer: any) => {
  return Buffer.from(imageBuffer, "base64").toString();
};
