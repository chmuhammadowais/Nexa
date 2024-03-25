import React, { useState } from "react";
import { Text } from "react-native";
import { styles } from "../styles"; // Assuming your styles are imported here

export let setErrorText;
const Error_Msg = () => {
  const [err, setErr] = useState("");

  setErrorText = (text) => {
    setErr(text);
  };

  return <Text style={styles.err_msg}>{err}</Text>;
};

export default Error_Msg; // Exporting ErrorMsg component and setErrorText function
