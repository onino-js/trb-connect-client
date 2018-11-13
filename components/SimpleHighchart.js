import ChartView from "react-native-highcharts";
import React from "react";
import PropTypes from "prop-types";
import { View } from "native-base";
import { Dimensions } from "react-native";
// import Colors from "../constants/Colors";
// var Highcharts = "Highcharts";

const options = {
  global: {
    useUTC: false,
  },
  lang: {
    decimalPoint: ",",
    thousandsSep: ".",
  },
};

class SimpleHighchart extends React.Component {
  render() {
    const conf2 = {
      chart: {
        zoomType: "x",
      },
      exporting: { enabled: false },
      legend: {
        enabled: false,
      },
      title: {
        text: this.props.title,
      },
      yAxis: {
        title: {
          text: null,
        },
      },
      xAxis: {
        type: "datetime",
      },

      series: [
        {
          name: "Other",
          data: this.props.data,
        },
      ],
    };
    return (
      <View>
        <ChartView
          style={{ width: Dimensions.get("window").width, height: 300 }}
          config={conf2}
          options={options}
        />
      </View>
    );
  }
}

SimpleHighchart.propTypes = {
  data: PropTypes.any.isRequired,
  title: PropTypes.string.isRequired,
};

export default SimpleHighchart;
