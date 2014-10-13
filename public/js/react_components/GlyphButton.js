/** @jsx React.DOM */

/*
	var GlyphButton = require('../react_components/GlyphButton'); 
	React.renderComponent(
		<GlyphButton/>,
		document.querySelector('GlyphButton')
	);
*/

var React = require('react')

var GlyphButton = React.createClass({
	render: function() {
		var cx = React.addons.classSet;
		var glyphClasses = {
			glyphicon: true
		};
		var buttonClasses = {
			"btn": true,
			"btn-default": true,
			"active": this.props.active
		}

		glyphClasses['glyphicon-' + this.props.glyphClass] = true;

		return (
		    <button type="button" className={cx(buttonClasses)} onClick={this.props.handleClick}>
		   		<span className={cx(glyphClasses)}></span>
	   		</button>
		);
	}
});

module.exports = GlyphButton;
