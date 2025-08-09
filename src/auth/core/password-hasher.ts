import { randomBytes, scrypt } from 'crypto';

export async function hashPassword(
  password: string,
  salt: string
): Promise<string> {
  return new Promise((resolve, reject) => {
    scrypt(password.normalize(), salt, 64, (error, hash) => {
      if (error) reject(error);
      resolve(hash.toString('hex').normalize());
    });
  });
}

export function generateSalt() {
  return randomBytes(16).toString('hex').normalize();
}
