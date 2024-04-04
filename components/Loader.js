import React, { useState } from "react";
import { ActivityIndicator, Modal, StyleSheet, View } from "react-native";

let handleLoader;

const Loader = () => {
  const [isLoading, setIsLoading] = useState(false);

  // Function to show the loader
  handleLoader = () => {
    setIsLoading(!isLoading);
  };

  return (
    <Modal
      transparent={true}
      animationType="none"
      visible={isLoading}
      onRequestClose={() => {}} // Function to handle back button
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator animating={isLoading} color="#000" size="large" />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
  },
  activityIndicatorWrapper: {
    backgroundColor: "#FFFFFF", // White background for the loader
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { Loader, handleLoader };
