import CryptoJS from "crypto-js";

// TODO: Replace with a secure env var or string
const SECRET_KEY = "your-very-secret-key-123";

// Encrypts the given data using AES encryption with the provided secret key.
export const encryptData = (data: any): string => {
  const stringified = JSON.stringify(data);
  return CryptoJS.AES.encrypt(stringified, SECRET_KEY).toString();
};

// Decrypts the given cipher text using AES decryption with the provided secret key.
export const decryptData = (cipherText: string): any => {
  const bytes = CryptoJS.AES.decrypt(cipherText, SECRET_KEY);
  const decryptedString = bytes.toString(CryptoJS.enc.Utf8);
  return JSON.parse(decryptedString);
};
