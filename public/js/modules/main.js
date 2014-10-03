/** @jsx React.DOM */
var React   = require('react');
var Backbone = require("backbone");
var About = require('../react_components/About');

var LinkForm = require('../react_components/LinkForm');
var LinkTable = require('../react_components/LinkTable');

Backbone.$ = window.$ = require("jquery")

Backbone.history.start();

React.renderComponent(
  <LinkTable pollInterval={500}/>,
  document.querySelector('LinkTable')
);

React.renderComponent(
  <LinkForm/>,
  document.querySelector('LinkForm')
);

