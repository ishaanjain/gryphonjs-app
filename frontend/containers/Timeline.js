// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import TimelineTicks from './TimelineTicks';
import ProgressBarContainer from './ProgressBarContainer';
import ExportJsonButton from './ExportJsonButton';

const Timeline = () => {
    return (
        <div id={"timeline"} style={{
            flex: '1',
            padding: '10px 15px 10px 15px'
        }}>
            <span>Timeline</span>
            <TimelineTicks />
            <ProgressBarContainer />
            <ExportJsonButton />
        </div>
    );
};

Timeline.propTypes = {
};

const mapStateToProps = (/* state */) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Timeline);
