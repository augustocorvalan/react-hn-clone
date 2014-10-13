/** @jsx React.DOM */

var React = require('react')
	, Backbone = require("backbone")
	, _ = require('underscore')
	, LinkList = require('./LinkList')
	, LinkForm = require('./LinkForm')
	, GlyphButton = require('./GlyphButton')
	, LinkModel = require("../modules/models/LinkModel")
	, LinksCollection = require("../modules/models/LinksCollection")
	, StringHelpers = require('../modules/StringHelpers');

//private variables
var links = new LinksCollection();

var LinkContainer = React.createClass({
	getInitialState: function() {
		return {
			data : [], 
			message : "",
			dateSortActive: true
		};
	},

	render: function () {
		return (
			<div className="row">
				<div className="col-md-6">
					<LinkForm onFormSubmit={this.handleFormSubmit}/>
				</div>
				<div className="col-md-6">
					<div className="sort-buttons">
						Sort By:
						<div className="btn-group">
							<GlyphButton active={this.state.dateSortActive} handleClick={this.handleDateSort} glyphClass="time"/>
							<GlyphButton active={!this.state.dateSortActive} handleClick={this.handleVoteSort} glyphClass="upload"/>
		      			</div>
		      		</div>	
					<LinkList links={this.state.data}/>
				</div>
			</div>
		);
	},

	handleFormSubmit: function (link) {
		links.add(link);
		this.setState({ data: links.toJSON() });
	},

	getLinks : function() {
		links.fetch()
			.done(function(data){
				this.setState({data : links.toJSON(), message : Date()});
			}.bind(this))
			.fail(function(err){
				this.setState({
					message  : err.responseText + " " + err.statusText
				});
			}.bind(this))
	},

	handleDateSort: function () {
		this.sortLinks('created');
	},

	handleVoteSort: function () {
		this.sortLinks('votesUp');
	},

	sortLinks: function (type, reverse) {
		this.updateState({ 
			data: links.setAndDoSort(type, reverse).toJSON(),
			dateSortActive: !this.state.dateSortActive 
		});
	},

	componentWillMount: function() {
		this.getLinks();
	},

	componentDidMount: function() {
		var self = this;
		var Router = Backbone.Router.extend({
			routes : {
				"vote/:action/:id" : "vote"
			},
			vote: function (action, id) {
				var attribute = 'votes' + StringHelpers.capitalize(action);
				var link = links.get(id);
				var prevValue = link.get(attribute);
				var voteStorageKey = 'v' + id;

				//TODO: once the concept of user has been introduced, voting history should go in the DB
				if (localStorage.getItem(voteStorageKey)) {
					//don't do anything if user has already voted on this story
					return;
				} else {
					localStorage.setItem(voteStorageKey, action);
				}

				link.set(attribute, prevValue + 1).save();
				//optimistically update UI without waiting for server
				self.setState({ data: links.toJSON(), message: Date() });
			}
		});
		this.router = new Router()
	},

	updateState: function (updated) {
		this.setState(_.extend(this.state, updated));
	}

});

module.exports = LinkContainer;
