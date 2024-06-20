import { StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";

const WrapperCom = ({ children }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar />
      {children}
    </SafeAreaView>
  );
};

export default WrapperCom;

const styles = StyleSheet.create({});
