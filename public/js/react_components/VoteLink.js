/** @jsx React.DOM */

/*
	var VoteLink = require('../react_components/VoteLink'); 
	React.renderComponent(
		<VoteLink/>,
		document.querySelector('VoteLink')
	);
*/

var React = require('react/addons');

var VoteLink = React.createClass({
	render: function() {
		var href = ['#vote', this.props.action, this.props.id].join('/');
		var iconClasses = {
			glyphicon: true 
		};

		iconClasses['glyphicon-' + this.props.glyphClass] = true;

		return (
			<a href={href}>
				{this.props.voteNumber} <span className={React.addons.classSet(iconClasses)}></span>
			</a>
		);
	}
});

module.exports = VoteLink;
