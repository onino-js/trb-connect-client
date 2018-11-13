import React from "react";
// import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Text, View, Spinner } from "native-base";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  view: {
    backgroundColor: "#FFFFFF",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    paddingTop: 30,
    textAlign: "center",
    paddingBottom: 100,
  },
});

class WaitForLoading extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Spinner color={Colors.primary} />
        <Text style={styles.text}>Chargement en cours</Text>
      </View>
    );
  }
}

WaitForLoading.propTypes = {};

export default WaitForLoading;
