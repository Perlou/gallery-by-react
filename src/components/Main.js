/**
 * @author Perlou
 * @Main.js
 * @return Gallery
 */

'use strict';

require('styles/App.css');

import React from 'react';
import ImgFigure from './ImgFigure';
import ControllerUnits from './ControllerUnits';

/**
 * Func 获取随机数	
 * @params {number} low, high
 * @return {number} 
 */
function getRangeRandom(low, high) {
    return Math.ceil(Math.random() * (high - low) + low);
}

/**
 * Func 获取 0~30° 之间的一个任意正负值	
 * @return {number} 
 */
function get30DegRandom() {
  return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

// 引入图片信息
var imageDatas = require('../stores/imagesDatas.json');

// 利用自执行函数， 将图片名信息转成图片URL路径信息
imageDatas = (function genImageURL(imageDatasArr) {
    for (var i = 0, j = imageDatasArr.length; i < j; i++) {
        var singleImageData = imageDatasArr[i];

        singleImageData.imageURL = require('../images/' + singleImageData.fileName);

        imageDatasArr[i] = singleImageData;
    }

    return imageDatasArr;
})(imageDatas);

// 构造画廊组件
var Gallery = React.createClass({

	Constant: {
		centerPos: {
			left: 0,
			right: 0
		},
		hPosRange: {
			leftSecX: [0,0],
			rightSecX: [0,0],
			y: [0,0]
		},
		vPosRange: {
			x: [0,0],
			topY: [0,0]
		}
	},

	/**
	 * 翻转图片
	 * @param index
	 * @return {Func}
	 */
	inverse: function(index){
		return function(){

			var imgsArrangeArr = this.state.imgsArrangeArr;
			imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

			this.setState({
				imgsArrangeArr: imgsArrangeArr
			})

		}.bind(this);
	},

	/**
	 * 居中点击图片
	 * @param index
	 * @return {Func}
	 */
	center: function(index){
		return function(){
			this.rearrange(index);
		}.bind(this);
	},

	/**
	 * 重新布局所有图片
	 * @param centerIndex 指定居中排布哪个图片
	 */
	rearrange: function(centerIndex){

	    var imgsArrangeArr = this.state.imgsArrangeArr,
	        Constant = this.Constant,
	        centerPos = Constant.centerPos,
	        hPosRange = Constant.hPosRange,
	        vPosRange = Constant.vPosRange,
	        hPosRangeLeftSecX = hPosRange.leftSecX,
	        hPosRangeRightSecX = hPosRange.rightSecX,
	        hPosRangeY = hPosRange.y,
	        vPosRangeTopY = vPosRange.topY,
	        vPosRangeX = vPosRange.x,

	        imgsArrangeTopArr = [],
	        topImgNum = Math.floor(Math.random() * 2),    // 取一个或者不取
	        topImgSpliceIndex = 0,

	        imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
          pos: centerPos,
          rotate: 0,
          isCenter: true
        };

        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
              pos: {
                  top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                  left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };
        });

        // 布局左右两侧的图片
        for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            var hPosRangeLORX = null;

            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
              pos: {
                  top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                  left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
              },
              rotate: get30DegRandom(),
              isCenter: false
            };

        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });

	},

	getInitialState: function(){
		return {
			imgsArrangeArr: [
				/*{ 
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}*/
			]
		};
	},

	componentDidMount: function(){
	    // 首先拿到舞台的大小
	    var stageDOM = this.refs.stage,
	        stageW = stageDOM.scrollWidth,
	        stageH = stageDOM.scrollHeight,
	        halfStageW = Math.ceil(stageW / 2),
	        halfStageH = Math.ceil(stageH / 2);

	    // 拿到一个imageFigure的大小
	    var imgFigureDOM = this.refs.imgFigure1,
	    	imgW = 320,
	    	imgH = 320,
	    	halfImgW = 160,
	    	halfImgH = 160;

	        // imgW = imgFigureDOM.scrollWidth,
	        // imgH = imgFigureDOM.scrollHeight,
	        // halfImgW = Math.ceil(imgW / 2),
	        // halfImgH = Math.ceil(imgH / 2);

	    // 计算中心图片的位置点
	    this.Constant.centerPos = {
	        left: halfStageW - halfImgW,
	        top: halfStageH - halfImgH
	    };

	    // 计算左侧，右侧区域图片排布位置的取值范围
	    this.Constant.hPosRange.leftSecX[0] = -halfImgW;
	    this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
	    this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
	    this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
	    this.Constant.hPosRange.y[0] = -halfImgH;
	    this.Constant.hPosRange.y[1] = stageH - halfImgH;

	    // 计算上侧区域图片排布位置的取值范围
	    this.Constant.vPosRange.topY[0] = -halfImgH;
	    this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
	    this.Constant.vPosRange.x[0] = halfStageW - imgW;
	    this.Constant.vPosRange.x[1] = halfStageW;

	    this.rearrange(0);

	},

	render: function(){

		var controllerUnits = [],
			imgFigures = [];

		imageDatas.forEach(function(item,index){

			if(!this.state.imgsArrangeArr[index]){
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					},
					rotate: 0,
					isInverse: false,
					isCenter: false
				}
			}

			imgFigures.push(
				<ImgFigure 
					key={index} 
					data={item} 
					ref={'imgFigure' + index} 
					arrange={this.state.imgsArrangeArr[index]}
					inverse={this.inverse(index)}
					center={this.center(index)} />
			);

			controllerUnits.push(
				<ControllerUnits
				 	key={index}
					arrange={this.state.imgsArrangeArr[index]}
					inverse={this.inverse(index)}
					center={this.center(index)} />
			);

		}.bind(this));

		return (
			<section className="stage" ref="stage">

				<section className="img-sec">
					{imgFigures}
				</section>

				<nav className="controller-nav">
					{controllerUnits}
				</nav>

			</section>
		);
	}
});

module.exports = Gallery;