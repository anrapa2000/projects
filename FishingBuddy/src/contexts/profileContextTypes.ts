import { User } from "firebase/auth";
import { loadProfile } from "../services/profileStorage/profileStorage";

export type Profile = Awaited<ReturnType<typeof loadProfile>>;

export type ProfileContextType = {
  profile: Profile | null;
  loading: boolean;
  refreshProfile: () => Promise<void>;
  user: User | null;
  clearProfile: () => void;
};