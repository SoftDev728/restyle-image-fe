import { Platform, StyleSheet } from "react-native";

export const RestyledImageScreenStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  imageContainer: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    marginBottom: 20,
    position: "relative",
  },
  contentCenter: {
    backgroundColor: "rgba(255,255,255,0.1)",
    borderRadius: 20,
    marginBottom: 20,
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  errorText: {
    color: "#FF2C2C",
    fontSize: 16,
  },
  transformedImage: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: 15,
  },
  styleBadge: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(110, 69, 226, 0.8)",
    color: "#fff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    fontSize: 14,
    fontWeight: "bold",
    textTransform: "capitalize",
  },
  controlButton: {
    alignItems: "center",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(255,255,255,0.1)",
    width: "30%",
  },
  controlButtonText: {
    color: "#fff",
    marginTop: 5,
    fontSize: 14,
  },
  compareButton: {
    backgroundColor: "rgba(110, 69, 226, 0.8)",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: Platform.OS === "ios" ? 30 : 10,
  },
  compareButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});
