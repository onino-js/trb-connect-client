import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View } from "react-native";
import { AppLoading, Asset, Font, Icon } from "expo";
import rootStore from "./stores/root.store";
import { Provider, connect } from "react-redux";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          {this.props.token ? <HomeScreen /> : <LoginScreen />}
        </View>
      );
    }
  }

  _loadResourcesAsync = async () => {
    /* eslint-disable-next-line no-undef */
    return Promise.all([
      Asset.loadAsync([
        require("./assets/images/icon.png"),
        require("./assets/images/icon.png"),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font, // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        "space-mono": require("./assets/fonts/SpaceMono-Regular.ttf"),
        Roboto: require("native-base/Fonts/Roboto.ttf"),
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

App.propTypes = {
  token: PropTypes.any.isRequired,
  skipLoadingScreen: PropTypes.bool,
};

const mapState = ({ loginModel }) => ({
  token: loginModel.token,
});

const mapDispatch = () => ({});

const AppWithProps = connect(
  mapState,
  mapDispatch,
)(App);

const _App = () => (
  <Provider store={rootStore}>
    <AppWithProps />
  </Provider>
);

export default _App;
