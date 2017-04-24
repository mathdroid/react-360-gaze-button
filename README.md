# react-vr-gaze-button

> 👀 Extension of ReactVR's `VrButton`. Gaze for {duration} ms to click the button!

<img src="./gazebutton.gif"/>

# Usage

1. Install

```bash
npm i --save react-vr-gaze-button
```
2. Import to your file add pass it `onClick` (function) and `duration` (number, ms) as props. Also pass it a function as the `children` with 1 argument (time remaining in ms) that returns a component.

```js
import React from 'react'
import {Text} from 'react-vr'
import GazeButton from 'react-vr-gaze-button'

class Example extends React.Component {
  constructor() {
    super()
    this.state = {
      buttonIsClicked: false
    }
  }

  render () {
    const {buttonIsClicked} = this.state
    return (
      <GazeButton onClick={() => this.setState({buttonIsClicked: true})} duration={2000}>
          {time => (
            <Text>
              {buttonIsClicked ? 'You have clicked me' : `Gaze me for ${time} milliseconds`}
            </Text>
          )}
      </GazeButton>
    )
  }
}  
```

# License

MIT. See [LICENSE](./LICENSE)
