import { waitForAuthUser, sendEmailWithOtp } from "./authentication";
import { auth } from "../../services/firebase/firebase";

// Mock Firebase auth
jest.mock("../../services/firebase/firebase", () => ({
  auth: {
    onAuthStateChanged: jest.fn(() => {
      return () => {}; // Return a no-op function
    }),
  },
}));

// Mock fetch
global.fetch = jest.fn();

describe("waitForAuthUser", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should resolve with a user when authenticated", async () => {
    const mockUser = { uid: "123", email: "test@example.com" };

    // Mock the auth state change callback
    (auth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        callback(mockUser);
        return () => {}; // Return a no-op function
      }
    );

    const user = await waitForAuthUser();
    expect(user).toEqual(mockUser);
  });

  it("should reject with an error when not authenticated", async () => {
    // Mock the auth state change callback
    (auth.onAuthStateChanged as jest.Mock).mockImplementationOnce(
      (callback) => {
        callback(null);
        return () => {}; // Return a no-op function
      }
    );

    await expect(waitForAuthUser()).rejects.toThrow("User not authenticated");
  });
});

describe("sendEmailWithOtp", () => {
  const mockEmail = "test@example.com";
  const mockOtp = "123456";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should send an email with OTP successfully", async () => {
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ success: true }),
    });

    await sendEmailWithOtp(mockEmail, mockOtp);

    expect(fetch).toHaveBeenCalledWith("https://formspree.io/f/xkgrnygd", {
      method: "POST",
      body: expect.any(FormData),
      headers: {
        Accept: "application/json",
      },
    });

    const formData = (fetch as jest.Mock).mock.calls[0][1].body as FormData;
    expect(formData.get("email")).toBe(mockEmail);
    expect(formData.get("message")).toBe(
      `Your Fishing Buddy OTP is: ${mockOtp}`
    );
  });

  it("should log an error when the email sending fails", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: jest.fn().mockResolvedValueOnce({ error: "Failed to send" }),
    });

    await sendEmailWithOtp(mockEmail, mockOtp);

    expect(consoleErrorSpy).toHaveBeenCalledWith("Failed to send OTP", {
      error: "Failed to send",
    });
    consoleErrorSpy.mockRestore();
  });

  it("should log an error when fetch throws an exception", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (fetch as jest.Mock).mockRejectedValueOnce(new Error("Network error"));

    await sendEmailWithOtp(mockEmail, mockOtp);

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      "Error sending OTP",
      expect.any(Error)
    );
    consoleErrorSpy.mockRestore();
  });
});
