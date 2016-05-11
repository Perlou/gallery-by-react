/**
 * @author Perlou
 * @ControllerUnits.js
 * @return ControllerUnits
 */

'use strict';

import React from 'react';

//nav 按钮
var ControllerUnits = React.createClass({

	handleClick: function(ev){

		if(this.props.arrange.isCenter){
			this.props.inverse();
		}else{
			this.props.center();
		}

		ev.stopPropagation();
		ev.preventDefault();

	},

	render: function(){

		var controllerUnitClassName = "controller-unit";

		if(this.props.arrange.isCenter){

			controllerUnitClassName += ' is-center-unit';

			if(this.props.arrange.isInverse){
				controllerUnitClassName += ' is-inverse-unit';
			}

		}

		return (
			<span
				className={controllerUnitClassName} 
				onClick={this.handleClick}></span>
		);

	}

});

module.exports = ControllerUnits;
