import { BasicProfile } from "./types";

export const validateForm = (profile: BasicProfile): string[] => {
  const errors: string[] = [];

  if (!profile.name.trim()) {
    errors.push("Name is required");
  }

  if (!profile.email.trim()) {
    errors.push("Email is required");
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profile.email)) {
    errors.push("Invalid email format");
  }

  if (!profile.password) {
    errors.push("Password is required");
  } else if (profile.password.length < 6) {
    errors.push("Password must be at least 6 characters");
  }

  return errors;
};