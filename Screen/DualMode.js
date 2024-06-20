import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import WrapperCom from "../Components/SharedCom/WrapperCom";
import {
  responsiveScreenFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";
import Colors from "../Constants/Colors";

const DualMode = () => {
  const [TeamAInput, setTeamAInput] = useState("");
  const [TeamBInput, setTeamBInput] = useState("");

  const [callA, setCallA] = useState([]);
  const [callB, setCallB] = useState([]);

  const [totalPointA, setTotalPointA] = useState([0]);
  const [totalPointB, setTotalPointB] = useState([0]);

  const [history, setHistory] = useState([
    { callA, totalPointA, callB, totalPointB },
  ]);
  const [current, setCurrent] = useState(0);

  const handleTeamA = () => {
    if (totalPointA.length == 1 && totalPointA[0] == 0) {
      setTotalPointA((pre) => [
        parseInt(pre[pre.length - 1]) + parseInt(TeamAInput),
      ]);
      setTeamAInput("");
      return;
    }
    const newCallA = [...callA, TeamAInput];
    const newTotalPointA = [
      ...totalPointA,
      parseInt(totalPointA[totalPointA.length - 1]) + parseInt(TeamAInput),
    ];

    setCallA(newCallA);
    setTotalPointA(newTotalPointA);

    const newHistory = history.slice(0, current + 1);
    setHistory([
      ...newHistory,
      { callA: newCallA, totalPointA: newTotalPointA, callB, totalPointB },
    ]);
    setCurrent(newHistory.length);
    setTeamAInput("");
  };

  const handleTeamB = () => {
    if (totalPointB.length == 1 && totalPointB[0] == 0) {
      setTotalPointB((pre) => [
        parseInt(pre[pre.length - 1]) + parseInt(TeamBInput),
      ]);
      setTeamBInput("");
      return;
    }
    const newCallB = [...callB, TeamBInput];
    const newTotalPointB = [
      ...totalPointB,
      parseInt(totalPointB[totalPointB.length - 1]) + parseInt(TeamBInput),
    ];

    setCallB(newCallB);
    setTotalPointB(newTotalPointB);

    const newHistory = history.slice(0, current + 1);
    setHistory([
      ...newHistory,
      { callA, totalPointA, callB: newCallB, totalPointB: newTotalPointB },
    ]);
    setCurrent(newHistory.length);
    setTeamBInput("");
  };

  const handleUndo = () => {
    if (current > 0) {
      const prevState = history[current - 1];
      setCallA(prevState.callA);
      setTotalPointA(prevState.totalPointA);
      setCallB(prevState.callB);
      setTotalPointB(prevState.totalPointB);
      setCurrent(current - 1);
    }
  };

  const handleRedo = () => {
    if (current < history.length - 1) {
      const nextState = history[current + 1];
      setCallA(nextState.callA);
      setTotalPointA(nextState.totalPointA);
      setCallB(nextState.callB);
      setTotalPointB(nextState.totalPointB);
      setCurrent(current + 1);
    }
  };

  return (
    <WrapperCom>
      <View style={styles.undoRedoContainer}>
        <TouchableOpacity onPress={handleUndo} style={styles.undoRedoButton}>
          <Text style={styles.undoRedoButtonText}>Undo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRedo} style={styles.undoRedoButton}>
          <Text style={styles.undoRedoButtonText}>Redo</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.teamNameContainer}>
        <Text style={styles.teamName}>Team A</Text>
        <Text style={styles.teamName}>Team B</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.pointContainer}>
          {/* Team A */}
          <View style={styles.pointInnerContainer}>
            <View style={styles.totalPointContainer}>
              {totalPointA.map((item, index) => (
                <Text style={styles.pointText} key={index}>
                  {item}
                </Text>
              ))}
            </View>
            <View style={styles.callContainer}>
              {callA.map((item, index) => (
                <Text style={styles.pointText} key={index}>
                  {item}
                </Text>
              ))}
              <TextInput
                onChangeText={(text) => setTeamAInput(text)}
                style={styles.textInput}
                value={TeamAInput}
              />
            </View>
            <TouchableOpacity onPress={handleTeamA} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.VerticalDivider}></View>
          {/* Team B */}
          <View style={styles.pointInnerContainer}>
            <View style={styles.totalPointContainer}>
              {totalPointB.map((item, index) => (
                <Text style={styles.pointText} key={index}>
                  {item}
                </Text>
              ))}
            </View>
            <View style={styles.callContainer}>
              <View>
                {callB.map((item, index) => (
                  <Text style={styles.pointText} key={index}>
                    {item}
                  </Text>
                ))}
              </View>
              <TextInput
                onChangeText={(text) => setTeamBInput(text)}
                style={styles.textInput}
                value={TeamBInput}
              />
            </View>
            <TouchableOpacity onPress={handleTeamB} style={styles.addButton}>
              <Text style={styles.addButtonText}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </WrapperCom>
  );
};

export default DualMode;

const styles = StyleSheet.create({
  undoRedoContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: Colors.Background,
    gap: 10,
    margin: responsiveScreenFontSize(1),
    width: "35%",
    justifyContent: "center",
    borderRadius: 7,
  },
  VerticalDivider: {
    borderWidth: 0.5,
  },
  scrollViewContainer: {},
  teamNameContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: responsiveScreenHeight(2),
    backgroundColor: Colors.Primary,
    marginHorizontal: responsiveScreenWidth(2),
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: responsiveScreenHeight(2),
    backgroundColor: Colors.Primary,
    marginHorizontal: responsiveScreenWidth(2),
    borderTopStartRadius: 7,
    borderTopEndRadius: 7,
  },
  teamName: {
    color: "#fff",
    fontSize: responsiveScreenFontSize(2),
  },
  addButton: {
    paddingVertical: responsiveScreenHeight(0.7),
    paddingHorizontal: responsiveScreenWidth(2),
    backgroundColor: Colors.Secondary,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
    alignSelf: "flex-end",
    // marginTop: responsiveScreenHeight(2),
  },
  addButtonText: {
    color: "#fff",
  },
  textInput: {
    backgroundColor: "#fff",
    borderColor: Colors.Primary,
    borderWidth: 1,
    borderRightWidth: 0,
    borderTopLeftRadius: 4,
    borderBottomLeftRadius: 4,
    width: "100%",
    alignSelf: "flex-end",
  },
  pointContainer: {
    backgroundColor: Colors.Background,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingHorizontal: responsiveScreenWidth(4),
    paddingVertical: responsiveScreenHeight(2),
    borderRadius: 10,
    marginHorizontal: responsiveScreenWidth(2),
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    gap: responsiveScreenWidth(5),
  },
  pointInnerContainer: {
    flex: 0.5,
    flexDirection: "row",
  },
  totalPointContainer: {
    flexWrap: "wrap",
    flex: 1,
    marginRight: responsiveScreenWidth(2),
  },
  callContainer: {
    flexWrap: "wrap",
    flex: 1,
    justifyContent: "space-between",
  },
  pointText: {
    fontSize: responsiveScreenFontSize(2.5),
    paddingRight: responsiveScreenWidth(2),
    textAlign: "right",
    color: Colors.Primary,
  },
  undoRedoButton: {
    paddingVertical: responsiveScreenHeight(0.5),
    paddingHorizontal: responsiveScreenWidth(2),
    backgroundColor: Colors.Secondary,
    borderRadius: 4,
  },
  undoRedoButtonText: {
    color: "#fff",
  },
});
