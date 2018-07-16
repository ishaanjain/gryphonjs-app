import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class KeyFrameEditor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            keyFrameNum: this.props.nextKeyFrameNumber,
            x: 0,
            y: 0,
            rotation: 0,
            opacity: 1,
            timingFunction: 'Linear'
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (this.props === nextProps) { return; }
        if (nextProps.selectedKeyFrame) {
            this.setState(nextProps.selectedKeyFrame);
        } else {
            this.setState({
                keyFrameNum: nextProps.nextKeyFrameNumber,
                x: 0,
                y: 0,
                rotation: 0,
                opacity: 1,
                timingFunction: 'Linear'
            });
        }
        if (this.props.userIsDraggingElement) {
            this.setState({
                x: nextProps.dragChanges.x,
                y: nextProps.dragChanges.y
            });
        }
    }
    handleInputChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div id="key-frame-editor" style={{
                flex: '1',
                padding: '10px',
                borderRadius: '0px 10px 10px 0px',
                backgroundColor: 'white'
            }}>
                <div style={{
                    paddingBottom: '15px',
                    borderBottom: '#05668D solid 1px',
                }}> Key Frame: {this.state.keyFrameNum} </div>
                <div style={{
                    paddingTop: '10px',
                }}> CSS Properties: </div>
                <div style={{
                    paddingTop: '7px',
                    display: 'flex',
                    flexDirection: 'row',
                }}>
                    <div style={{flex: '3', display: 'flex', flexDirection: 'column'}}>
                        <div>x: <input type="text" name="x" onChange={this.handleInputChange} value={this.state.x} /></div>
                        <div>y: <input type="text" name="y" onChange={this.handleInputChange} value={this.state.y} /></div>
                    </div>
                    <div style={{flex: '4', display: 'flex', flexDirection: 'column', textAlign: 'right'}}>
                        <div>rotation: <input type="text" name="rotation" onChange={this.handleInputChange} value={this.state.rotation} /></div>
                        <div>opacity: <input type="text" name="opacity" onChange={this.handleInputChange} value={this.state.opacity} /></div>
                    </div>
                </div>
                <div style={{
                    margin: '20px 0 15px 0',
                    borderTop: '#05668D solid 1px',
                    borderBottom: '#05668D solid 1px',
                    padding: '20px 0',
                }}>
                    <span>Timing Function: </span>
                    <select name="timingFunction" onChange={this.handleInputChange} value={this.state.timingFunction} >
                        <option value="linear">Linear</option>
                        <option value="ease">easeIn</option>
                        <option value="easeIn">easeOut</option>
                        <option value="easeOut">easeInOut</option>
                    </select>
                </div>
                {this.props.selectedKeyFrame ?
                    <div>
                        <button
                            className="interface-button"
                            onClick={() => this.props.updateKeyFrame(this.state)}
                        >Update Key Frame</button>
                        <button
                            className="interface-button"
                            onClick={() => this.props.deleteKeyFrame()}
                        >Delete Key Frame</button>
                    </div>
                :
                    <button className="interface-button" onClick={() => {
                        this.props.createKeyFrame(this.state);
                        this.props.selectKeyFrame(this.state.keyFrameNum);
                    }}>Create Key Frame</button>
                }
            </div>
        );
    }
}

KeyFrameEditor.propTypes = {
    userIsDraggingElement: PropTypes.bool,
    dragChanges: PropTypes.object,
    nextKeyFrameNumber: PropTypes.number,
    selectedKeyFrame: PropTypes.object,
    createKeyFrame: PropTypes.func,
    selectKeyFrame: PropTypes.func,
    updateKeyFrame: PropTypes.func,
    deleteKeyFrame: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        currentProgress: state.currentProgress,
        userIsDraggingElement: state.userIsDraggingElement,
        dragChanges: state.dragChanges,
        nextKeyFrameNumber: state.keyFrames.length + state.numDeletedKeyFrames,
        selectedKeyFrame: state.selectedKeyFrame
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        createKeyFrame: (keyFrame) => dispatch({
            type: 'CREATE_KEY_FRAME',
            keyFrame: keyFrame
        }),
        selectKeyFrame: (keyFrameNum) => dispatch({
            type: 'SELECT_KEY_FRAME',
            keyFrameNum: keyFrameNum
        }),
        updateKeyFrame: (keyFrame) => dispatch({
            type: 'UPDATE_KEY_FRAME',
            keyFrame: keyFrame
        }),
        deleteKeyFrame: () => dispatch({
            type: 'DELETE_KEY_FRAME'
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(KeyFrameEditor);
