import { StyleSheet } from "react-native";
import { colors } from "../../theme/colors";
// TODO: Colors can be moved to the theme folder
export const appInfoStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(13, 1, 1, 0.7)",
  },
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
  },
  headerTitle: {
    color: colors.text.primary,
    marginBottom: 4,
    marginTop: 35,
  },
  headerSubtitle: {
    color: colors.text.secondary,
  },
  cardContainer: {
    paddingLeft: 5,
    paddingRight: 5,
    paddingTop: -10,
  },
  card: {
    backgroundColor: colors.background.input,
    borderRadius: 16,
    padding: 14,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.1)",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(0, 180, 216, 0.1)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  cardTitle: {
    marginBottom: 2,
    color: colors.text.primary,
  },
  cardDesc: {
    color: colors.text.secondary,
    lineHeight: 18,
  },
  buttonContainer: {
    marginBottom: 16,
    paddingHorizontal: 16,
  },
});
