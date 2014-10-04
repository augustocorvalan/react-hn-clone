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
	, LinksCollection = require("../modules/models/LinksCollection");

var LinkList = React.createClass({

	getInitialState: function() {
		return {data : [], message : ""};
	},

	render: function() {

		var linksRows = this.state.data.map(function(link){
			return (
				<li className="list-group-item"><a href={link.url}>{link.title}</a></li>
			)
		});

		return <ul className="list-group">{linksRows}</ul>
	},	

	getLinks : function() {

		var links = new LinksCollection();

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
		setInterval(this.getLinks, this.props.pollInterval);
	},

	componentDidMount: function() {
		var Router = Backbone.Router.extend({
			routes : {
				"delete_link/:id" : "deleteLink"
			},
			initialize : function() {
				console.log("Initialize router of LinkList component");
			},
			deleteLink : function(id){
				console.log("=== delete link ===", id);
				new LinkModel({_id:id}).destroy();
				this.navigate('/');
			}
		});
		this.router = new Router()
	}

});

module.exports = LinkList;
