import React, { Component } from "react";
// import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Footer, FooterTab, Button, Text } from "native-base";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import NavigationService from "../services/nav.service";

const styles = StyleSheet.create({
  footer: {
    backgroundColor: Colors.secondary,
    // backgroundColor: "#FFFFFF",
  },
  text: {
    color: Colors.primary,
  },
});

const ListIcon = () => <Icon name="list" size={30} color={Colors.primary} />;
const GraphIcon = () => (
  <Icon name="show-chart" size={30} color={Colors.primary} />
);
const ExportIcon = () => (
  <Icon name="cloud-download" size={30} color={Colors.primary} />
);

class BottomTabNav extends Component {
  render() {
    return (
      <Footer style={styles.footer}>
        <FooterTab style={styles.footer}>
          <Button vertical onPress={() => NavigationService.navigate("Value")}>
            <ListIcon />
            <Text style={styles.text}>Liste</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate("Graph")}>
            <GraphIcon />
            <Text style={styles.text}>Graphs</Text>
          </Button>
          <Button vertical onPress={() => NavigationService.navigate("Export")}>
            <ExportIcon />
            <Text style={styles.text}>Export</Text>
          </Button>
        </FooterTab>
      </Footer>
    );
  }
}

BottomTabNav.propTypes = {};

export default BottomTabNav;
