import { StyleSheet, Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  heading: {
    fontSize: width * 0.1,
  },
  subheading_a: {
    width: "100%",
    marginHorizontal: width * 0.08,
    fontSize: width * 0.05,
  },
  headers: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.15,
    marginBottom: height * 0.01,
  },
  customBtn: {
    lineHeight: height * 0.06, // 10% of screen height
    textAlign: "center",
    width: width * 0.35, // 40% of screen width
    height: height * 0.06, // 10% of screen height
    fontSize: width * 0.04, // 3% of screen width
    fontWeight: "bold",
    borderRadius: width * 0.1, // 10% of screen width
    backgroundColor: "#acafb3",
    marginBottom: height * 0.05, // 5% of screen height
  },
  customBtn_solo: {
    alignSelf: "center",
    lineHeight: height * 0.06, // 10% of screen height
    textAlign: "center",
    width: width * 0.35, // 40% of screen width
    height: height * 0.06, // 10% of screen height
    fontSize: width * 0.04, // 3% of screen width
    fontWeight: "bold",
    borderRadius: width * 0.1, // 10% of screen width
    backgroundColor: "#acafb3",
    margin: height * 0.05, // 5% of screen height
  },
  err_msg: {
    color: "#FF0000",
    textAlign: "center",
    fontSize: width * 0.04, // 4% of screen width
    marginBottom: height * 0.03, // 3% of screen height
  },
  profile: {
    width: 80,
    height: 80,
    borderRadius: 150 / 2,
    borderWidth: 2,
    borderColor: "#000",
    marginBottom: 10,
  },
  bottom_menu: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0, // Set to 0 to place it at the bottom of the screen
    left: 0, // Adjust left position if needed
    right: 0, // Adjust right position if needed
    justifyContent: "center", // Adjust as per your layout requirement
    paddingVertical: 10, // Add vertical padding for better appearance
  },
  bottom_btn: {
    width: width * 0.29, // 32% of screen width, adjust as per your layout
    height: height * 0.06, // 8% of screen height, adjust as per your layout
    resizeMode: "contain",
    backgroundColor: "#bcbfc2",
  },
  form: {
    justifyContent: "space-evenly",
    alignItems: "center",
    width: width * 0.9, // 90% of screen width
  },
  input_fields: {
    width: width * 0.9,
    alignItems: "flex-start",
    justifyContent: "center",
    marginBottom: height * 0.03, // Adjusted margin bottom
  },
  textInputs: {
    borderStyle: "solid",
    borderBottomWidth: 1,
    borderBottomColor: "#000000",
    height: height * 0.07, // 7% of screen height
    width: width * 0.9, // 90% of screen width
    fontSize: width * 0.04, // 4% of screen width
  },
  password_field_icon: {
    width: 20, // 5% of screen width
    height: 20, // 5% of screen width
    position: "absolute",
    top: height * -0.04, // 5% of screen height
    right: width * -0.88, // 8% of screen width
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: width * 0.05,
    marginBottom: height * 0.05, // 5% of screen height
  },
  logout_icon: {
    position: "absolute",
    top: height * 0.12,
    left: width * 0.38,
    width: width * 0.09,
    height: height * 0.04,
    resizeMode: "contain",
  },
  social_icon_container: {
    flexDirection: "row",
    height: height * 0.12,
    width: width * 0.8,
    justifyContent: "space-evenly",
    alignItems: "center",
    marginBottom: height * 0.15,
  },
  social_icon: {
    width: width * 0.12,
    height: height * 0.063,
  },
});
