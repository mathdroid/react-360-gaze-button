# react-vr-gaze-button

> 👀 Extension of ReactVR's `VrButton`. Gaze for {duration} ms to click the button!

<img src="./gaze-button.gif"/>

# Usage

1.  Install

```bash
npm i --save react-vr-gaze-button
```

2.  Import to your file add pass it `onClick` (function) and `duration` (number, ms, defaults to 1000 ms) as props. Renders a `children` function prop that receives 3 arguments, in this order: `remainingTime`: Remaining time to gaze in ms, `isGazed`: boolean that indicates whether the button is being gazed, and `gazeTimestamp`: the timestamp of the latest onEnter event, `null` if `isGazed` is `false`, and returns a component. You can also pass a `render` prop with 1 argument, same as using `children`.

3.  You can pass any other props and it will be pased to the `VrButton` instance.

```js
import React from "react";
import { Text } from "react-vr";
import GazeButton from "react-vr-gaze-button";

class Example extends React.Component {
  state = {
    clicked: false
  };

  render() {
    const { clicked } = this.state;
    return (
      <GazeButton
        onClick={() => this.setState({ clicked: true })}
        duration={2000}
      >
        {(remainingTime, isGazed, gazeTimestamp) => (
          <Text>
            {isGazed
              ? clicked
                ? "You have clicked me"
                : `Gaze me for ${remainingTime} milliseconds`
              : "I am a gaze button"}
          </Text>
        )}
      </GazeButton>
    );
  }
}
```

# License

MIT. See [LICENSE](./LICENSE)
