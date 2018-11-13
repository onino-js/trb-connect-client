import React from "react";
// import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Text, View } from "native-base";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";

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

const WarningIcon = () => (
  <Icon name="warning" size={36} color={Colors.primary} />
);

class NoDataWarning extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <WarningIcon />
        <Text style={styles.text}>Aucune donnée à afficher</Text>
      </View>
    );
  }
}

NoDataWarning.propTypes = {};

export default NoDataWarning;
