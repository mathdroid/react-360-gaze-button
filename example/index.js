import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-360";
import GazeButton from "react-360-gaze-button";

export default class example extends React.Component {
  render() {
    return (
      <View style={styles.panel}>
        <View style={styles.greetingBox}>
          <GazeButton
            duration={5000}
            onClick={() => {
              alert("hey");
            }}
            render={remainingTime => (
              <Text style={styles.greeting}>
                Welcome to React {remainingTime}
              </Text>
            )}
          />
        </View>
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

AppRegistry.registerComponent("example", () => example);
