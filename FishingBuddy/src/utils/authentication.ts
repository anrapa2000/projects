import { auth } from "../services/firebase";
import { User as FirebaseUser } from "firebase/auth";

export const waitForAuthUser = (): Promise<FirebaseUser> => {
    return new Promise((resolve, reject) => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        unsubscribe();
        if (user) resolve(user);
        else reject(new Error("User not authenticated"));
      });
    });
  };