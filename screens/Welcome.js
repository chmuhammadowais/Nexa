import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";
import Main_heading from "../components/Main_heading";
import Sub_heading from "../components/Sub_heading";

export default function Welcome({ dispatch }) {
  return (
    <View style={styles.container}>
      <View style={{ ...styles.headers, marginBottom: 50 }}>
        <Main_heading text={"Nexa"} />
        <Sub_heading text={"Your Everyday Life Saver"} />
      </View>

      <TouchableOpacity>
        <Text
          style={styles.customBtn}
          onPress={() => dispatch({ type: "loginScreen", payload: true })}
        >
          Login
        </Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text
          style={styles.customBtn}
          onPress={() => dispatch({ type: "registerScreen", payload: true })}
        >
          Register
        </Text>
      </TouchableOpacity>
    </View>
  );
}
