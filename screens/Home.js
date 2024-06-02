import React, { useState, useEffect } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles";
import axios from "axios";
import { Audio } from "expo-av";
import * as MediaLibrary from "expo-media-library";
import Bottom_menu from "../components/Bottom_menu";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
import Constants from "expo-constants";
export default function Home({ dispatch, user }) {
  const ip_address = Constants.expoConfig.extra.IP_ADDRESS;
  const port = Constants.expoConfig.extra.PORT;
  const [user_id, setUser_id] = useState(user.user_id);
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [recentImage, setRecentImage] = useState(null);

  useEffect(() => {
    // Function to fetch the most recent image from the gallery
    const fetchRecentImage = async () => {
      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant media library permission to use this feature."
        );
        return;
      }
      const assets = await MediaLibrary.getAssetsAsync({ first: 1 }); // Fetch only the first (most recent) image
      if (assets && assets.assets.length > 0) {
        setRecentImage(assets.assets[0].uri);
      }
    };
    fetchRecentImage(); // Call the function on component mount
  }, []); // Empty dependency array to execute the effect only once

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please grant audio recording permission to use this feature."
        );
        return;
      }

      const recordingObject = new Audio.Recording();
      await recordingObject.prepareToRecordAsync(
        Audio.RECORDING_OPTIONS_PRESET_LOW_QUALITY
      );
      await recordingObject.startAsync();
      setRecording(recordingObject);
      setIsRecording(true);
    } catch (error) {
      console.error("Failed to start recording", error);
      Alert.alert("Error", "Failed to start recording");
    }
  };
  const stopRecording = async () => {
    try {
      if (!recording) return;
      await recording.stopAndUnloadAsync();
      setIsRecording(false);
      setRecording(null);

      const uri = recording.getURI(); // Get audio URI synchronously after stopping recording
      console.log(recording);
      const formData = new FormData();
      formData.append("id", user_id);
      formData.append("voice", {
        uri,
        type: "audio/m4a",
        name: "command.m4a",
      });
      if (recentImage) {
        // Get the image file name from the URI
        const fileName = recentImage.split("/").pop();
        formData.append("image", {
          uri: recentImage,
          type: "image/jpeg", // Change the type based on the image format
          name: fileName,
        });
      }

      const response = await axios.post(
        `https://lion-optimal-sawfish.ngrok-free.app/api/send-voice-command`, //server interacting api
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      Alert.alert("Success", response.data.message);
      console.log("Transcribed text:", response.data);
    } catch (error) {
      console.error("An error occured on backend", error);
      Alert.alert("Error", "An error occurd on backend");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headers}>
          <Main_heading text={"Nexa"} />
        </View>
        <Sub_heading
          text={
            isRecording ? "Recording...." : "Tap to record your command command"
          }
        />
        <View style={styles.mic_btn_container}>
          {isRecording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image
                style={[styles.mic_btn_image, isRecording && { opacity: 0.5 }]}
                source={require("../assets/mic.png")}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                style={styles.mic_btn_image}
                source={require("../assets/mic.png")}
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
      <Bottom_menu dispatch={dispatch} user={user} />
    </>
  );
}
//status
// for login email and password return user_id, full_name, email
