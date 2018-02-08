const React = require("react");
const { View, VrButton } = require("react-vr");

module.exports = class GazeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      beingLookedAt: false,
      remainingTime: 0
    };
    this.handleEnter = this.handleEnter.bind(this);
    this.handleExit = this.handleExit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.clearCountdown = this.clearCountdown.bind(this);
    this.resetRemainingTime = this.resetRemainingTime.bind(this);
  }
  componentDidMount() {
    this.resetRemainingTime();
  }

  componentWillUnmount() {
    this.clearCountdown();
  }

  resetRemainingTime() {
    const { duration } = this.props;
    this.setState({ remainingTime: duration });
  }

  handleEnter() {
    const { duration, onClick } = this.props;
    this.gazeStart = Date.now();
    const endTime = this.gazeStart + duration;
    this.setState({ beingLookedAt: true });
    this.countdown = setInterval(
      () => {
        const { beingLookedAt } = this.state;
        const currentTime = Date.now();
        if (!beingLookedAt) {
          this.clearCountdown();
        } else if (currentTime > endTime) {
          this.handleClick();
        } else {
          this.setState({ remainingTime: endTime - currentTime });
        }
      },
      16
    );
  }

  handleExit() {
    this.setState({ beingLookedAt: false });
  }

  clearCountdown() {
    const { duration } = this.props;
    clearInterval(this.countdown);
    this.setState({ remainingTime: duration });
  }

  handleClick() {
    const { onClick } = this.props;
    this.clearCountdown();
    onClick();
  }

  render() {
    const { onClick, children } = this.props;
    const { remainingTime } = this.state;
    return (
      <View onEnter={this.handleEnter} onExit={this.handleExit}>
        <VrButton onClick={this.handleClick}>
          {children(remainingTime)}
        </VrButton>
      </View>
    );
  }
};
