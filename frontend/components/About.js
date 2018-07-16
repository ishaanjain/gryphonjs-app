import React from 'react';

const About = () => {
    return (
      <div>
        <div className="about" id="gryphon-wrap">
          <img src="/images/gryphon.png" alt="gryphon" id="gryphon"/>
        </div>

        <div className="about white-board" id="about-gryphon">
          <div className="about title">About Gryphon</div>
          <div className="about text">Gryphon is a CSS animation generating web application. It helps you to create
            your own CSS animation in an easy-to-use, flexible, and intuitive way!</div>
        </div>

        <div className="about blue-board">
            <div className="about title">Key Features</div>
            <div id="key-features-wrap">
                <div id="intuitive-timeline">
                    <div>Intuitive Timeline</div>
                    <img src="/images/movie3.svg" alt="intuitive timeline" className="feature-icons" id="timeline-icon"/>
                </div>
                <div id="real-time-animation">
                    <div>Real-time Animation</div>
                    <img src="/images/realtime.svg" alt="realtime animation" className="feature-icons" />
                </div>
                <div id="draggable-icon">
                    <div id="key-feature-3">Draggable Item</div>
                    <img src="/images/draggable.svg" alt="draggable element" className="feature-icons" id="draggable-icon" />
                </div>
            </div>
        </div>

        <div className="about white-board">
          <div className="about title">About Builders</div>
          <img id="han" src="/images/han.jpg" alt="Han" />
          <img id="ishaan" src="/images/ishaan4.jpg" alt="Ishaan" />
          <div className="about text">We made Gryphon in two weeks.</div>
        </div>

        <div id="get-started-section">
            <div className="about button" id="get-started">
                <a href="/"><span className="shift">Start!</span></a>
                {/* <div className="mask" /> */}
            </div>
        </div>

      </div>
    );
};

export default About;
