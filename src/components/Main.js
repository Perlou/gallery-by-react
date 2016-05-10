require('normalize.css/normalize.css');
require('styles/App.css');

import React from 'react';

// 引入图片信息
var imagesDates = require('../stores/imagesDates.json');

/**
 * @return {Array}
 */
imagesDates = (function genImageUrl(imageDatasArr){

	for(var i = 0, j = imageDatasArr.length; i < j; i++){
		var singleImageDate = imageDatasArr[i];

		singleImageDate.imageUrl = require('../images/' + singleImageDate.fileName);
		imageDatasArr[i] = singleImageDate;

	}

	return imageDatasArr;

})(imagesDates);

var Gallery = React.createClass({
	render: function(){
		return (
			<section className="stage">

				<section className="img-sec">

				</section>

				<nav className="controller-nav">

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
