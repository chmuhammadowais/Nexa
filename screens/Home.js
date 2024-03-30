import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { styles } from "../styles";
import axios from "axios";
import { Audio } from "expo-av";
import Bottom_menu from "../components/Bottom_menu";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";

export default function Home({ dispatch, user }) {
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);

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

      const formData = new FormData();
      formData.append("file", {
        uri,
        type: "audio/m4a",
        name: "command.m4a",
      });

      const response = await axios.post(
        "http://192.168.0.106:5000/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Transcribed text:", response.data);
    } catch (error) {
      console.error(
        "Failed to stop recording or convert speech to text",
        error
      );
      Alert.alert(
        "Error",
        "Failed to stop recording or convert speech to text"
      );
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
