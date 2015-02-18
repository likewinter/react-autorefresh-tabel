var $          = require('jquery'),
    React      = require('react'),
    PeopleView = require('./PeopleView.jsx');
                 require('imports?jQuery=jquery!floatthead');

require('assets/less/app.less');
require('bootstrap/css/bootstrap.css');

React.render(<PeopleView />, document.body);
