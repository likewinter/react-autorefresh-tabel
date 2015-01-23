var React = require('react');

var FilterSelect = React.createClass({
    handlerChange(e) {
        var filter = {};
        filter[this.props.name] = e.target.value;

        this.props.filterHandler(filter);
    },

    render() {
        return (
            <select
                className="form-control"
                placeholder={this.props.name}
                value={this.props.value}
                onChange={this.handlerChange}>

                <option value="*">All {this.props.name}</option>
                {this.props.list.map(item => <option value={item}>{item}</option>)}

            </select>
        );
    }
});

module.exports = FilterSelect;
