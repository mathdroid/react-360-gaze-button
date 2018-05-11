import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-360";

import GazeButton from "react-360-gaze-button";

export default class custom360 extends React.Component {
  state = {
    gazed: false
  };

  setGazed = () => {
    this.setState({ gazed: true });
  };
  render() {
    const { gazed } = this.state;
    return (
      <View style={styles.panel}>
        <GazeButton
          duration={3000}
          onClick={this.setGazed}
          render={(remainingTime, isGazed) => (
            <View style={styles.greetingBox}>
              <Text style={styles.greeting}>
                {gazed
                  ? "You have gazed me"
                  : isGazed
                    ? remainingTime
                    : "Gaze me"}
              </Text>
            </View>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  panel: {
    // Fill the entire surface
    width: 1000,
    height: 600,
    backgroundColor: "rgba(255, 255, 255, 0.4)",
    justifyContent: "center",
    alignItems: "center"
  },
  greetingBox: {
    padding: 20,
    backgroundColor: "#000000",
    borderColor: "#639dda",
    borderWidth: 2
  },
  greeting: {
    fontSize: 30
  }
});

AppRegistry.registerComponent("custom360", () => custom360);
