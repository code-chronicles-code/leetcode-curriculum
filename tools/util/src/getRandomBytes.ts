import crypto from "node:crypto";

export function getRandomBytes(count: number): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(count, (err, buf) => {
      if (err) {
        reject(err);
      } else {
        resolve(buf);
      }
    });
  });
}
