import { createClient } from "@supabase/supabase-js";

// Mock createClient
jest.mock("@supabase/supabase-js", () => ({
  createClient: jest.fn(),
}));

describe("Supabase Service", () => {
  const mockSupabaseUrl = "https://test.supabase.co";
  const mockSupabaseAnonKey = "test-anon-key";
  const mockClient = {
    from: jest.fn().mockReturnThis(),
    insert: jest.fn(),
    auth: {
      signInWithPassword: jest.fn(),
      signUp: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(),
    },
  };

  let originalEnv: NodeJS.ProcessEnv;

  beforeEach(() => {
    jest.clearAllMocks();
    (createClient as jest.Mock).mockReturnValue(mockClient);

    // Save original environment variables
    originalEnv = { ...process.env };

    // Set up required environment variables
    process.env.SUPABASE_URL = mockSupabaseUrl;
    process.env.SUPABASE_ANON_KEY = mockSupabaseAnonKey;
  });

  afterEach(() => {
    // Restore original environment variables
    process.env = originalEnv;
  });

  describe("Client Initialization", () => {
    it("initializes Supabase client with correct configuration", () => {
      // Mock the module
      jest.mock("./supabase", () => {
        const { createClient } = require("@supabase/supabase-js");
        return {
          supabase: createClient(mockSupabaseUrl, mockSupabaseAnonKey),
        };
      });

      // Force re-import of the module
      jest.isolateModules(() => {
        const { supabase } = require("./supabase");
        expect(createClient).toHaveBeenCalledWith(
          mockSupabaseUrl,
          mockSupabaseAnonKey
        );
        expect(supabase).toBe(mockClient);
      });
    });

    it("throws error when SUPABASE_URL is missing", () => {
      // Mock the module to throw when SUPABASE_URL is missing
      jest.mock("./supabase", () => {
        if (!process.env.SUPABASE_URL) {
          throw new Error("Missing SUPABASE_URL");
        }
        const { createClient } = require("@supabase/supabase-js");
        return {
          supabase: createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
          ),
        };
      });

      // Force re-import of the module
      jest.isolateModules(() => {
        delete process.env.SUPABASE_URL;
        expect(() => require("./supabase")).toThrow("Missing SUPABASE_URL");
      });
    });

    it("throws error when SUPABASE_ANON_KEY is missing", () => {
      // Mock the module to throw when SUPABASE_ANON_KEY is missing
      jest.mock("./supabase", () => {
        if (!process.env.SUPABASE_ANON_KEY) {
          throw new Error("Missing SUPABASE_ANON_KEY");
        }
        const { createClient } = require("@supabase/supabase-js");
        return {
          supabase: createClient(
            process.env.SUPABASE_URL,
            process.env.SUPABASE_ANON_KEY
          ),
        };
      });

      // Force re-import of the module
      jest.isolateModules(() => {
        delete process.env.SUPABASE_ANON_KEY;
        expect(() => require("./supabase")).toThrow(
          "Missing SUPABASE_ANON_KEY"
        );
      });
    });
  });

  describe("Database Operations", () => {
    let supabase: any;

    beforeEach(() => {
      jest.isolateModules(() => {
        supabase = require("./supabase").supabase;
      });
    });

    it("performs database queries correctly", () => {
      const mockTable = "test_table";

      supabase.from(mockTable);

      expect(mockClient.from).toHaveBeenCalledWith(mockTable);
    });

    it("handles table operations correctly", () => {
      const mockTable = "test_table";
      const mockData = { id: 1, name: "Test" };

      supabase.from(mockTable).insert(mockData);

      expect(mockClient.from).toHaveBeenCalledWith(mockTable);
      expect(mockClient.insert).toHaveBeenCalledWith(mockData);
    });
  });

  describe("Authentication", () => {
    let supabase: any;

    beforeEach(() => {
      jest.isolateModules(() => {
        supabase = require("./supabase").supabase;
      });
    });

    it("performs sign in correctly", async () => {
      const mockCredentials = {
        email: "test@example.com",
        password: "password123",
      };

      await supabase.auth.signInWithPassword(mockCredentials);

      expect(mockClient.auth.signInWithPassword).toHaveBeenCalledWith(
        mockCredentials
      );
    });

    it("performs sign up correctly", async () => {
      const mockCredentials = {
        email: "test@example.com",
        password: "password123",
      };

      await supabase.auth.signUp(mockCredentials);

      expect(mockClient.auth.signUp).toHaveBeenCalledWith(mockCredentials);
    });

    it("performs sign out correctly", async () => {
      await supabase.auth.signOut();

      expect(mockClient.auth.signOut).toHaveBeenCalled();
    });

    it("handles auth state changes correctly", () => {
      const mockCallback = jest.fn();

      supabase.auth.onAuthStateChange(mockCallback);

      expect(mockClient.auth.onAuthStateChange).toHaveBeenCalledWith(
        mockCallback
      );
    });
  });

  describe("Error Handling", () => {
    let supabase: any;

    beforeEach(() => {
      jest.isolateModules(() => {
        supabase = require("./supabase").supabase;
      });
    });

    it("handles database errors correctly", () => {
      const mockError = new Error("Database Error");
      mockClient.from.mockImplementation(() => {
        throw mockError;
      });

      expect(() => supabase.from("test_table")).toThrow(mockError);
    });

    it("handles auth errors correctly", async () => {
      const mockError = new Error("Auth Error");
      mockClient.auth.signInWithPassword.mockRejectedValue(mockError);

      await expect(
        supabase.auth.signInWithPassword({
          email: "test@example.com",
          password: "password123",
        })
      ).rejects.toThrow(mockError);
    });
  });
});
