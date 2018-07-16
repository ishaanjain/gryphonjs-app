import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

const draggableElementStyle = {
    postion: 'absolute',
    top: '184px',
    left: '709px',
    width: '80px',
    height: '80px',
    border: '#F0F3BD solid 2px',
    fontWeight: 'bold',
    color: 'black',
    padding: '10px 12px',
    cursor: 'move'
};

class DraggableElement extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // $ is already defined since we imported it via a CDN in index.html
        // Didn't import it here cause jquery-ui integration with react sucks.
        let startPosition;
        $( "#draggable-element" ).draggable({ // eslint-disable-line no-undef
            containment: "parent",
            start: (event, ui) => {
                startPosition = ui.position;
                this.props.elementDragStart();
            },
            stop: (event, ui) => {
                this.props.elementDragStop({
                    x: ui.position.left - startPosition.left,
                    y: startPosition.top - ui.position.top
                });
            }
        });
    }
    render() {
        return (
            <div id="draggable-element" style={draggableElementStyle}>
                Hi
            </div>
        );
    }
}

DraggableElement.propTypes = {
    elementDragStart: PropTypes.func,
    elementDragStop: PropTypes.func
};

const mapStateToProps = (/* state */) => {
    return {
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        elementDragStart: () => dispatch({
            type: 'ELEMENT_DRAG_START'
        }),
        elementDragStop: (dragChanges) => dispatch({
            type: 'ELEMENT_DRAG_STOP',
            dragChanges: dragChanges
        })
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableElement);
