import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, List, ListItem, Badge, Left, Right } from "native-base";
import InfoBar from "../components/InfoBar";
import NoDataWarning from "../components/NoDataWarning";
import WaitForLoading from "../components/WaitForLoading";

class _SiteScreen extends React.Component {
  componentDidMount() {
    !this.props.isSitesLoaded && this.props.loadSites();
  }
  selectSite(site) {
    this.props.selectSite(site);
    this.props.setIsHome(false);
  }
  render() {
    return (
      <React.Fragment>
        <InfoBar
          lastReloadTime={this.props.lastReloadTime}
          load={this.props.loadSites}
        />
        {this.props.isLoading ? (
          <WaitForLoading />
        ) : !this.props.isConnexionSucess ||
          !this.props.isSitesLoaded ||
          this.props.sites.length === 0 ? (
          <NoDataWarning />
        ) : (
          <List>
            {this.props.sites.map((site, index) => (
              <ListItem
                key={index}
                selected={this.props.selectedSite === index}
                onPress={() => this.selectSite(site)}
              >
                <Left>
                  <Text>{site.name}</Text>
                </Left>
                <Right>
                  <Badge>
                    <Text>{site.probes.length}</Text>
                  </Badge>
                </Right>
              </ListItem>
            ))}
          </List>
        )}
      </React.Fragment>
    );
  }
}

_SiteScreen.propTypes = {
  sites: PropTypes.any.isRequired,
  selectedSite: PropTypes.any,
  selectSite: PropTypes.func,
  isSitesLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isConnexionSucess: PropTypes.bool.isRequired,
  loadSites: PropTypes.func.isRequired,
  setIsHome: PropTypes.func.isRequired,
  lastReloadTime: PropTypes.string.isRequired,
};

const mapState = ({ sitesModel, rootModel }) => ({
  sites: sitesModel.sites,
  selectedSite: sitesModel.selectedSite,
  isSitesLoaded: sitesModel.isSitesLoaded,
  isLoading: rootModel.isLoading,
  isConnexionSucess: rootModel.isConnexionSucess,
  lastReloadTime: sitesModel.lastReloadTime,
});

const mapDispatch = ({ sitesModel }) => ({
  selectSite: sitesModel.selectSite,
  loadSites: sitesModel.loadSites,
  setIsHome: sitesModel.setIsHome,
});

const SiteScreen = connect(
  mapState,
  mapDispatch,
)(_SiteScreen);

export default SiteScreen;
