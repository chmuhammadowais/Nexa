import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import { useState } from "react";
import Error_msg, { setErrorText as setErr } from "../components/Error_msg";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";
export default function Login({ dispatch }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show_pass, setShow_pass] = useState(true);
  return (
    <View style={styles.container}>
      <View style={styles.headers}>
        <Main_heading text={"Nexa"} />
      </View>

      <View style={styles.form}>
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
            }}
          >
            Login
          </Text>
        </View>
      </View>
    </View>
  );
}