import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { Table, Row } from "react-native-table-component";
import { styles } from "../styles";
import Bottom_menu from "../components/Bottom_menu";
import Main_heading from "../components/Main_heading";

export default function Stats({ dispatch, user }) {
  const jsonData = [
    {
      Platform: "instagram",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "twitter",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "failed",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "pending",
    },
    {
      Platform: "instagram",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "twitter",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "failed",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "pending",
    },
    {
      Platform: "instagram",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "twitter",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "failed",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "pending",
    },
    {
      Platform: "instagram",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "twitter",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "failed",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "pending",
    },
    {
      Platform: "instagram",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "twitter",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "success",
    },
    {
      Platform: "pinterest",
      Command: "Post",
      Time: "23 / 2 / 24",
      Status: "failed",
    },
    {
      Platform: "pinterest",
      Command: "Delete",
      Time: "23 / 2 / 24",
      Status: "pending",
    },
  ];
  return (
    <>
      <View style={styles.container}>
        <View style={styles.headers}>
          <Main_heading text={"Command Stats"} />
        </View>
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
          <View style={styles.container_table}>
            <StatsTable jsonData={jsonData} />
          </View>
        </ScrollView>
      </View>
      <Bottom_menu dispatch={dispatch} user={user} />
    </>
  );
}
const StatsTable = ({ jsonData }) => {
  const tableHead = ["Platform", "Command", "Time", "Status"];
  const tableData = jsonData.map((item) => [
    item.Platform,
    item.Command,
    item.Time,
    item.Status,
  ]);
  // Function to render platform icon based on platform name
  const renderPlatformIcon = (platform) => {
    switch (platform.toLowerCase()) {
      case "instagram":
        return (
          <Image
            source={require("../assets/instagram.png")}
            style={styles.platformIcon}
          />
        );
      case "twitter":
        return (
          <Image
            source={require("../assets/twitter.png")}
            style={styles.platformIcon}
          />
        );
      case "pinterest":
        return (
          <Image
            source={require("../assets/pinterest.png")}
            style={styles.platformIcon}
          />
        );
      default:
        return null;
    }
  };

  // Function to render status icon based on status
  const renderStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case "success":
        return (
          <Image
            source={require("../assets/success.png")}
            style={styles.platformIcon}
          />
        );
      case "failed":
        return (
          <Image
            source={require("../assets/failure.png")}
            style={styles.platformIcon}
          />
        );
      case "pending":
        return (
          <Image
            source={require("../assets/pending.png")}
            style={styles.platformIcon}
          />
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Table
        borderStyle={{
          borderWidth: 1,
          borderColor: "transparent",
        }}
        style={{ marginTop: 20 }}
      >
        <Row
          data={tableHead}
          style={{
            ...styles.head,
          }}
          textStyle={{ textAlign: "center" }}
        />
        {tableData.map((rowData, index) => (
          <Row
            key={index}
            data={[
              renderPlatformIcon(rowData[0]), // Platform icon
              ...rowData.slice(1, 3), // Command and Time data
              renderStatusIcon(rowData[3]), // Status icon
            ]}
            style={{
              ...styles.row,
              ...(index % 2 && { backgroundColor: "#b9bebc" }),
            }}
            textStyle={{ margin: 6, fontSize: 14, textAlign: "center" }}
          />
        ))}
      </Table>
    </View>
  );
};
