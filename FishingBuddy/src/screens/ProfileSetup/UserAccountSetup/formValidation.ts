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
  } else {
    const hasUpperCase = /[A-Z]/.test(profile.password);
    const hasLowerCase = /[a-z]/.test(profile.password);
    const hasNumbers = /\d/.test(profile.password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(profile.password);
    if (!hasUpperCase) {
      errors.push("Password must contain at least one uppercase letter");
    }
    if (!hasLowerCase) {
      errors.push("Password must contain at least one lowercase letter");
    }
    if (!hasNumbers) {
      errors.push("Password must contain at least one number");
    }
    if (!hasSpecialChar) {
      errors.push(
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
      );
    }
  }

  return errors;
};
