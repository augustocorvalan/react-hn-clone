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
		var cx = React.addons.classSet;
		var iconClasses = {
			glyphicon: true,
			success: this.props.clicked
		};

		var linkClasses = {
			"vote-link": true,
			"success": this.props.clicked
		};

		iconClasses['glyphicon-' + this.props.glyphClass] = true;
		linkClasses['vote-link-' + this.props.action] = true;

		return (
			<a href={href} className={cx(linkClasses)}>
				<span className="vote-link-number">{this.props.voteNumber}</span> <span className={cx(iconClasses)}></span>
			</a>
		);
	}
});

module.exports = VoteLink;
