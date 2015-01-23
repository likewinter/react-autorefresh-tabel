var React = require('react');

var FilterText = React.createClass({
    handlerChange(e) {
        var filter = {};
        filter[this.props.name] = e.target.value;

        this.props.filterHandler(filter);
    },

    render() {
        return (
            <input
                className="form-control"
                type="text"
                placeholder={this.props.name}
                value={this.props.value}
                onChange={this.handlerChange} />
        );
    }
});

module.exports = FilterText;
