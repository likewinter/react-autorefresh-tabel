var React  = require('react'),
    Button = require('react-bootstrap').Button;

var RefreshButton = React.createClass({
    render() {
        return (
            <Button
                bsStyle="info"
                disabled={this.props.refreshMode === 'auto'}
                onClick={this.props.refreshHandler}>
            Refresh
            </Button>
        );
    }
});

module.exports = RefreshButton;
