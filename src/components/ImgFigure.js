/**
 * @author Perlou
 * @ImgFigure.js
 * @return ImgFigure
 */

'use strict';

import React from 'react';


var ImgFigure = React.createClass({

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

		var styleObj = {};

		if(this.props.arrange.pos){
			styleObj = this.props.arrange.pos;
		}

		if(this.props.arrange.rotate){
			(['Moz','ms','Webkit','']).forEach(function(value){
				styleObj[value + 'Transform'] = 'rotate(' + this.props.arrange.rotate + 'deg)';
			}.bind(this));
		}

		if(this.props.arrange.isCenter){
			styleObj.zIndex = 11;
			styleObj.backgroundColor = '#f2f2f2';
			(['Moz','ms','Webkit','']).forEach(function(value){
				styleObj[value + 'BoxShadow'] = '0 0 20px #ccc';
			}.bind(this));
		}

		var imgFigureClassName = 'img-figure';
		imgFigureClassName += this.props.arrange.isInverse ? ' is-inverse' : '';

		return (
			<figure className={imgFigureClassName} style={styleObj} onClick={this.handleClick}>
				<img 	
					src={this.props.data.imageURL}
					alt={this.props.data.title} />
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
					<div className="img-back" onClick={this.handleClick}>
						<p>
							{this.props.data.desc}
						</p>
					</div>
				</figcaption>
			</figure>
		);
	}

});

module.exports = ImgFigure;
