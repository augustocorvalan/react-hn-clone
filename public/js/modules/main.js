/** @jsx React.DOM */
var React   = require('react');
var Backbone = require("backbone");
var About = require('../react_components/About');

var LinkContainer = require('../react_components/LinkContainer');

Backbone.$ = window.$ = require("jquery")

Backbone.history.start();

React.renderComponent(
  <LinkContainer />,
  document.querySelector('LinkContainer')
);

