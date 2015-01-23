var React         = require('react'),
    Modal         = require('react-bootstrap').Modal,
    Button        = require('react-bootstrap').Button,
    NewPersonForm = require('./NewPersonForm.jsx');

var NewPersonModal = React.createClass({
    handlerReady(isReady) {
        this.setState({ready: isReady});
    },

    getInitialState() {
        return {
            ready: false
        };
    },
    render() {
        return (
            <Modal {...this.props} title="Create new person" animation={true}>
                <div className="modal-body">
                    <NewPersonForm readyHandler={this.handlerReady} />
                </div>
                <div className="modal-footer">
                    <Button bsStyle="success" disabled={!this.state.ready}>Submit</Button>
                    <Button bsStyle="danger" onClick={this.props.onRequestHide}>Cancel</Button>
                </div>
            </Modal>
        );
    }
});

module.exports = NewPersonModal;
