var _ = require('lodash');

var FilterPeopleMixin = {
    filters: {
        name: '',
        domain: '*',
        address: ''
    },

    applyFilter(filter) {
        this.filters = _.merge(this.filters, filter);

        var rName    = new RegExp(this.filters.name, 'i'),
            rDomain  = new RegExp('.*@' + this.filters.domain, 'i'),
            rAddress = new RegExp(this.filters.address, 'i');

        this.setState({filtered: _.filter(this.state.people, person => {
                return rName.test(person.name) && rDomain.test(person.email) && rAddress.test(person.address);
            })
        });
    }
}

module.exports = FilterPeopleMixin;
