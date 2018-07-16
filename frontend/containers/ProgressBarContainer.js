import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import KeyFramesContainer from './KeyFramesContainer.js';
var ProgressBar = require('progressbar.js');

class ProgressBarContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            progressBar: null
        };
        this.initializeProgressBar = this.initializeProgressBar.bind(this);
        this.handleProgressBarClick = this.handleProgressBarClick.bind(this);
        this.handleStart = this.handleStart.bind(this);
        this.handleStop = this.handleStop.bind(this);
        this.handleResetTime = this.handleResetTime.bind(this);
    }
    componentDidMount() {
        this.initializeProgressBar(this.props.duration);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props.duration !== nextProps.duration) {
            this.initializeProgressBar(nextProps.duration);
        }
    }
    initializeProgressBar(duration) {
        this.setState({
            progressBar: new ProgressBar.Line('#progress-bar', {
                color: '#D6EAF8',
                duration: duration,
                strokeWidth: 9
            })
        });
    }
    handleProgressBarClick(event) {
        const boundingRect = document.getElementById("progress-bar").getBoundingClientRect();
        const value = (event.clientX - boundingRect.left) / boundingRect.width;
        this.state.progressBar.set(value);
        this.props.updateCurrentProgress(value);
    }
    handleStart() {
        this.state.progressBar.animate(1, {
            duration: this.props.duration * (1 - this.state.progressBar.value())
        }, () => {
            this.props.updateCurrentProgress(1);
        });
        this.props.startAnimation();
    }
    handleStop() {
        this.state.progressBar.stop();
        this.props.updateCurrentProgress(this.state.progressBar.value());
    }
    handleResetTime() {
        this.state.progressBar.set(0);
        // Below I initially update currentProgress to 0.001, then wait before
        // updating it to the correct value of 0. This is to ensure that other
        // components register that currentProgress has changed value.
        this.props.updateCurrentProgress(0.001);
        setTimeout(() => {
            this.props.updateCurrentProgress(0);
        }, 0);
    }
    render() {
        return (
            <div
                id={'progress-bar-container'}
                style={{position: 'relative'}}
            >
                <div id="progress-bar" onClick={(e) => this.handleProgressBarClick(e)} style={{
                    width: '100%',
                    backgroundColor: 'white',
                    cursor: 'crosshair'
                }} />
                <KeyFramesContainer />
                <div id="progress-bar-buttons" style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}>
                    <button className="progress-bar-button" onClick={this.handleStart} >Start</button>
                    <button className="progress-bar-button" onClick={this.handleStop} >Stop</button>
                    <button className="progress-bar-button" onClick={this.handleResetTime} >Reset Time</button>
                </div>
            </div>
        );
    }
}

ProgressBarContainer.propTypes = {
    duration: PropTypes.number,
    updateCurrentProgress: PropTypes.func,
    startAnimation: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        duration: state.duration
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateCurrentProgress: (currentProgress) => dispatch({
            type: 'UPDATE_CURRENT_PROGRESS',
            currentProgress: currentProgress
        }),
        startAnimation: () => dispatch({
            type: 'START_ANIMATION'
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBarContainer);
