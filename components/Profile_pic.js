import React, { useEffect, useState } from "react";
import { Image, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles";

let img_copy;
const Profile_pic = ({ default_path }) => {
  let temp_var;
  if (!default_path || default_path === "null") {
    temp_var = null;
  } else {
    temp_var = default_path;
  }

  const [image, setImage] = useState(temp_var);
  useEffect(() => {
    img_copy = image;
  }, [image]);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 3],
        quality: 1,
      });

      console.log(result);
      console.log(result.assets[0].uri);

      if (!result.canceled) {
        setImage(result.assets[0].uri);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image
        source={image ? { uri: image } : require("../assets/profile.png")}
        style={styles.profile}
      />
    </TouchableOpacity>
  );
};
export const get_profile_pic_path = () => {
  return img_copy;
};
export const reset_profile_pic_path = () => {
  img_copy = "";
};
export default Profile_pic;
