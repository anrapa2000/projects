import { encryptData, decryptData } from "./encryption";

describe("Encryption Utility", () => {
  const testData = { name: "FishingBuddy", version: "1.0.0" };

  it("should encrypt data correctly", () => {
    const encryptedData = encryptData(testData);
    expect(typeof encryptedData).toBe("string");
    expect(encryptedData).not.toEqual(JSON.stringify(testData));
  });

  it("should decrypt data correctly", () => {
    const encryptedData = encryptData(testData);
    const decryptedData = decryptData(encryptedData);
    expect(decryptedData).toEqual(testData);
  });

  it("should throw an error when decrypting invalid data", () => {
    const invalidCipherText = "invalid-encrypted-data";
    expect(() => decryptData(invalidCipherText)).toThrow();
  });
});
