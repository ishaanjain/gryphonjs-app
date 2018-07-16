// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Timeline from './Timeline';
import KeyFrameEditor from './KeyFrameEditor';

const interfaceWrapStyle = {
    position: 'absolute',
    top: '500px',
    height: '300px',
    width: '100%',
    fontWeight: 'bold',
    fontSize: '18px'
};

const interfaceStyle = {
    margin: '0 auto',
    padding: '0',
    height: '100%',
    width: '60%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#F7F7F7',
    borderRadius: '10px',
    boxShadow: '0 3px 5px 3px rgba(0, 0, 0, 0.2)'
};

const Interface = () => {
    return (
      <div id={'interface-wrap'} style={interfaceWrapStyle}>
        <div id={'interface'} style={interfaceStyle}>
          <Timeline />
          <KeyFrameEditor />
        </div>
      </div>
    );
};

Interface.propTypes = {
};

const mapStateToProps = (/* state */) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Interface);
