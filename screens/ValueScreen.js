import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Content, Text, List, View } from "native-base";
import Colors from "../constants/Colors";
import ProbeItem from "../components/ProbeItem";
import {
  getMaxValue,
  getMinValue,
  getMeanValue,
  formatDate,
} from "../services/app.service";
import InfoBar from "../components/InfoBar";
import NoDataWarning from "../components/NoDataWarning";
import WaitForLoading from "../components/WaitForLoading";

const styles = StyleSheet.create({
  viewBox: {
    flexDirection: "row",
  },
  infoBox: {
    backgroundColor: Colors.primary,
    flex: 1,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  infoText1: {
    color: "#FFFFFF",
    fontSize: 14,
  },
  infoText2: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "900",
  },
  infoText3: {
    color: "#FFFFFF",
    fontSize: 10,
  },
});

class _ValueScreen extends React.Component {
  componentDidMount() {
    !this.props.isProbesLoaded && this.props.loadProbes();
  }
  render() {
    let probes;
    let max;
    let min;
    let mean;

    if (this.props.isProbesLoaded) {
      probes = this.props.probes.filter(
        probe => probe.site.id === this.props.site.id,
      );
      max = getMaxValue(probes);
      min = getMinValue(probes);
      mean = getMeanValue(probes);
    } else {
      probes = [];
      max = 0;
      min = 0;
      mean = 0;
    }

    return (
      <React.Fragment>
        <InfoBar
          lastReloadTime={this.props.lastReloadTime}
          load={this.props.loadProbes}
        />
        {this.props.isLoading ? (
          <WaitForLoading />
        ) : !this.props.isConnexionSucess ||
          probes === undefined ||
          probes.length === 0 ? (
          <NoDataWarning />
        ) : this.props.isProbesLoaded ? (
          <React.Fragment>
            <Content>
              <List>
                {probes.map((probe, index) => (
                  <ProbeItem
                    probeId={probe.id}
                    date={formatDate(new Date(probe.dateTime))}
                    isActive={probe.isActive}
                    key={index}
                  />
                ))}
              </List>
            </Content>
            <View style={styles.viewBox}>
              <View style={styles.infoBox}>
                <Text style={styles.infoText1}>Tmax</Text>
                <Text style={styles.infoText2}>
                  {max.value}
                  °C
                </Text>
                <Text style={styles.infoText3}> {max.probeName}</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoText1}>Tmoy</Text>
                <Text style={styles.infoText2}>
                  {" "}
                  {mean}
                  °C
                </Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoText1}>Tmin</Text>
                <Text style={styles.infoText2}>
                  {" "}
                  {min.value}
                  °C
                </Text>
                <Text style={styles.infoText3}>{min.probeName}</Text>
              </View>
            </View>
          </React.Fragment>
        ) : (
          <NoDataWarning />
        )}
      </React.Fragment>
    );
  }
}

_ValueScreen.propTypes = {
  site: PropTypes.any.isRequired,
  probes: PropTypes.any.isRequired,
  lastReloadTime: PropTypes.string.isRequired,
  isProbesLoaded: PropTypes.bool.isRequired,
  loadProbes: PropTypes.func.isRequired,
  isConnexionSucess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapState = ({ probesModel, sitesModel, rootModel }) => ({
  site: sitesModel.selectedSite,
  probes: probesModel.probes,
  lastReloadTime: probesModel.lastReloadTime,
  isProbesLoaded: probesModel.isProbesLoaded,
  isConnexionSucess: rootModel.isConnexionSucess,
  isLoading: rootModel.isLoading,
});

const mapDispatch = ({ probesModel }) => ({
  loadProbes: probesModel.loadProbes,
});

const ValueScreen = connect(
  mapState,
  mapDispatch,
)(_ValueScreen);

export default ValueScreen;
