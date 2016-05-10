/**
 * @author Perlou
 * @Main.js
 * @return Gallery
 */
 
require('styles/App.css');

import React from 'react';

// 引入图片信息
var imagesDatas = require('../stores/imagesDatas.json');

/**
 * @return {Array}
 */
// imagesDatas = (function genImageUrl(imageDatasArr){

// 	for(var i = 0, j = imageDatasArr.length; i < j; i++){
// 		var singleImageData = imageDatasArr[i];

// 		singleImageData.imageUrl = require('../images/' + singleImageData.fileName);
// 		imageDatasArr[i] = singleImageData;

// 	}

// 	return imageDatasArr;

// })(imagesDatas);

var Gallery = React.createClass({
	render: function(){
		return (
			<section className="stage">

				<section className="img-sec">
					img
				</section>

				<nav className="controller-nav">
					nav
				</nav>

			</section>
		);
	}
});

module.exports = Gallery;

// let yeomanImage = require('../images/yeoman.png');

// class AppComponent extends React.Component {
//   render() {
//     return (
//       <div className="index">
//         <img src={yeomanImage} alt="Yeoman Generator" />
//         <div className="notice">Please edit <code>src/components/Main.js</code> to get started!</div>
//       </div>
//     );
//   }
// }

// AppComponent.defaultProps = {
// };

// export default AppComponent;
