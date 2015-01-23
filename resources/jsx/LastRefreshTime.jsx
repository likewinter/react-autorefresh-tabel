var React          = require('react');

var LastRefreshTime = React.createClass({
    render() {
        return (
            <div className="form-group">
                <p className="form-control-static">{this.props.lastRefresh.toLocaleString()}</p>
            </div>
        );
    }
});

module.exports = LastRefreshTime;
