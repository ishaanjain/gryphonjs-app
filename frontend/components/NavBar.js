import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';

const NavBar = () => {
    return (
        <div className="nav_bar" id="nav_bar">
          <ul>
            <li id="title">GRYPHON JS</li>
            <li key="contact"><Link to="/contact">Contact</Link></li>
            {/* <li key="about"><Link to="/about">About</Link></li> */}
            <li key="about"><Link to="/about">About</Link></li>
            <li key="home"><Link to="/">Home</Link></li>
          </ul>
        </div>
    );
};

// NavBar.propTypes = {
//     name: PropTypes.string,
// };

export default NavBar;
