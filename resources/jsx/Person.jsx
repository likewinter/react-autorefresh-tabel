var React            = require('react'),
    ModalTrigger     = require('react-bootstrap').ModalTrigger,
    InformationModal = require('./InfromationModal.jsx');

var Person = React.createClass({
    render() {
        return (
            <tr>
                <td>
                <ModalTrigger modal={<InformationModal person={this.props.person} />}>
                    <a className="information">{this.props.person.name}</a>
                </ModalTrigger>
                </td>
                <td><a href={"mailto:" + this.props.person.email}>{this.props.person.email}</a></td>
                <td>{this.props.person.address}</td>
            </tr>
        );
    }
});

module.exports = Person;
