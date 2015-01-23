var React               = require('react'),
    RefreshButton       = require('./RefreshButton.jsx'),
    AutorefreshCheckbox = require('./AutorefreshCheckbox.jsx'),
    LastRefreshTime     = require('./LastRefreshTime.jsx');

var RefreshControls = React.createClass({
    refresh() {
        this.props.refreshHandler();
        this.setState({lastRefresh: new Date()});
    },

    refreshModeHandler(state) {
        if (state === 'auto') {
                this.refresh();
                this.setState({intervalId: setInterval(this.refresh, 1000)});
        } else {
            clearInterval(this.state.intervalId);
        }

        this.setState({refreshMode: state});
    },

    componentDidMount() {
        if (this.state.refreshMode === 'auto') {
            this.refreshModeHandler('auto');
        }
    },

    getInitialState() {
        return {
            refreshMode: 'manual',
            intervalId: null,
            lastRefresh: new Date()
        };
    },

    render() {
        return (
            <form className="form-inline pull-right">
                <RefreshButton
                    refreshHandler={this.refresh}
                    refreshMode={this.state.refreshMode} />
                {' '}
                <AutorefreshCheckbox
                    refreshModeHandler={this.refreshModeHandler}
                    refreshMode={this.state.refreshMode} />
                {' '}
                <LastRefreshTime
                    lastRefresh={this.state.lastRefresh} />
            </form>
        );
    }
});

module.exports = RefreshControls;
