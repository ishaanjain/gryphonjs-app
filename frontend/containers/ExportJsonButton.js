import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';

class ExportJsonButton extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalIsOpen: false
        };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({modalIsOpen: true});
    }
    closeModal() {
        this.setState({modalIsOpen: false});
    }
    render() {
        return (
            <div id="export-json-button">
                <button className="interface-button" onClick={this.openModal}>Export JSON</button>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    contentLabel="JSON Keyframe Data"
                >
                    <button onClick={this.closeModal}>Close</button><br/><br/>
                    <div>{JSON.stringify(this.props.keyFrames)}</div>
                </Modal>
            </div>
        );
    }
}

ExportJsonButton.propTypes = {
    keyFrames: PropTypes.array
};

const mapStateToProps = (state) => {
    return {
        keyFrames: state.keyFrames
    };
};

const mapDispatchToProps = (/* dispatch */) => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ExportJsonButton);
