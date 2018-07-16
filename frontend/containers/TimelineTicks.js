import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

class TimelineTicks extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        var arr = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        return (
            <div id={'timeline-ticks'} style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: 7,
                // fontWeight: 'bold'
            }}>
                {arr.map((num, index) => {
                    return (
                        <span key={index}>
                            |
                        </span>
                    );
                })}
            </div>
        );
    }
}

TimelineTicks.propTypes = {
    duration: PropTypes.number
};

const mapStateToProps = (state) => {
    return {
        duration: state.duration
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(TimelineTicks);
