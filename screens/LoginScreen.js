import React from "react";
import PropTypes from "prop-types";
import { Image, StyleSheet, View, TextInput, Button, Text } from "react-native";
import { connect } from "react-redux";
import Colors from "../constants/Colors";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    marginTop: 100,
  },
  input: {
    height: 40,
    width: 200,
    marginTop: 20,
  },
  button: {
    width: 200,
    paddingTop: 50,
  },
  message: {
    paddingTop: 20,
    fontSize: 12,
    color: Colors.primary,
  },
});

class LoginScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  componentDidMount() {
    this.props.setMessage("");
  }

  render() {
    return (
      <View style={styles.container}>
        <Image
          source={require("../assets/images/icon.png")}
          style={styles.image}
        />
        <TextInput
          style={styles.input}
          placeholder="email"
          value={this.props.email}
          onChangeText={this.props.setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="password"
          value={this.props.password}
          onChangeText={this.props.setPassword}
        />
        <View style={styles.button}>
          <Button
            color={Colors.primary}
            title="Login"
            onPress={this.props.login}
          />
        </View>
        <View>
          <Text style={styles.message}>{this.props.message}</Text>
        </View>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  email: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  login: PropTypes.func.isRequired,
  setPassword: PropTypes.func.isRequired,
  setEmail: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  setMessage: PropTypes.func.isRequired,
};

const mapState = ({ loginModel }) => ({
  email: loginModel.email,
  password: loginModel.password,
  message: loginModel.message,
});

const mapDispatch = ({ loginModel }) => ({
  setEmail: loginModel.setEmail,
  setPassword: loginModel.setPassword,
  login: loginModel.login,
  setMessage: loginModel.setMessage,
});

const LoginScreenWithProps = connect(
  mapState,
  mapDispatch,
)(LoginScreen);

export default LoginScreenWithProps;
