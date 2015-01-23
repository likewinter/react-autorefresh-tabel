var React  = require('react'),
    _      = require('lodash'),
    Person = require('./Person.jsx');

var People = React.createClass({
    render() {
        return (
            <tbody>
            {this.props.people.map(person => <Person person={person} key={person.id} /> )}
            </tbody>
        );
    }
});

module.exports = People;
