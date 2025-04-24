import "react-native-reanimated";
import "react-native-get-random-values";
import AppNavigator from "./src/navigation/AppNavigation";
import { ProfileProvider } from "./src/contexts/ProfileContext";

export default function App() {
  return (
    <ProfileProvider>
      <AppNavigator />
    </ProfileProvider>
  );
}
