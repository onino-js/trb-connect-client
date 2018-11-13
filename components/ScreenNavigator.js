// import { createBottomTabNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation";

import ValueScreen from "../screens/ValueScreen";
import GraphScreen from "../screens/GraphScreen";
import ExportScreen from "../screens/ExportScreen";

export default createStackNavigator(
  {
    Value: {
      screen: ValueScreen,
    },
    Graph: {
      screen: GraphScreen,
    },
    Export: {
      screen: ExportScreen,
    },
  },
  {
    initialRouteName: "Value",
    navigationOptions: {
      headerStyle: {
        display: "none",
      },
    },
  },
);
