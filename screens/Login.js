import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import Error_msg, { setErrorText as setErr } from "../components/Error_msg";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
import { Loader, handleLoader } from "../components/Loader";
import Constants from "expo-constants";
export default function Login({ dispatch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show_pass, setShow_pass] = useState(true);
  return (
    <View style={styles.container}>
      <Loader />
      <View style={styles.headers}>
        <Main_heading text={"Nexa"} />
      </View>

      <View style={styles.form}>
        {/*<Text style={styles.err_msg}>{err}</Text>*/}
        <Error_msg />
        <Sub_heading text={"Login"} />

        <View style={styles.input_fields}>
          <TextInput
            placeholder={"Email"}
            style={styles.textInputs}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            onChangeText={(val) => setEmail(val)}
          />
          <TextInput
            placeholder={"Password"}
            style={styles.textInputs}
            secureTextEntry={show_pass}
            autoCapitalize="none"
            autoCorrect={false}
            onChangeText={(val) => setPassword(val)}
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
              onPress={() => dispatch({ type: "cancelOperation" })}
            >
              Cancel
            </Text>
          </TouchableOpacity>

          <Text
            style={styles.customBtn}
            onPress={() => {
              console.log(`Email: ${email}, Password: ${password}`);
              check_cred(email, password, dispatch, setErr);
            }}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}
async function check_cred(email, password, dispatch, setErr) {
  if (!email || !password) {
    setErr("Please check the input fields");
    return;
  }
  try {
    handleLoader();
    const timeoutMs = 30000;
    const response = await Promise.race([
      fetch(`https://lion-optimal-sawfish.ngrok-free.app/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Request timed out")), timeoutMs)
      ),
    ]);

    // Check if response exists
    if (response) {
      // Check if response status is in the range 200-299 (indicating success)
      if (response.status >= 200 && response.status < 300) {
        // If request is successful, proceed with further actions
        const data = await response.text();
        const dataJson = JSON.parse(data);

        console.log("Response from server:", data);
        console.log("Response from server:", dataJson.success);
        if (dataJson.success === true) {
          setErr("");
          dispatch({
            type: "homeScreen",
            payload: {
              user_id: dataJson.user.user_id,
              full_name: dataJson.user.full_name,
              email: dataJson.user.email,
              password: dataJson.password,
              profile_pic_path: dataJson.profile_pic_path,
              auth_key: dataJson.auth_key,
            },
          });
        } else if (dataJson.success === false) {
          setErr("Please check your credentials again");
        }
      } else {
        // If request fails, set error message
        setErr("Please check your credentials again");
      }
    } else {
      // If response is null (indicating timeout), set error message
      setErr("Request timed out. Please try again later.");
    }
  } catch (error) {
    // If an error occurs during the request, log it and set error message
    console.error(error);
    setErr("An error occurred. Please try again later.");
  } finally {
    handleLoader();
  }
}
