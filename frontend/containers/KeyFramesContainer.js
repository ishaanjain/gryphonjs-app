import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class KeyFramesContainer extends React.Component {
    constructor(props) {
        super(props);
    }
    getRelativeX(timestamp) {
        const duration = this.props.duration;
        return (timestamp / duration * 100 - 1.7) + '%';
    }
    render() {
        return (
            <div id={"key-frames-container"} style={{width: '100%'}}>
                {this.props.keyFrames.map(keyFrame => (
                    <span key={keyFrame.keyFrameNum} style={{
                        position: 'absolute',
                        top: '5%',
                        left: this.getRelativeX(keyFrame.timestamp),
                        color: '#05668D',
                        cursor: 'pointer'
                    }} onClick={() => this.props.selectKeyFrame(keyFrame.keyFrameNum)}>
                        &#9679;
                    </span>
                ))}
            </div>
        );
    }
}

KeyFramesContainer.propTypes = {
    duration: PropTypes.number,
    keyFrames: PropTypes.array,
    selectKeyFrame: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        duration: state.duration,
        keyFrames: state.keyFrames
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        selectKeyFrame: (keyFrameNum) => dispatch({
            type: 'SELECT_KEY_FRAME',
            keyFrameNum: keyFrameNum
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KeyFramesContainer);
