var React = require('react'),
    _     = require('lodash'),
    $     = require('jquery'),
    /* React components */
    RefreshControls      = require('./RefreshControls.jsx'),
    PersonCreateControls = require('./PersonCreateControls.jsx'),
    FilterText           = require('./FilterText.jsx'),
    FilterSelect         = require('./FilterSelect.jsx'),
    People               = require('./People.jsx'),
    FilterPeopleMixin    = require('./FilterPeopleMixin.es6');

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

    mixins: [FilterPeopleMixin],

    getInitialState() {
        return {
            people: [],
            emailDomains: [],
            filtered: []
        };
    },

    componentDidMount() {
        this.loadPeople();

        $('table.people').floatThead();
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
                                    name="name" />
                            </th>
                            <th>
                                <FilterSelect
                                    filterHandler={this.applyFilter}
                                    name="domain"
                                    list={this.state.emailDomains} />
                            </th>
                            <th>
                                <FilterText
                                    filterHandler={this.applyFilter}
                                    name="address" />
                            </th>
                        </tr>
                    </thead>
                    <People people={this.state.filtered} />
                </table>
            </div>
        );
    }
});

module.exports = PeopleView;
