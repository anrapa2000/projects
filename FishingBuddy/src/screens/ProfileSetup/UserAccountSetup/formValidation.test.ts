import { validateForm } from "./formValidation";
import { BasicProfile } from "./types";

describe("validateForm", () => {
  it("returns no errors for valid profile", () => {
    const validProfile: BasicProfile = {
      name: "John Doe",
      email: "john@example.com",
      password: "Test123!@#",
    };

    const errors = validateForm(validProfile);
    expect(errors).toHaveLength(0);
  });

  it("validates required name field", () => {
    const profileWithoutName: BasicProfile = {
      name: "",
      email: "john@example.com",
      password: "Test123!@#",
    };

    const errors = validateForm(profileWithoutName);
    expect(errors).toContain("Name is required");
  });

  it("validates required email field", () => {
    const profileWithoutEmail: BasicProfile = {
      name: "John Doe",
      email: "",
      password: "Test123!@#",
    };

    const errors = validateForm(profileWithoutEmail);
    expect(errors).toContain("Email is required");
  });

  it("validates email format", () => {
    const profileWithInvalidEmail: BasicProfile = {
      name: "John Doe",
      email: "invalid-email",
      password: "Test123!@#",
    };

    const errors = validateForm(profileWithInvalidEmail);
    expect(errors).toContain("Invalid email format");
  });

  it("validates required password field", () => {
    const profileWithoutPassword: BasicProfile = {
      name: "John Doe",
      email: "john@example.com",
      password: "",
    };

    const errors = validateForm(profileWithoutPassword);
    expect(errors).toContain("Password is required");
  });

  it("validates password contains uppercase letter", () => {
    const profileWithInvalidPassword: BasicProfile = {
      name: "John Doe",
      email: "john@example.com",
      password: "test123!@#",
    };

    const errors = validateForm(profileWithInvalidPassword);
    expect(errors).toContain("Password must contain at least one uppercase letter");
  });

  it("validates password contains lowercase letter", () => {
    const profileWithInvalidPassword: BasicProfile = {
      name: "John Doe",
      email: "john@example.com",
      password: "TEST123!@#",
    };

    const errors = validateForm(profileWithInvalidPassword);
    expect(errors).toContain("Password must contain at least one lowercase letter");
  });

  it("validates password contains number", () => {
    const profileWithInvalidPassword: BasicProfile = {
      name: "John Doe",
      email: "john@example.com",
      password: "Test!@#",
    };

    const errors = validateForm(profileWithInvalidPassword);
    expect(errors).toContain("Password must contain at least one number");
  });

  it("validates password contains special character", () => {
    const profileWithInvalidPassword: BasicProfile = {
      name: "John Doe",
      email: "john@example.com",
      password: "Test123",
    };

    const errors = validateForm(profileWithInvalidPassword);
    expect(errors).toContain('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)');
  });

  it("returns multiple errors for invalid profile", () => {
    const invalidProfile: BasicProfile = {
      name: "",
      email: "invalid-email",
      password: "test",
    };

    const errors = validateForm(invalidProfile);
    expect(errors).toContain("Name is required");
    expect(errors).toContain("Invalid email format");
    expect(errors).toContain("Password must contain at least one uppercase letter");
    expect(errors).toContain("Password must contain at least one number");
    expect(errors).toContain('Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)');
  });

  it("handles whitespace in name and email", () => {
    const profileWithWhitespace: BasicProfile = {
      name: "   ",
      email: "   john@example.com   ",
      password: "Test123!@#",
    };

    const errors = validateForm(profileWithWhitespace);
    expect(errors).toContain("Name is required");
  });

  it("validates email with multiple @ symbols", () => {
    const profileWithInvalidEmail: BasicProfile = {
      name: "John Doe",
      email: "john@@example.com",
      password: "Test123!@#",
    };

    const errors = validateForm(profileWithInvalidEmail);
    expect(errors).toContain("Invalid email format");
  });

  it("validates email with invalid domain", () => {
    const profileWithInvalidEmail: BasicProfile = {
      name: "John Doe",
      email: "john@example",
      password: "Test123!@#",
    };

    const errors = validateForm(profileWithInvalidEmail);
    expect(errors).toContain("Invalid email format");
  });
}); 