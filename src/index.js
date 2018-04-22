import React from "react";
import { VrButton } from "react-vr";

export default class GazeButton extends React.Component {
  state = {
    remainingTime: this.props.duration || 1000,
    isGazed: false,
    gazeTimestamp: null
  };

  handleEnter = () => {
    const { onEnter } = this.props;
    if (onEnter) {
      onEnter();
    }
    this.setState(
      () => ({
        isGazed: true
      }),
      () => {
        window.requestAnimationFrame(this.step);
      }
    );
  };

  handleExit = () => {
    const { duration, onExit } = this.props;
    this.setState(
      () => ({ isGazed: false, remainingTime: duration, gazeTimestamp: null }),
      () => {
        if (onExit) {
          onExit();
        }
      }
    );
  };

  handleClick = () => {
    const { onClick } = this.props;
    const { gazeTimestamp } = this.state;
    if (isGazed && gazeTimestamp) {
      this.setState(
        () => ({ isGazed: false, remainingTime: 0, gazeTimestamp: null }),
        () => {
          onClick();
        }
      );
    }
  };

  step = timestamp => {
    const { duration } = this.props;
    const { isGazed, gazeTimestamp } = this.state;
    if (isGazed && !gazeTimestamp) {
      this.setState(() => ({ gazeTimestamp: timestamp }));
    }
    // at first step, remaining time equals to duration. No need to get gazeTimestamp from state
    const remainingTime = gazeTimestamp
      ? duration + gazeTimestamp - timestamp
      : duration;
    if (isGazed) {
      if (remainingTime >= 0) {
        this.setState(
          () => ({ remainingTime }),
          () => {
            window.requestAnimationFrame(this.step);
          }
        );
      } else {
        this.handleClick();
      }
    }
  };

  render() {
    const { onClick, render, children, ...props } = this.props;
    const { remainingTime, isGazed, gazeTimestamp } = this.state;
    return (
      <VrButton
        {...props}
        onEnter={this.handleEnter}
        onExit={this.handleExit}
        onClick={this.handleClick}
      >
        {render ? render(remainingTime, isGazed, gazeTimestamp) : null}
        {typeof children === "function"
          ? children(remainingTime, isGazed, gazeTimestamp)
          : null}
      </VrButton>
    );
  }
}
