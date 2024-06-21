import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import WrapperCom from "../Components/SharedCom/WrapperCom";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Colors from "../Constants/Colors";

const Home = ({ navigation }) => {
  return (
    <WrapperCom>
      <View style={styles.logoContainer}>
        <Text style={styles.logo}>Call Counter</Text>
      </View>
      <View style={styles.modeContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("DualMode")}
          activeOpacity={0.5}
          style={[
            styles.modeButtonContainer,
            { backgroundColor: Colors.Primary },
          ]}
        >
          <Text style={styles.buttonText}>Dual Mode</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SquadMode")}
          activeOpacity={0.5}
          style={[
            styles.modeButtonContainer,
            { backgroundColor: Colors.Secondary },
          ]}
        >
          <Text style={styles.buttonText}>Squad Mode</Text>
        </TouchableOpacity>
      </View>
    </WrapperCom>
  );
};

export default Home;

const styles = StyleSheet.create({
  buttonText: {
    fontSize: responsiveScreenFontSize(2.5),
    fontWeight: "500",
    color: "white",
  },
  modeButtonContainer: {
    backgroundColor: Colors.Background,
    padding: responsiveScreenFontSize(3),
    borderRadius: 10,
  },
  modeContainer: {
    backgroundColor: Colors.Background,
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 20,
  },
  logoContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.Background,
  },
  logo: {
    backgroundColor: Colors.Primary,
    color: "white",
    marginVertical: responsiveScreenHeight(2),
    fontSize: responsiveScreenFontSize(4),
    textAlign: "center",
    paddingVertical: responsiveScreenHeight(0.5),
    paddingHorizontal: responsiveScreenWidth(4),
    borderRadius: 7,
  },
});
