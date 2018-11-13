import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import NavigationService from "../services/nav.service";
import AppHeader from "../components/AppHeader";
import ScreenNavigator from "../components/ScreenNavigator";
import BottomTabNav from "../components/BottomTabNav";
import SiteScreen from "./SiteScreen";

class _HomeScreen extends React.Component {
  componentDidMount() {
    !this.props.isSitesLoaded && this.props.loadSites();
  }
  render() {
    return (
      <React.Fragment>
        <AppHeader />
        {this.props.isHome ? (
          <SiteScreen />
        ) : (
          <React.Fragment>
            <ScreenNavigator
              ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}
            />
            <BottomTabNav />
          </React.Fragment>
        )}
      </React.Fragment>
    );
  }
}

_HomeScreen.propTypes = {
  sites: PropTypes.any.isRequired,
  selectedSite: PropTypes.any,
  selectSite: PropTypes.func,
  isSitesLoaded: PropTypes.bool.isRequired,
  loadSites: PropTypes.func.isRequired,
  isHome: PropTypes.bool.isRequired,
};

const mapState = ({ sitesModel }) => ({
  sites: sitesModel.sites,
  selectedSite: sitesModel.selectedSite,
  isSitesLoaded: sitesModel.isSitesLoaded,
  isHome: sitesModel.isHome,
});

const mapDispatch = ({ sitesModel }) => ({
  selectSite: sitesModel.selectSite,
  loadSites: sitesModel.loadSites,
});

const HomeScreen = connect(
  mapState,
  mapDispatch,
)(_HomeScreen);

export default HomeScreen;
