import {
  createNavigationContainerRef,
  CommonActions,
} from "@react-navigation/native";

export const navigationRef = createNavigationContainerRef();

// Reset to main screen
// After authentication, the user will be redirected to the main screen
export function resetToMain() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Main" }],
      })
    );
  }
}

// Reset to login screen
// When the user is not logged in, the user will be redirected to the login screen
export function resetToLogin() {
  if (navigationRef.isReady()) {
    navigationRef.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Entry" }],
      })
    );
  }
}
