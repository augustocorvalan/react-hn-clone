/** @jsx React.DOM */

/*
	var LinkForm = require('../react_components/LinkForm'); 
	React.renderComponent(
		<LinkForm/>,
		document.querySelector('LinkForm')
	);
*/

var React = require('react')
	, LinkModel = require("../modules/models/LinkModel");

var LinkForm = React.createClass({

	render: function() {
		return (
			<form role="form" className="form-horizontal" onSubmit={this.handleSubmit}>
				<div className="form-group">
						<input className="form-control" type="text" placeholder="title" ref="title"/>
				</div>
				<div className="form-group">
						<input className="form-control" type="text" placeholder="url" ref="url"/>
				</div>
				<div className="form-group hidden">
						<input className="form-control" type="text" placeholder="votesUp" ref="votesUp"/>
				</div>
				<div className="form-group hidden">
						<input className="form-control" type="text" placeholder="votesDown" ref="votesDown"/>
				</div>
				
				<div className="form-group">
					<input className="btn btn-primary" type="submit" value="Add Link" />
				</div>
			</form>
		);
	},

	componentDidMount: function() {},
	componentWillMount: function() {},
	handleSubmit : function() {
		var title = this.refs.title.getDOMNode().value.trim();
		var url = this.refs.url.getDOMNode().value.trim();
		var votesUp = this.refs.votesUp.getDOMNode().value.trim() || 0;
		var votesDown = this.refs.votesDown.getDOMNode().value.trim() || 0;
		
		if (!title) {return false;}
		if (!url) {return false;}
		
		var data = {};
		data.title = title;
		data.url = url;
		data.votesUp = votesUp;
		data.votesDown = votesDown;
		

		var link = new LinkModel(data);

		link.save()
			.done(function(data) {
				this.refs.title.getDOMNode().value = '';
				this.refs.url.getDOMNode().value = '';
				this.refs.votesUp.getDOMNode().value = '';
				this.refs.votesDown.getDOMNode().value = '';
				
				this.refs.title.getDOMNode().focus();

				this.props.onFormSubmit(link);
			}.bind(this))
			.fail(function(err) {
			}.bind(this));

		return false;
	}

});

module.exports = LinkForm;
