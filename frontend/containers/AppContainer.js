// import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import NavBar from '../components/NavBar';
import Canvas from './Canvas';
import Interface from './Interface';
import About from '../components/About';

const AppContainer = () => {
    return (
        <BrowserRouter>
          <div>
              <NavBar />
              <Route exact path="/" render={() =>
                <div>
                  <Canvas />
                  <Interface />
                </div>} />
              <Route exact path="/about" render={() => <About /> } />
          </div>
        </BrowserRouter>
    );
};

AppContainer.propTypes = {
};

const mapStateToProps = (/* state */) => {
    return {
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
