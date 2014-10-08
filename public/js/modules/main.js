/** @jsx React.DOM */
var React   = require('react');
var Backbone = require("backbone");
var About = require('../react_components/About');

var LinkForm = require('../react_components/LinkForm');
var LinkList = require('../react_components/LinkList');

Backbone.$ = window.$ = require("jquery")

Backbone.history.start();

React.renderComponent(
  <LinkList />,
  document.querySelector('LinkList')
);

React.renderComponent(
  <LinkForm/>,
  document.querySelector('LinkForm')
);

