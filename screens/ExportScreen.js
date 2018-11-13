import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, Button, View, Spinner } from "native-base";
import Expo from "expo";
import Colors from "../constants/Colors";
import { formatCsv } from "../services/app.service";
import NoDataWarning from "../components/NoDataWarning";

const styles = StyleSheet.create({
  content: {
    flex: 1,
    backgroundColor: "#fff",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 18,
    paddingBottom: 30,
  },
  button: {
    width: 120,
    backgroundColor: Colors.primary,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
  },
});

class _ExportScreen extends React.Component {
  componentDidMount() {
    if (!this.props.isMeasuresLoaded) this.props.loadMeasures();
  }
  handlePress = () => {
    const fileUri = Expo.FileSystem.cacheDirectory + "trb-connect.csv";
    Expo.FileSystem.writeAsStringAsync(
      fileUri,
      formatCsv({
        probes: this.props.probes.filter(
          probe => probe.site.id === this.props.site.id,
        ),
        measures: this.props.measures.filter(
          measure => measure.site.id === this.props.site.id,
        ),
      }),
    )
      .then(() => {
        Expo.MailComposer.composeAsync({
          subject: `TRB connect : recorded data from ${this.props.site.name}`,
          attachments: [fileUri],
        });
      })
      .catch(error => {
        console.error(error);
      });
  };
  render() {
    return (
      <React.Fragment>
        {!this.props.isConnexionSucess ? (
          <NoDataWarning />
        ) : !this.props.isMeasuresLoaded ? (
          <Spinner color={Colors.primary} />
        ) : (
          <View style={styles.content}>
            <Text style={styles.text}>Données non archivées: </Text>
            <Button style={styles.button} onPress={this.handlePress}>
              <Text>Exporter</Text>
            </Button>
          </View>
        )}
      </React.Fragment>
    );
  }
}

_ExportScreen.propTypes = {
  measures: PropTypes.any,
  site: PropTypes.any,
  probes: PropTypes.any,
  isMeasuresLoaded: PropTypes.bool.isRequired,
  isConnexionSucess: PropTypes.bool.isRequired,
  loadMeasures: PropTypes.func,
};

const mapState = ({ measuresModel, sitesModel, probesModel, rootModel }) => ({
  measures: measuresModel.measures,
  site: sitesModel.selectedSite,
  probes: probesModel.probes,
  isMeasuresLoaded: measuresModel.isMeasuresLoaded,
  isConnexionSucess: rootModel.isConnexionSucess,
});

const mapDispatch = ({ sitesModel, measuresModel }) => ({
  selectSite: sitesModel.selectSite,
  loadSites: sitesModel.loadSites,
  loadMeasures: measuresModel.loadMeasures,
});

const ExportScreen = connect(
  mapState,
  mapDispatch,
)(_ExportScreen);

export default ExportScreen;
