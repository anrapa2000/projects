import { colors } from "../../../theme/colors";
import { StyleSheet } from "react-native";

export const endTimeStyles = StyleSheet.create({
  timeBox: {
    backgroundColor: colors.background.input,
    padding: 24,
    borderRadius: 16,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.1)",
    alignItems: "center",
  },
  timeText: {
    fontSize: 20,
    fontWeight: "500",
    color: colors.text.primary,
  },
  buttonContainer: {
    gap: 16,
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  pickerContainer: {
    backgroundColor: colors.map.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
  },
  picker: {
    height: 200,
  },
  closeButton: {
    marginTop: 10,
    padding: 15,
    backgroundColor: colors.primary,
    borderRadius: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: colors.text.primary,
    fontSize: 16,
    fontWeight: "600",
  },
  buttonContainerModal: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
