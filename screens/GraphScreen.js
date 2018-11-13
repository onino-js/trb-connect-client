import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Content, Text, View } from "native-base";
import InfoBar from "../components/InfoBar";
import SimpleHighchart from "../components/SimpleHighchart";
import NoDataWarning from "../components/NoDataWarning";
import WaitForLoading from "../components/WaitForLoading";

const styles = StyleSheet.create({
  content: {
    flex: 1,
  },
  textView: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#666666",
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
  },
});

class _GraphScreen extends React.Component {
  componentDidMount() {
    if (!this.props.isMeasuresLoaded) this.props.loadMeasures();
  }
  render() {
    let probes;
    if (this.props.isMeasuresLoaded) {
      probes = this.props.probes.filter(
        probe => probe.site.id === this.props.site.id && probe.isActive,
      );
    }

    return (
      <React.Fragment>
        <InfoBar
          lastReloadTime={this.props.lastReloadTime}
          load={this.props.loadMeasures}
        />
        {this.props.isLoading ? (
          <WaitForLoading />
        ) : !this.props.isConnexionSucess ||
          probes === undefined ||
          !this.props.isMeasuresLoaded ? (
          <NoDataWarning />
        ) : probes && probes.length === 0 ? (
          <View style={styles.textView}>
            <Text style={styles.text}>
              {
                "Veulliez sélectionner une ou plusieurs séries à afficher dans l'onglet liste"
              }
            </Text>
          </View>
        ) : (
          <Content>
            {probes.map((probe, index) => {
              const measures = this.props.measures
                .filter(measure => measure.probe.id === probe.id)
                .map(item => [Date.parse(item.dateTime), item.value]);
              return (
                <SimpleHighchart
                  key={index}
                  data={measures}
                  title={probe.name}
                />
              );
            })}
          </Content>
        )}
      </React.Fragment>
    );
  }
}

_GraphScreen.propTypes = {
  measures: PropTypes.any.isRequired,
  probes: PropTypes.any.isRequired,
  site: PropTypes.any.isRequired,
  lastReloadTime: PropTypes.string.isRequired,
  isMeasuresLoaded: PropTypes.bool.isRequired,
  isConnexionSucess: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadMeasures: PropTypes.func,
};

const mapState = ({ probesModel, sitesModel, measuresModel, rootModel }) => ({
  site: sitesModel.selectedSite,
  measures: measuresModel.measures,
  probes: probesModel.probes,
  isMeasuresLoaded: measuresModel.isMeasuresLoaded,
  isLoading: rootModel.isLoading,
  lastReloadTime: measuresModel.lastReloadTime,
  isConnexionSucess: rootModel.isConnexionSucess,
});

const mapDispatch = ({ measuresModel }) => ({
  loadMeasures: measuresModel.loadMeasures,
});

const GraphScreen = connect(
  mapState,
  mapDispatch,
)(_GraphScreen);

export default GraphScreen;
