import { Image, TouchableOpacity, View } from "react-native";
import { styles } from "../styles";

export default function Bottom_menu({ dispatch, user }) {
  return (
    <View style={styles.bottom_menu}>
      <TouchableOpacity
        onPress={() => dispatch({ type: "statScreen", payload: true })}
      >
        <Image
          source={require("../assets/stats.png")}
          style={styles.bottom_btn}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() =>
          dispatch({
            type: "homeScreen",
            payload: {
              full_name: user.full_name,
              email: user.email,
              password: user.password,
              profile_pic_path: user.profile_pic_path,
              auth_key: user.auth_key,
            },
          })
        }
      >
        <Image
          source={require("../assets/home.png")}
          style={styles.bottom_btn}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => dispatch({ type: "profileScreen", payload: true })}
      >
        <Image
          source={require("../assets/profile.png")}
          style={styles.bottom_btn}
        />
      </TouchableOpacity>
    </View>
  );
}
