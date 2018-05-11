# react-360-gaze-button

> 👀 Extension of React 360's `VrButton`. Gaze for {duration} ms to click the button!

<img src="./gaze-button.gif"/>

# Usage

1.  Install

```bash
npm i --save react-360-gaze-button
```

2.  Import to your file add pass it `onClick` (function) and `duration` (number, ms, defaults to 1000 ms) as props. Renders a `children` function prop that receives 3 arguments, in this order: `remainingTime`: Remaining time to gaze in ms, `isGazed`: boolean that indicates whether the button is being gazed, and `gazeTimestamp`: the timestamp of the latest onEnter event, `null` if `isGazed` is `false`, and returns a component. You can also pass a `render` prop with 1 argument, same as using `children`.

3.  You can pass any other props and it will be pased to the `VrButton` instance.

```js
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
```

# License

MIT. See [LICENSE](./LICENSE)
