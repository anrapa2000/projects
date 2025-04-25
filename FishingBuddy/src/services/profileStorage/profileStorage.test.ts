import { deleteProfile, saveProfile, loadProfile } from "./profileStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { supabase } from "../supabase/supabase";
import { waitForAuthUser } from "../../utils/authentication/authentication";
import { encryptData, decryptData } from "../../utils/encryption/encryption";

// Mock dependencies
jest.mock("@react-native-async-storage/async-storage");
jest.mock("../supabase/supabase");
jest.mock("../../utils/authentication/authentication");
jest.mock("../../utils/encryption/encryption");

describe("Profile Storage Service", () => {
  const mockUser = {
    uid: "test-uid",
    email: "test@example.com",
  };

  const mockProfile = {
    email: "test@example.com",
    name: "Test User",
    preferences: {
      theme: "dark",
      notifications: true,
    },
  };

  const mockEncryptedData = "encrypted-data";
  const mockDecryptedData = mockProfile;

  beforeEach(() => {
    jest.clearAllMocks();
    (waitForAuthUser as jest.Mock).mockResolvedValue(mockUser);
    (encryptData as jest.Mock).mockReturnValue(mockEncryptedData);
    (decryptData as jest.Mock).mockReturnValue(mockDecryptedData);
    
    // Setup default Supabase mock
    (supabase.from as jest.Mock).mockReturnValue({
      upsert: jest.fn().mockReturnValue({
        select: jest.fn().mockResolvedValue({ data: [mockProfile], error: null }),
      }),
      select: jest.fn().mockReturnValue({
        eq: jest.fn().mockReturnValue({
          maybeSingle: jest.fn().mockResolvedValue({
            data: { encrypted_data: mockEncryptedData },
            error: null,
          }),
        }),
      }),
    });
  });

  describe("deleteProfile", () => {
    it("removes profile from AsyncStorage", async () => {
      await deleteProfile();
      expect(AsyncStorage.removeItem).toHaveBeenCalledWith("user_profile");
    });

    it("handles errors gracefully", async () => {
      (AsyncStorage.removeItem as jest.Mock).mockRejectedValue(new Error("Storage Error"));
      await expect(deleteProfile()).rejects.toThrow("Storage Error");
    });
  });

  describe("saveProfile", () => {
    it("saves profile successfully", async () => {
      await saveProfile(mockProfile);

      expect(waitForAuthUser).toHaveBeenCalled();
      expect(encryptData).toHaveBeenCalledWith(mockProfile);
      expect(supabase.from).toHaveBeenCalledWith("profiles");
      expect(supabase.from("profiles").upsert).toHaveBeenCalledWith([
        {
          id: mockUser.uid,
          email: mockProfile.email,
          encrypted_data: mockEncryptedData,
        },
      ]);
    });

    it("throws error when user is not authenticated", async () => {
      (waitForAuthUser as jest.Mock).mockResolvedValue(null);
      await expect(saveProfile(mockProfile)).rejects.toThrow("User not authenticated");
    });

    it("throws error when Supabase upsert fails", async () => {
      const mockError = new Error("Supabase Error");
      (supabase.from as jest.Mock).mockReturnValue({
        upsert: jest.fn().mockReturnValue({
          select: jest.fn().mockResolvedValue({ data: null, error: mockError }),
        }),
      });

      await expect(saveProfile(mockProfile)).rejects.toThrow(mockError);
    });
  });

  describe("loadProfile", () => {
    it("loads profile successfully", async () => {
      const result = await loadProfile();

      expect(waitForAuthUser).toHaveBeenCalled();
      expect(supabase.from).toHaveBeenCalledWith("profiles");
      expect(supabase.from("profiles").select).toHaveBeenCalledWith("*");
      expect(supabase.from("profiles").select().eq).toHaveBeenCalledWith("id", mockUser.uid);
      expect(decryptData).toHaveBeenCalledWith(mockEncryptedData);
      expect(result).toEqual(mockDecryptedData);
    });

    it("throws error when Supabase query fails", async () => {
      const mockError = new Error("Supabase Error");
      (supabase.from as jest.Mock).mockReturnValue({
        select: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            maybeSingle: jest.fn().mockResolvedValue({
              data: null,
              error: mockError,
            }),
          }),
        }),
      });

      await expect(loadProfile()).rejects.toThrow(mockError);
    });

    it("throws error when decryption fails", async () => {
      const mockError = new Error("Decryption Error");
      (decryptData as jest.Mock).mockImplementation(() => {
        throw mockError;
      });

      await expect(loadProfile()).rejects.toThrow(mockError);
    });
  });
});
