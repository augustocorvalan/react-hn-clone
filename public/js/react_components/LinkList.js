/** @jsx React.DOM */

/*
	var LinkList = require('../react_components/LinkList'); 
	React.renderComponent(
		<LinkList pollInterval={500}/>,
		document.querySelector('LinkList')
	);
*/

var React = require('react')
	, _ = require('underscore')
	, VoteLink = require('./VoteLink');

var LinkList = React.createClass({

	render: function() {
		var self = this;
		var linksRows = this.props.links.map(function(link, i){
			return (
				<li className="list-group-item" key={i}>
					<a href={link.url}>{link.title}</a>
					<div className="pull-right">
						<VoteLink action="up" id={link._id} voteNumber={link.votesUp} glyphClass="thumbs-up" clicked={self.isClicked(link._id, 'up')}/>
						<VoteLink action="down" id={link._id} voteNumber={link.votesDown} glyphClass="thumbs-down" clicked={self.isClicked(link._id, 'down')}/>
					</div>
				</li>
			)
		});

		return <ul className="list-group">{linksRows}</ul>
	},	

	isClicked: function (id, action) {
		return localStorage.getItem('v' + id) === action;
	}

});

module.exports = LinkList;
