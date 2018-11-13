import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Header, Left, Button, Body, Right, Title } from "native-base";
import Colors from "../constants/Colors";
import Icon from "react-native-vector-icons/MaterialIcons";

const styles = StyleSheet.create({
  header: {
    backgroundColor: Colors.primary,
    marginTop: 24,
  },
});

const ExitIcon = () => <Icon name="exit-to-app" size={30} color="#FFFFFF" />;
const HomeIcon = () => <Icon name="home" size={30} color="#FFFFFF" />;

class _AppHeader extends React.Component {
  render() {
    return (
      <Header androidStatusBarColor={Colors.primary} style={styles.header}>
        <Left>
          <Button transparent onPress={() => this.props.setIsHome(true)}>
            <HomeIcon />
          </Button>
        </Left>
        <Body>
          <Title>{this.props.headerTitle}</Title>
        </Body>
        <Right>
          <Button transparent onPress={this.props.logout}>
            <ExitIcon />
          </Button>
        </Right>
      </Header>
    );
  }
}

_AppHeader.propTypes = {
  logout: PropTypes.func.isRequired,
  headerTitle: PropTypes.string.isRequired,
  setIsHome: PropTypes.func.isRequired,
};

const mapState = ({ rootModel }) => ({
  token: rootModel.token,
  headerTitle: rootModel.headerTitle,
});

const mapDispatch = ({ rootModel, loginModel, sitesModel }) => ({
  logout: loginModel.logout,
  goHome: rootModel.goHome,
  setIsHome: sitesModel.setIsHome,
});

const AppHeader = connect(
  mapState,
  mapDispatch,
)(_AppHeader);

export default AppHeader;
