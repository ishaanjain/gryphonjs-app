// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Draggable from 'react-draggable';

const DraggableMarker = () => {
    return (
      <Draggable axis="x">
        <div className="cursor-x" />
      </Draggable>
    );
};

DraggableMarker.propTypes = {
};

const mapStateToProps = (/* state */) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DraggableMarker);
