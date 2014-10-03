/** @jsx React.DOM */

/*
	var LinkTable = require('../react_components/LinkTable'); 
	React.renderComponent(
		<LinkTable pollInterval={500}/>,
		document.querySelector('LinkTable')
	);
*/

var React = require('react')
	, Backbone = require("backbone")
	, LinkModel = require("../modules/models/LinkModel")
	, LinksCollection = require("../modules/models/LinksCollection");

var LinkTable = React.createClass({

	getInitialState: function() {
		return {data : [], message : ""};
	},

	render: function() {

		var linksRows = this.state.data.map(function(link){
			var deleteLink = "#delete_link/" + link._id;

			return (
				<tr>
					<td>{link.title}</td>
					<td>{link.url}</td>
					<td>{link.votesUp}</td>
					<td>{link.votesDown}</td>
					
					<td><a href={deleteLink}>delete{" "}{link._id}</a></td>
				</tr>
			);
		});

		return (
			<div className="table-responsive">
				<strong>{this.state.message}</strong>
				<table className="table table-striped table-bordered table-hover" >
					<thead>
						<tr>
							<th>title</th><th>url</th><th>votesUp</th><th>votesDown</th>
							<th>_id</th>
						</tr>
					</thead>
					<tbody>
						{linksRows}
					</tbody>
				</table>
			</div>
		);
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
				console.log("Initialize router of LinkTable component");
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

module.exports = LinkTable;
