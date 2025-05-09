import { auth } from "../../services/firebase/firebase";
import { User as FirebaseUser } from "firebase/auth";

// This function returns a promise that resolves when the user is authenticated.
export const waitForAuthUser = (): Promise<FirebaseUser> => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(user);
      } else {
        reject(new Error("User not authenticated"));
      }
      if (typeof unsubscribe === "function") {
        unsubscribe();
      }
    });
  });
};

// This function sends an OTP to the user's email using Formspree.
export async function sendEmailWithOtp(email: string, otp: string) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("message", `Your Fishing Buddy OTP is: ${otp}`);

  try {
    const response = await fetch("https://formspree.io/f/xkgrnygd", {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json",
      },
    });
    const result = await response.json();
    if (response.ok) {
      console.log("OTP sent", result);
    } else {
      console.error("Failed to send OTP", result);
    }
  } catch (error) {
    console.error("Error sending OTP", error);
  }
}
