var React = require('react'),
    Input = require('react-bootstrap').Input;

var NewPersonForm = React.createClass({
    getInitialState() {
        return {
            name: '',
            email: '',
            address: ''
        };
    },

    render() {
        return (
            <form className="form-horizontal">
                <Input
                    type="text"
                    label="Name"
                    labelClassName="col-xs-2"
                    wrapperClassName="col-xs-10"
                    onChange={this.validate} />
                <Input
                    type="email"
                    label="Email"
                    labelClassName="col-xs-2"
                    wrapperClassName="col-xs-10"
                    onChange={this.validate} />
                <Input
                    type="textarea"
                    label="Address"
                    labelClassName="col-xs-2"
                    wrapperClassName="col-xs-10" />
            </form>
        );
    }
});

module.exports = NewPersonForm;
