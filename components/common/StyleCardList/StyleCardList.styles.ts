import { StyleSheet } from "react-native";

export const StyleCardListStyles = StyleSheet.create({
  styleOptions: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  styleOption: {
    width: "48%",
    aspectRatio: 1,
    borderRadius: 15,
    marginBottom: 15,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "transparent",
  },
  styleOptionLabel: {
    color: "#fff",
    fontWeight: "500",
    fontSize: 16,
  },
  styleOptionSelected: {
    borderColor: "#fff",
  },
  styleOptionContent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
  },
  styleOptionIcon: {
    marginBottom: 10,
  },
});
