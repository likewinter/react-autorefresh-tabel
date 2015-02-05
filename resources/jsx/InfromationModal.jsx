var React  = require('react'),
    Utils  = require('./Utils.jsx'),
    Modal  = require('react-bootstrap').Modal,
    Button = require('react-bootstrap').Button;

var InformationModal = React.createClass({
    render() {
        return (
            <Modal {...this.props} title="Person information" animation={true}>
                <div className="modal-body">
                    <h5>{this.props.person.name}</h5>
                    <h5>Credit card</h5>
                    <ul>
                        <li>{this.props.person.cc.type}</li>
                        <li>{Utils.spliceBy(this.props.person.cc.number, 4).join(' ')}</li>
                        <li>Valid till {this.props.person.cc.expiration}</li>
                    </ul>
                </div>
                <div className="modal-footer">
                    <Button onClick={this.props.onRequestHide}>Close</Button>
                </div>
            </Modal>
        );
    }
});

module.exports = InformationModal;
