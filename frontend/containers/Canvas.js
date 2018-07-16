import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import DraggableElement from './draggableElement';
import { TimelineLite } from "gsap";

const canvasStyle = {
    height: '400px',
    // width: '100%', this messes everything up regarding width???
    padding: '10px 12px',
    paddingBottom: '100px',
    background: 'radial-gradient(#00A896, #18737F)',
    position: 'relative'
};

class Canvas extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tl: new TimelineLite({
                paused: true
            })
        };
    }
    componentWillReceiveProps(nextProps) {
        if (this.props === nextProps) { return; }
        if (this.props.currentTime !== nextProps.currentTime) {
            this.state.tl.seek(nextProps.currentTime);
            this.state.tl.pause();
            return;
        }
        if (this.props.keyFrames !== nextProps.keyFrames) {
            const box = document.getElementById('draggable-element');
            this.state.tl.clear();
            this.state.tl.to(box, 0, {
                left: '709px',
                top: '184px'
            });
            this.state.tl.to(box, 0, {
                x: 0,
                y: 0,
                rotation: nextProps.keyFrames[0].rotation + 'deg',
                opacity: nextProps.keyFrames[0].opacity,
                ease: 'Linear'
            });
            for (let i = 1; i < nextProps.keyFrames.length; i++) {
                const currentKeyFrameTime = nextProps.keyFrames[i].timestamp / 1000;
                const previousKeyFrameTime = nextProps.keyFrames[i - 1].timestamp / 1000;
                const duration = currentKeyFrameTime - previousKeyFrameTime;
                let ease;
                if (nextProps.keyFrames[i].timingFunction === 'Linear') {
                    ease = 'Linear.easeNone';
                } else {
                    ease = 'Power1.' + nextProps.keyFrames[i].timingFunction;
                }
                this.state.tl.to(box, duration, {
                    x: '+=' + nextProps.keyFrames[i].x,
                    y: '-=' + nextProps.keyFrames[i].y,
                    rotation: '+=' + nextProps.keyFrames[i].rotation + 'deg',
                    opacity: nextProps.keyFrames[i].opacity,
                    ease: ease
                });
            }
            return;
        }
        if (this.props.isAnimating !== nextProps.isAnimating) {
            if (nextProps.isAnimating) {
                this.state.tl.seek(nextProps.currentTime);
                this.state.tl.resume();
            } else {
                this.state.tl.pause();
            }
            return;
        }
        console.error('YOO THIS GOT TO THE END OF THE FUNCTION WHAAAT?');
    }
    render() {
        return (
            <div id={'canvas'} style={canvasStyle}>
                <DraggableElement />
            </div>
        );
    }
}

Canvas.propTypes = {
    currentTime: PropTypes.number,
    keyFrames: PropTypes.array,
    isAnimating: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        currentTime: state.currentProgress * state.duration / 1000,
        keyFrames: state.keyFrames,
        isAnimating: state.isAnimating
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
