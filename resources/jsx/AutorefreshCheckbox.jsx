var React = require('react');

var AutorefreshCheckbox = React.createClass({
    handleChange(e) {
        var state = e.target.checked ? 'auto' : 'manual';

        this.props.refreshModeHandler(state);
    },

    render() {
        return (
            <div className="checkbox">
                <label>
                    <input
                        type="checkbox"
                        checked={this.props.refreshMode === 'auto' ? true : false}
                        onChange={this.handleChange} />
                        &nbsp;
                        Autorefresh every second
                </label>
            </div>
        );
    }
});

module.exports = AutorefreshCheckbox;
