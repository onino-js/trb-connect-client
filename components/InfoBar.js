import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { Text, Left, Right, Spinner, Header, Button } from "native-base";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";
import { connect } from "react-redux";

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#FFFFFF",
  },
  left: {
    flexDirection: "row",
  },
  infoText: {
    paddingRight: 10,
  },
  spinner: {
    height: 24,
    width: 24,
  },
});

const RefreshIcon = () => (
  <Icon name="refresh" size={24} color={Colors.primary} />
);
const CheckIcon = () => <Icon name="check-circle" size={24} color="green" />;

const WarningIcon = () => (
  <Icon name="warning" size={24} color={Colors.primary} />
);

class _InfoBar extends React.Component {
  handlePress = () => {
    this.props.setIsLoading(true);
    this.props.load();
  };

  render() {
    return (
      <Header style={styles.header}>
        <Left style={styles.left}>
          <Text style={styles.infoText}>{this.props.lastReloadTime}</Text>
          {!this.props.isConnexionSucess ? (
            <WarningIcon />
          ) : this.props.isLoading ? (
            <Spinner style={styles.spinner} />
          ) : (
            <CheckIcon />
          )}
        </Left>
        <Right>
          <Button transparent onPress={this.handlePress}>
            <RefreshIcon />
          </Button>
        </Right>
      </Header>
    );
  }
}

_InfoBar.propTypes = {
  lastReloadTime: PropTypes.string,
  load: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
  isConnexionSucess: PropTypes.bool.isRequired,
};

const mapState = ({ rootModel }) => ({
  isLoading: rootModel.isLoading,
  isConnexionSucess: rootModel.isConnexionSucess,
});

const mapDispatch = ({ rootModel }) => ({
  setIsLoading: rootModel.setIsLoading,
});

const InfoBar = connect(
  mapState,
  mapDispatch,
)(_InfoBar);

export default InfoBar;
