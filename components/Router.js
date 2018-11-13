import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Container } from "native-base";
import AppHeader from "../components/AppHeader";
import HomeScreen from "../screens/HomeScreen";
import BottomNav from "./BottomNav";
import ValueScreen from "../screens/ValueScreen";
import GraphScreen from "../screens/GraphScreen";
import ExportScreen from "../screens/ExportScreen";

class _Router extends Component {
  render() {
    return (
      <Container>
        <AppHeader />
        {this.props.selectedPage === 1 && <HomeScreen />}
        {this.props.selectedPage === 2 && <ValueScreen />}
        {this.props.selectedPage === 3 && <GraphScreen />}
        {this.props.selectedPage === 4 && <ExportScreen />}
        {this.props.selectedPage !== 1 && <BottomNav />}
      </Container>
    );
  }
}

_Router.propTypes = {
  goToPage: PropTypes.func.isRequired,
  selectedPage: PropTypes.number.isRequired,
};

const mapState = ({ rootModel }) => ({
  selectedPage: rootModel.selectedPage,
});

const mapDispatch = ({ rootModel }) => ({
  goToPage: rootModel.goToPage,
});

const Router = connect(
  mapState,
  mapDispatch,
)(_Router);

export default Router;
