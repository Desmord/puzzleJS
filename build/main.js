"use strict";var _createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var TransitionManager=function(){function e(){_classCallCheck(this,e),this.level=3,this.startContainer=document.querySelector(".startSettingsContainer"),this.gameContainer=document.querySelector(".gameContainer"),this.gameBoard=document.querySelector(".gameBoard"),this.gameMenu=document.querySelector(".gameMenu"),this.orientation="landscape",this.menuManager=null,this.gameManager=null}return _createClass(e,[{key:"setGameManager",value:function(e){this.gameManager=e}},{key:"setMenuManager",value:function(e){this.menuManager=e}},{key:"setLevel",value:function(e){this.level=e}},{key:"setOrientation",value:function(){var n=this;return new Promise(function(e,t){window.innerWidth>window.innerHeight?n.orientation="landscape":n.orientation="portrait",e()})}},{key:"hideStartMenu",value:function(){var n=this;return new Promise(function(e,t){n.startContainer.classList.add("fadeOut"),setTimeout(function(){n.startContainer.style.display="none",n.startContainer.classList.remove("fadeOut")},490),e()})}},{key:"showStartMenu",value:function(){var n=this;return new Promise(function(e,t){setTimeout(function(){n.startContainer.style.display="block",n.startContainer.classList.add("fadeIn")},600),setTimeout(function(){n.startContainer.classList.remove("fadeIn")},1200),e()})}},{key:"setSize",value:function(e){this.gameBoard.style.width=e.boardWidth+"px",this.gameBoard.style.height=e.boardWidth+"px",e.marginRight?(this.gameBoard.style.marginRight=e.marginRight+"px",this.gameBoard.style.marginBottom="0px"):(this.gameBoard.style.marginBottom=e.marginBottom+"px",this.gameBoard.style.marginRight="0px"),this.gameMenu.style.width=e.menuWidth+"px",this.gameMenu.style.height=e.menuHeigth+"px"}},{key:"setElementsSize",value:function(){var d=this;return new Promise(function(e,t){var n=window.innerWidth,i=window.innerHeight;if("landscape"===d.orientation){var a=Number.parseInt(.55*n),r=Number.parseInt(.05*n),s=Number.parseInt(.25*n),o=Number.parseInt(.8*i);o=(a=Number.parseInt(.8*i)<a?Number.parseInt(.8*i):a)<o?a:o,d.setSize({boardWidth:a,marginRight:r,marginBottom:0,menuWidth:s,menuHeigth:o})}else{var u=Number.parseInt(.05*i),l=Number.parseInt(.55*i),h=Number.parseInt(.2*i),c=Number.parseInt(.8*n);l=l>Number.parseInt(.9*n)?Number.parseInt(.9*n):l,d.setSize({boardWidth:l,marginRight:0,marginBottom:u,menuWidth:c,menuHeigth:h})}e()})}},{key:"showGame",value:function(){var n=this;return new Promise(function(e,t){setTimeout(function(){n.gameContainer.style.display="flex",n.gameContainer.classList.add("fadeIn")},600),setTimeout(function(){n.gameContainer.classList.remove("fadeIn")},1200),e()})}},{key:"hideGame",value:function(){var n=this;return new Promise(function(e,t){n.gameContainer.classList.add("fadeOut"),setTimeout(function(){n.gameContainer.style.display="none",n.gameContainer.classList.remove("fadeOut")},490),e()})}},{key:"startGame",value:function(e){var t=this;this.setLevel(e),this.setOrientation().then(function(){return t.hideStartMenu()}).then(function(){return t.setElementsSize()}).then(function(){return t.showGame()}).then(function(){t.gameManager.setLevel(t.level),t.gameManager.init()}).catch(function(e){console.log("bład")})}},{key:"endGame",value:function(){var e=this;this.hideGame().then(function(){return e.showStartMenu()})}}]),e}();_createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var GameManager=function(){function t(e){_classCallCheck(this,t),this.transitionManager=transitionManager,this.gameBoard=document.querySelector(".gameBoard"),this.image=new Image,this.gameCellArray=[],this.gameCellWidth=0,this.level=3}return _createClass(t,[{key:"setLevel",value:function(e){this.level=e}},{key:"setGameCellWidth",value:function(e){this.gameCellWidth=e}},{key:"setCloseEvent",value:function(){var e=this;document.querySelector("#endGame").addEventListener("click",function(){e.transitionManager.endGame()})}},{key:"hoverEvents",value:function(){var e=document.querySelector(".menuButtons");e.addEventListener("mouseover",function(e){var t=document.querySelector(".tooltip");"endGame"===e.target.id?(t.innerHTML=e.target.getAttribute("data-tooltip"),t.style.opacity="0.7"):"start"===e.target.id?(t.innerHTML=e.target.getAttribute("data-tooltip"),t.style.opacity="0.7"):"pause"===e.target.id&&(t.innerHTML=e.target.getAttribute("data-tooltip"),t.style.opacity="0.7")}),e.addEventListener("mouseleave",function(){document.querySelector(".tooltip").style.opacity="0"})}},{key:"removeBoard",value:function(){var n=this;return new Promise(function(e,t){for(;n.gameBoard.firstChild;)n.gameBoard.removeChild(n.gameBoard.firstChild);e()})}},{key:"loadNewImage",value:function(){this.removeBoard(),this.image.src="https://source.unsplash.com/random/"+this.gameBoard.clientWidth+"x"+this.gameBoard.clientWidth+"#"+(new Date).getTime()}},{key:"createEmptyBoard",value:function(){var s=this;return new Promise(function(e,t){var n=Number.parseInt((s.gameBoard.clientWidth-2*s.level)/s.level);s.setGameCellWidth(n);for(var i=0;i<s.level;i++)for(var a=0;a<s.level;a++){var r=document.createElement("div");r.style.width=n+"px",r.style.height=n+"px",r.style.marginLeft="2px",r.style.marginTop="2px",r.classList.add("gameCell"),s.gameBoard.appendChild(r)}e()})}},{key:"getImagePortion",value:function(e,t,n,i){var a=document.createElement("canvas"),r=a.getContext("2d");a.width=t,a.height=t;var s=document.createElement("canvas"),o=s.getContext("2d");return s.width=e.width,s.height=e.height,o.drawImage(e,0,0),r.drawImage(s,n,i,t,t,0,0,t,t),a}},{key:"createGameCellArray",value:function(){var h=this;return new Promise(function(e,t){for(var n=[].concat(_toConsumableArray(document.querySelectorAll(".gameCell"))),i=n[0].parentNode.offsetLeft,a=n[0].parentNode.offsetTop,r=0,s=0;s<h.level;s++)for(var o=0;o<h.level;o++){var u=n[r].offsetLeft-i,l=n[r].offsetTop-a;h.gameCellArray.push({x:n[r].offsetLeft,maxX:n[r].offsetLeft+h.gameCellWidth,y:n[r].offsetTop,maxY:n[r].offsetTop+h.gameCellWidth,order:r,img:h.getImagePortion(h.image,h.gameCellWidth,u,l)}),r++}e()})}},{key:"shuffleCellsArray",value:function(){var r=this;return new Promise(function(e,t){for(var n=r.gameCellArray.length;0<n;){var i=Math.floor(Math.random()*n);n--;var a=r.gameCellArray[n];r.gameCellArray[n]=r.gameCellArray[i],r.gameCellArray[i]=a}console.log(r.gameCellArray),e()})}},{key:"loadGame",value:function(){var e=this;this.removeBoard().then(function(){return e.createEmptyBoard()}).then(function(){return e.createGameCellArray()}).then(function(){return e.shuffleCellsArray()}).catch(function(e){console.log(e)})}},{key:"setEvents",value:function(){this.setCloseEvent(),this.hoverEvents(),this.image.addEventListener("load",this.loadGame.bind(this),!1)}},{key:"init",value:function(){var e=this;setTimeout(function(){e.loadNewImage()},600)}}]),t}();_createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var SquaresAnimationManager=function(){function t(e){_classCallCheck(this,t),this.width=e.clientWidth,this.height=e.clientHeight,this.container=e,this.container.width=this.width,this.container.height=this.height,this.squares=[],this.squaresNumber=0,this.containerGraphicContext=this.container.getContext("2d"),this.draw=this.draw.bind(this),this.colors=[[246,114,128],[192,108,132],[53,92,125],[69,173,168],[153,184,152],[255,255,255],[253,253,150]]}return _createClass(t,[{key:"setWidth",value:function(e){this.width=e}},{key:"setHeight",value:function(e){this.height=e}},{key:"getWidth",value:function(){return this.width}},{key:"getHeight",value:function(){return this.height}},{key:"drawTheColor",value:function(){return this.colors[Math.floor(7*Math.random())]}},{key:"createSquare",value:function(){var e={actualAngle:1,velocity:1*Math.random()+.01,rotationSpeed:Number.parseFloat(.01*Math.random()).toFixed(3),width:Number.parseInt(80*Math.random()),x:Math.random()*this.getWidth()+1,y:this.getHeight(),opacity:.2*Math.random(),color:this.drawTheColor()};return 0==Number.parseFloat(e.rotationSpeed)&&(e.rotationSpeed=Number.parseFloat(.01)),e}},{key:"fillSquaresArray",value:function(){var e=[];this.squaresNumber=Number.parseInt(this.getWidth()/100),this.squaresNumber<4&&(this.squaresNumber=4);for(var t=0;t<this.squaresNumber;t++)e[t]=this.createSquare();this.squares=e}},{key:"clearElement",value:function(){this.containerGraphicContext.clearRect(0,0,this.getWidth(),this.getHeight()),this.containerGraphicContext.beginPath()}},{key:"updateSquaresPosition",value:function(){this.squares=this.squares.map(function(e){return e.y-=e.velocity,e})}},{key:"updateSquaresRotationAngle",value:function(){this.squares=this.squares.map(function(e){return 359<=Number.parseFloat(e.actualAngle)?e.actualAngle=1:e.actualAngle=Number.parseFloat(e.actualAngle)+Number.parseFloat(e.rotationSpeed),e})}},{key:"updateSquaresNumber",value:function(){for(var e=this.squares.filter(function(e){return 1<e.y+2*e.width}),t=this.squaresNumber-e.length,n=0;n<t;n++)e.push(this.createSquare());this.squares=e}},{key:"drawSquares",value:function(){for(var e=0;e<this.squares.length;e++)this.containerGraphicContext.save(),this.containerGraphicContext.beginPath(),this.containerGraphicContext.translate(this.squares[e].x+this.squares[e].width,this.squares[e].y+this.squares[e].width),this.containerGraphicContext.rotate(this.squares[e].actualAngle+Math.PI/180),this.containerGraphicContext.translate(-1*this.squares[e].width,-1*this.squares[e].width),this.containerGraphicContext.rect(this.squares[e].width/2,this.squares[e].width/2,this.squares[e].width,this.squares[e].width),this.containerGraphicContext.fillStyle="rgba("+this.squares[e].color[0]+","+this.squares[e].color[1]+","+this.squares[e].color[2]+","+this.squares[e].opacity+")",this.containerGraphicContext.fill(),this.containerGraphicContext.restore()}},{key:"draw",value:function(){this.clearElement(),this.drawSquares(),this.updateSquaresPosition(),this.updateSquaresRotationAngle(),this.updateSquaresNumber(),window.requestAnimationFrame(this.draw)}},{key:"setResizeEvent",value:function(){var e=this,t=void 0;window.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(function(){e.clearElement(),e.setHeight(e.container.clientHeight),e.setWidth(e.container.clientWidth),e.container.width=e.width,e.container.height=e.height,e.fillSquaresArray()},200)})}},{key:"startAnimation",value:function(){this.fillSquaresArray(),this.setResizeEvent(),window.requestAnimationFrame(this.draw)}}]),t}();_createClass=function(){function i(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(e,t,n){return t&&i(e.prototype,t),n&&i(e,n),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var StartMenuManager=function(){function t(e){_classCallCheck(this,t),this.transitionManager=e,this.sliderContainer=document.querySelector(".sliderContainer"),this.startButton=document.querySelector("#startButton"),this.sliderThumb=document.querySelector(".sliderThumb"),this.sliderThumbX=this.sliderThumb.getBoundingClientRect().x,this.sliderTrack=document.querySelector(".sliderTrack"),this.sliderShiftedTrack=document.querySelector(".sliderShiftedTrack"),this.label=document.querySelector(".startSettingsContainer :nth-child(3)"),this.level=3,this.endThumbDrag=this.endThumbDrag.bind(this),this.thumbDrag=this.thumbDrag.bind(this),this.resetSliderAndLevel=this.resetSliderAndLevel.bind(this)}return _createClass(t,[{key:"setLevel",value:function(e){this.level=e}},{key:"getLevel",value:function(){return this.level}},{key:"setLabelText",value:function(e){this.label.innerHTML="Poziom: &nbsp; "+e}},{key:"resetSliderTransformations",value:function(){this.sliderThumb.style.webkitTransform="translate(0px,0)"}},{key:"resetTrackSliderWidth",value:function(){this.sliderShiftedTrack.style.width="30%"}},{key:"resetLevel",value:function(){this.setLevel(3),this.setLabelText(3)}},{key:"resetSliderAndLevel",value:function(){this.sliderThumbX=this.sliderThumb.getBoundingClientRect().x,this.resetSliderTransformations(),this.resetTrackSliderWidth(),this.resetLevel()}},{key:"calculateLevel",value:function(){var e=this.sliderTrack.getBoundingClientRect().width,t=this.sliderThumb.getBoundingClientRect().x-this.sliderTrack.getBoundingClientRect().x,n=Number.parseInt(t/(e/10)+1);return n<=0?1:11<=n?10:n}},{key:"thumbDrag",value:function(e){e.clientX>this.sliderTrack.getBoundingClientRect().x&&e.clientX<this.sliderTrack.getBoundingClientRect().right?(this.sliderThumb.style.webkitTransform="translate("+-1*(this.sliderThumbX-e.clientX)+"px,0)",this.sliderShiftedTrack.style.width=-1*(this.sliderTrack.getBoundingClientRect().x-e.clientX)+"px",this.setLevel(this.calculateLevel())):this.sliderThumb.getBoundingClientRect().x<this.sliderTrack.getBoundingClientRect().x||e.clientX<this.sliderTrack.getBoundingClientRect().x?(this.sliderThumb.style.webkitTransform="translate("+-1*(this.sliderThumbX-this.sliderTrack.getBoundingClientRect().x)+"px,0)",this.setLevel(1)):(this.sliderThumb.getBoundingClientRect().x>this.sliderTrack.getBoundingClientRect().x+this.sliderTrack.getBoundingClientRect().width||e.clientX>this.sliderTrack.getBoundingClientRect().x+this.sliderTrack.getBoundingClientRect().width)&&(this.sliderThumb.style.webkitTransform="translate("+(this.sliderTrack.getBoundingClientRect().right-this.sliderThumbX)+"px,0)",this.setLevel(10)),this.setLabelText(this.getLevel())}},{key:"endThumbDrag",value:function(){document.removeEventListener("mouseup",this.endThumbDrag),document.removeEventListener("mousemove",this.thumbDrag)}},{key:"sliderThumbDragEvent",value:function(){var t=this;this.sliderThumb.addEventListener("mousedown",function(e){document.addEventListener("mouseup",t.endThumbDrag),document.addEventListener("mousemove",t.thumbDrag)})}},{key:"startButtonEvent",value:function(){var e=this;this.startButton.addEventListener("click",function(){e.transitionManager.startGame(e.getLevel())})}},{key:"resizeWindowEvent",value:function(){window.addEventListener("resize",this.resetSliderAndLevel)}},{key:"sliderTrackClickEvent",value:function(){this.sliderContainer.addEventListener("click",this.thumbDrag)}},{key:"setEvents",value:function(){this.startButtonEvent(),this.sliderTrackClickEvent(),this.sliderThumbDragEvent(),this.resizeWindowEvent()}}]),t}(),backGroundAnimation=new SquaresAnimationManager(document.querySelector(".backgorundCanvas")),transitionManager=new TransitionManager,startMenuManager=new StartMenuManager(transitionManager),gameManager=new GameManager(transitionManager),init=function(){backGroundAnimation.startAnimation(),startMenuManager.setEvents(),gameManager.setEvents(),transitionManager.setGameManager(gameManager),transitionManager.setMenuManager(startMenuManager)};init();