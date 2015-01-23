var React          = require('react'),
    ModalTrigger   = require('react-bootstrap').ModalTrigger,
    Button         = require('react-bootstrap').Button,
    NewPersonModal = require('./NewPersonModal.jsx');

var PersonCreateControls = React.createClass({
    render: function() {
        return (
            <form className="form-inline">
                <ModalTrigger modal={<NewPersonModal />}>
                    <Button bsStyle="primary">Add person</Button>
                </ModalTrigger>
            </form>
        );
    }
});

module.exports = PersonCreateControls;
