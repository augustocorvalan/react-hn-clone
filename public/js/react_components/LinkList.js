/** @jsx React.DOM */

/*
	var LinkList = require('../react_components/LinkList'); 
	React.renderComponent(
		<LinkList pollInterval={500}/>,
		document.querySelector('LinkList')
	);
*/

var React = require('react')
	, Backbone = require("backbone")
	, LinkModel = require("../modules/models/LinkModel")
	, LinksCollection = require("../modules/models/LinksCollection")
	, VoteLink = require('./VoteLink')
	, StringHelpers = require('../modules/StringHelpers');

//private variables
var links = new LinksCollection();

var LinkList = React.createClass({

	getInitialState: function() {
		return {data : [], message : ""};
	},

	render: function() {

		var linksRows = this.state.data.map(function(link){
			return (
				<li className="list-group-item">
					<a href={link.url}>{link.title}</a>
					<div className="pull-right">
						<VoteLink action="up" id={link._id} voteNumber={link.votesUp} glyphClass="thumbs-up" />
						<VoteLink action="down" id={link._id} voteNumber={link.votesDown} glyphClass="thumbs-down" />
					</div>
				</li>
			)
		});

		return <ul className="list-group">{linksRows}</ul>
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

				link.set(attribute, prevValue + 1).save();
				//optimistically update UI without waiting for server
				self.setState({ data: links.toJSON(), message: Date() });
			}
		});
		this.router = new Router()
	}

});

module.exports = LinkList;
