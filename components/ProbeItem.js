import React from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { connect } from "react-redux";
import { Text, ListItem, Left, Right, Body, Switch } from "native-base";

const styles = StyleSheet.create({
  probeName: {
    fontWeight: "900",
  },
  date: {
    paddingLeft: 10,
    fontSize: 10,
  },
});

class _ProbeItem extends React.Component {
  render() {
    return (
      <ListItem
        onPress={() => this.props.toggleActiveProbe(this.props.probe.id)}
      >
        <Left>
          <Text style={styles.probeName}>{this.props.probe.name}</Text>
          <Text style={styles.date}>{this.props.date}</Text>
        </Left>
        <Body>
          <Text>
            {this.props.probe.value}
            °C
          </Text>
        </Body>
        <Right>
          <Switch value={this.props.isActive} />
        </Right>
      </ListItem>
    );
  }
}

_ProbeItem.propTypes = {
  probe: PropTypes.any.isRequired,
  toggleActiveProbe: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  date: PropTypes.string.isRequired,
};

const mapState = ({ probesModel }, props) => ({
  probe: probesModel.probes.find(probe => probe.id === props.probeId),
  isActive: props.isActive,
});

const mapDispatch = ({ probesModel }) => ({
  toggleActiveProbe: probesModel.toggleActiveProbe,
});

const ProbeItem = connect(
  mapState,
  mapDispatch,
)(_ProbeItem);

export default ProbeItem;
