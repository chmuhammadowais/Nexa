import React, { useState } from "react";
import {
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  ToastAndroid,
  AlertIOS,
} from "react-native";
import { styles } from "../styles";
import Error_msg, { setErrorText as setErr } from "../components/Error_msg";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
import { Loader, handleLoader } from "../components/Loader";
import Constants from "expo-constants";

export default function Instagram({ dispatch, user }) {
  const [user_id, setUser_id] = useState(user.user_id);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show_pass, setShow_pass] = useState(true);

  const handleLogin = async () => {
    console.log(`Email: ${email}, Password: ${password}`);
    await checkCredentials(user_id, email, password, dispatch, setErr);
  };

  return (
    <View style={styles.container}>
      <Loader />
      <View style={styles.headers}>
        <Main_heading text={"Nexa"} />
      </View>

      <View style={styles.form}>
        <Error_msg />
        <Sub_heading text={"Instagram"} />
        <View style={styles.input_fields}>
          <TextInput
            placeholder={"Email"}
            style={styles.textInputs}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={setEmail}
          />
          <TextInput
            placeholder={"Password"}
            style={styles.textInputs}
            secureTextEntry={show_pass}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setShow_pass(!show_pass)}>
            <Image
              source={require("../assets/eye.png")}
              style={styles.password_field_icon}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity onPress={() => console.log("Cancel")}>
            <Text
              style={styles.customBtn}
              onPress={() => dispatch({ type: "profileScreen", payload: true })}
            >
              Cancel
            </Text>
          </TouchableOpacity>
          <Text style={styles.customBtn} onPress={handleLogin}>
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}

async function checkCredentials(user_id, email, password, dispatch, setErr) {
  if (!email || !password) {
    setErr("Please check the input fields");
    return;
  }

  try {
    handleLoader();
    const timeoutMs = 60000; // 30 seconds

    const response = await fetchWithTimeout(
      `https://lion-optimal-sawfish.ngrok-free.app/api/my_socials`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id }),
      },
      timeoutMs
    );

    if (response.ok) {
      const data = await response.json();
      console.log("Response from server:", data);

      if (data.success) {
        const socialsArray = data.socials;
        const isInstagramLinked = socialsArray.some(
          (social) => social.platform_name === "instagram"
        );

        if (isInstagramLinked) {
          notifyMessage("Instagram account already linked");
          dispatch({ type: "profileScreen", payload: true });
          setErr("");
          handleLoader();
          return;
        }

        const secondResponse = await fetchWithTimeout(
          `https://lion-optimal-sawfish.ngrok-free.app/api/instagram/add_account`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ user_id, email, password }),
          },
          timeoutMs
        );

        if (secondResponse.ok) {
          const secondData = await secondResponse.json();
          if (secondData.success) {
            notifyMessage("Instagram account added successfully");
            dispatch({ type: "profileScreen", payload: true });
            handleLoader();
          } else {
            notifyMessage("Instagram account could not be added");
          }
        } else {
          setErr("Failed to add Instagram account. Please try again later.");
        }
      } else {
        setErr("Please check your credentials again");
      }
    } else {
      setErr("Please check your credentials again");
    }
  } catch (error) {
    console.error(error);
    setErr("An error occurred. Please try again later.");
  } finally {
    handleLoader();
  }
}

async function fetchWithTimeout(resource, options, timeoutMs) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(resource, {
      ...options,
      signal: controller.signal,
    });
    clearTimeout(id);
    return response;
  } catch (error) {
    clearTimeout(id);
    throw error;
  }
}

function notifyMessage(msg) {
  if (Platform.OS === "android") {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  } else {
    AlertIOS.alert(msg);
  }
}
