'use strict';
/**
 * Utilities
 */
var Utils = {
    spliceBy(str, num) {
        var r = new RegExp('.{1,' + num  + '}', 'g');

        return str.match(r);
    }
}

/**
 * React bootstrap
 */

var Modal = ReactBootstrap.Modal,
    ModalTrigger = ReactBootstrap.ModalTrigger,
    Button = ReactBootstrap.Button,
    Input = ReactBootstrap.Input;

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

/**
 * Refresh controls
 */

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

var LastRefreshTime = React.createClass({
    render() {
        return (
            <div className="form-group">
                <p className="form-control-static">{this.props.lastRefresh.toLocaleString()}</p>
            </div>
        );
    }
});

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

/**
 * Filter controls
 */

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

/**
 * People
 */

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

var PersonCreateControls = React.createClass({
    render: function() {
        return (
            <form className="form-inline">
                <ModalTrigger modal={<NewPersonModal />}>
                    <Button bsStyle="primary">Create new person</Button>
                </ModalTrigger>
            </form>
        );
    }
});

var NewPersonModal = React.createClass({
    handlerReady(isReady) {
        this.setState({ready: isReady});
    },

    getInitialState() {
        return {
            ready: false
        };
    },
    render() {
        return (
            <Modal {...this.props} title="Create new person" animation={true}>
                <div className="modal-body">
                    <NewPersonForm readyHandler={this.handlerReady} />
                </div>
                <div className="modal-footer">
                    <Button bsStyle="success" disabled={!this.state.ready}>Submit</Button>
                    <Button bsStyle="danger" onClick={this.props.onRequestHide}>Cancel</Button>
                </div>
            </Modal>
        );
    }
});

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

var People = React.createClass({
    render() {
        var filters = this.props.filters,
            rName    = new RegExp(filters.name, 'i'),
            rDomain  = new RegExp('.*@' + filters.domain, 'i'),
            rAddress = new RegExp(filters.address, 'i');

        var filteredPeople = _.filter(this.props.people, person => {
            return rName.test(person.name) && rDomain.test(person.email) && rAddress.test(person.address);
        });

        return (
            <tbody>
            {filteredPeople.map(person => <Person person={person} key={person.id} /> )}
            </tbody>
        );
    }
});

var PeopleView = React.createClass({
    loadPeople() {
        $.ajax({
            url: 'json/json.php',
            type: 'GET',
            dataType: 'json'
        })
        .done(data => this.onLoadData(data));
    },

    onLoadData(data) {
        this.setState({
            people: data,
            emailDomains: _(data)
                .map(item => item.email.split('@')[1])
                .uniq()
                .sort()
                .value()
        });

        this.applyFilter({domain: '*'});
    },

    applyFilter(filter) {
        this.setState({filters: _.merge(this.state.filters, filter)});
    },

    getInitialState() {
        return {
            people: [],
            emailDomains: [],
            filters: {
                name: '',
                domain: '*',
                address: ''
            }
        };
    },

    componentDidMount() {
        this.loadPeople();

        $('#people table').floatThead();
    },

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-6">
                        <PersonCreateControls />
                    </div>
                    <div className="col-lg-6">
                        <RefreshControls refreshHandler={this.loadPeople} />
                    </div>
                </div>
                <table className="people table table-striped">
                    <colgroup>
                        <col className="name" />
                        <col className="email" />
                        <col className="address" />
                    </colgroup>
                    <thead>
                        <tr>
                            <th>
                                <FilterText
                                    filterHandler={this.applyFilter}
                                    value={this.state.filters.name}
                                    name="name" />
                            </th>
                            <th>
                                <FilterSelect
                                    filterHandler={this.applyFilter}
                                    value={this.state.filters.domain}
                                    name="domain"
                                    list={this.state.emailDomains} />
                            </th>
                            <th>
                                <FilterText
                                    filterHandler={this.applyFilter}
                                    value={this.state.filters.address}
                                    name="address" />
                            </th>
                        </tr>
                    </thead>
                    <People
                        people={this.state.people}
                        filters={this.state.filters} />
                </table>
            </div>
        );
    }
});

React.render(<PeopleView />, document.body);
