var React  = require('react'),
    _      = require('lodash'),
    Person = require('./Person.jsx');

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

module.exports = People;
