"use strict";var _createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var TransitionManager=function(){function e(){_classCallCheck(this,e),this.level=3,this.startContainer=document.querySelector(".startSettingsContainer"),this.gameContainer=document.querySelector(".gameContainer"),this.gameBoard=document.querySelector(".gameBoard"),this.gameMenu=document.querySelector(".gameMenu"),this.orientation="landscape"}return _createClass(e,[{key:"setLevel",value:function(e){this.level=e}},{key:"setOrientation",value:function(){var i=this;return new Promise(function(e,t){window.innerWidth>window.innerHeight?i.orientation="landscape":i.orientation="portrait",e()})}},{key:"hideStartMenu",value:function(){var i=this;return new Promise(function(e,t){i.startContainer.classList.add("fadeIn"),setTimeout(function(){i.startContainer.style.display="none",i.startContainer.classList.remove("fadeIn")},490),e()})}},{key:"showStartMenu",value:function(){return new Promise(function(e,t){})}},{key:"setSize",value:function(e){this.gameBoard.style.width=e.boardWidth+"px",this.gameBoard.style.height=e.boardWidth+"px",this.gameBoard.style.marginRight=e.margin+"px",this.gameMenu.style.width=e.menuWidth+"px",this.gameMenu.style.height=e.menuHeigth+"px"}},{key:"setElementsSize",value:function(){var o=this;return new Promise(function(e,t){var i=window.innerWidth,n=window.innerHeight,r=Number.parseInt(.55*i),s=Number.parseInt(.05*i),a=Number.parseInt(.25*i),u=Number.parseInt(.8*n);"landscape"===o.orientation&&(u=(r=Number.parseInt(.8*n)<r?Number.parseInt(.8*n):r)<u?r:u,o.setSize({boardWidth:r,margin:s,menuWidth:a,menuHeigth:u})),e()})}},{key:"setElementsPosition",value:function(){return new Promise(function(e,t){console.log("ustawianie pozycji tablicy"),e()})}},{key:"showGame",value:function(){var i=this;return new Promise(function(e,t){setTimeout(function(){i.gameContainer.style.display="flex"},1e3),e()})}},{key:"startGame",value:function(e){var t=this;this.setLevel(e),this.setOrientation().then(function(){return t.hideStartMenu()}).then(function(){return t.setElementsSize()}).then(function(){return t.setElementsPosition()}).then(function(){return t.showGame()}).catch(function(e){console.log("bład")})}},{key:"endGame",value:function(){}}]),e}();_createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var SquaresAnimationManager=function(){function t(e){_classCallCheck(this,t),this.width=e.clientWidth,this.height=e.clientHeight,this.container=e,this.container.width=this.width,this.container.height=this.height,this.squares=[],this.squaresNumber=0,this.containerGraphicContext=this.container.getContext("2d"),this.draw=this.draw.bind(this),this.colors=[[246,114,128],[192,108,132],[53,92,125],[69,173,168],[153,184,152],[255,255,255],[253,253,150]]}return _createClass(t,[{key:"setWidth",value:function(e){this.width=e}},{key:"setHeight",value:function(e){this.height=e}},{key:"getWidth",value:function(){return this.width}},{key:"getHeight",value:function(){return this.height}},{key:"drawTheColor",value:function(){return this.colors[Math.floor(7*Math.random())]}},{key:"createSquare",value:function(){var e={actualAngle:1,velocity:1*Math.random()+.01,rotationSpeed:Number.parseFloat(.01*Math.random()).toFixed(3),width:Number.parseInt(80*Math.random()),x:Math.random()*this.getWidth()+1,y:this.getHeight(),opacity:.2*Math.random(),color:this.drawTheColor()};return 0==Number.parseFloat(e.rotationSpeed)&&(e.rotationSpeed=Number.parseFloat(.01)),e}},{key:"fillSquaresArray",value:function(){var e=[];this.squaresNumber=Number.parseInt(this.getWidth()/100),this.squaresNumber<4&&(this.squaresNumber=4);for(var t=0;t<this.squaresNumber;t++)e[t]=this.createSquare();this.squares=e}},{key:"clearElement",value:function(){this.containerGraphicContext.clearRect(0,0,this.getWidth(),this.getHeight()),this.containerGraphicContext.beginPath()}},{key:"updateSquaresPosition",value:function(){this.squares=this.squares.map(function(e){return e.y-=e.velocity,e})}},{key:"updateSquaresRotationAngle",value:function(){this.squares=this.squares.map(function(e){return 359<=Number.parseFloat(e.actualAngle)?e.actualAngle=1:e.actualAngle=Number.parseFloat(e.actualAngle)+Number.parseFloat(e.rotationSpeed),e})}},{key:"updateSquaresNumber",value:function(){for(var e=this.squares.filter(function(e){return 1<e.y+2*e.width}),t=this.squaresNumber-e.length,i=0;i<t;i++)e.push(this.createSquare());this.squares=e}},{key:"drawSquares",value:function(){for(var e=0;e<this.squares.length;e++)this.containerGraphicContext.save(),this.containerGraphicContext.beginPath(),this.containerGraphicContext.translate(this.squares[e].x+this.squares[e].width,this.squares[e].y+this.squares[e].width),this.containerGraphicContext.rotate(this.squares[e].actualAngle+Math.PI/180),this.containerGraphicContext.translate(-1*this.squares[e].width,-1*this.squares[e].width),this.containerGraphicContext.rect(this.squares[e].width/2,this.squares[e].width/2,this.squares[e].width,this.squares[e].width),this.containerGraphicContext.fillStyle="rgba("+this.squares[e].color[0]+","+this.squares[e].color[1]+","+this.squares[e].color[2]+","+this.squares[e].opacity+")",this.containerGraphicContext.fill(),this.containerGraphicContext.restore()}},{key:"draw",value:function(){this.clearElement(),this.drawSquares(),this.updateSquaresPosition(),this.updateSquaresRotationAngle(),this.updateSquaresNumber(),window.requestAnimationFrame(this.draw)}},{key:"setResizeEvent",value:function(){var e=this,t=void 0;window.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(function(){e.clearElement(),e.setHeight(e.container.clientHeight),e.setWidth(e.container.clientWidth),e.container.width=e.width,e.container.height=e.height,e.fillSquaresArray()},200)})}},{key:"startAnimation",value:function(){this.fillSquaresArray(),this.setResizeEvent(),window.requestAnimationFrame(this.draw)}}]),t}();_createClass=function(){function n(e,t){for(var i=0;i<t.length;i++){var n=t[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(e,t,i){return t&&n(e.prototype,t),i&&n(e,i),e}}();function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var StartMenuManager=function(){function t(e){_classCallCheck(this,t),this.transitionManager=e,this.sliderContainer=document.querySelector(".sliderContainer"),this.startButton=document.querySelector("#startButton"),this.sliderThumb=document.querySelector(".sliderThumb"),this.sliderThumbX=this.sliderThumb.getBoundingClientRect().x,this.sliderTrack=document.querySelector(".sliderTrack"),this.sliderShiftedTrack=document.querySelector(".sliderShiftedTrack"),this.label=document.querySelector(".startSettingsContainer :nth-child(3)"),this.level=3,this.endThumbDrag=this.endThumbDrag.bind(this),this.thumbDrag=this.thumbDrag.bind(this),this.resetSliderAndLevel=this.resetSliderAndLevel.bind(this)}return _createClass(t,[{key:"setLevel",value:function(e){this.level=e}},{key:"getLevel",value:function(){return this.level}},{key:"setLabelText",value:function(e){this.label.innerHTML="Poziom: &nbsp; "+e}},{key:"resetSliderTransformations",value:function(){this.sliderThumb.style.webkitTransform="translate(0px,0)"}},{key:"resetTrackSliderWidth",value:function(){this.sliderShiftedTrack.style.width="30%"}},{key:"resetLevel",value:function(){this.setLevel(3),this.setLabelText(3)}},{key:"resetSliderAndLevel",value:function(){this.sliderThumbX=this.sliderThumb.getBoundingClientRect().x,this.resetSliderTransformations(),this.resetTrackSliderWidth(),this.resetLevel()}},{key:"calculateLevel",value:function(){var e=this.sliderTrack.getBoundingClientRect().width,t=this.sliderThumb.getBoundingClientRect().x-this.sliderTrack.getBoundingClientRect().x,i=Number.parseInt(t/(e/10)+1);return i<=0?1:11<=i?10:i}},{key:"thumbDrag",value:function(e){e.clientX>this.sliderTrack.getBoundingClientRect().x&&e.clientX<this.sliderTrack.getBoundingClientRect().right?(this.sliderThumb.style.webkitTransform="translate("+-1*(this.sliderThumbX-e.clientX)+"px,0)",this.sliderShiftedTrack.style.width=-1*(this.sliderTrack.getBoundingClientRect().x-e.clientX)+"px",this.setLevel(this.calculateLevel())):this.sliderThumb.getBoundingClientRect().x<this.sliderTrack.getBoundingClientRect().x||e.clientX<this.sliderTrack.getBoundingClientRect().x?(this.sliderThumb.style.webkitTransform="translate("+-1*(this.sliderThumbX-this.sliderTrack.getBoundingClientRect().x)+"px,0)",this.setLevel(1)):(this.sliderThumb.getBoundingClientRect().x>this.sliderTrack.getBoundingClientRect().x+this.sliderTrack.getBoundingClientRect().width||e.clientX>this.sliderTrack.getBoundingClientRect().x+this.sliderTrack.getBoundingClientRect().width)&&(this.sliderThumb.style.webkitTransform="translate("+(this.sliderTrack.getBoundingClientRect().right-this.sliderThumbX)+"px,0)",this.setLevel(10)),this.setLabelText(this.getLevel())}},{key:"endThumbDrag",value:function(){document.removeEventListener("mouseup",this.endThumbDrag),document.removeEventListener("mousemove",this.thumbDrag)}},{key:"sliderThumbDragEvent",value:function(){var t=this;this.sliderThumb.addEventListener("mousedown",function(e){document.addEventListener("mouseup",t.endThumbDrag),document.addEventListener("mousemove",t.thumbDrag)})}},{key:"startButtonEvent",value:function(){var e=this;this.startButton.addEventListener("click",function(){e.transitionManager.startGame(e.getLevel())})}},{key:"resizeWindowEvent",value:function(){window.addEventListener("resize",this.resetSliderAndLevel)}},{key:"sliderTrackClickEvent",value:function(){this.sliderContainer.addEventListener("click",this.thumbDrag)}},{key:"setEvents",value:function(){this.startButtonEvent(),this.sliderTrackClickEvent(),this.sliderThumbDragEvent(),this.resizeWindowEvent()}}]),t}(),backGroundAnimation=new SquaresAnimationManager(document.querySelector(".backgorundCanvas")),transitionManager=new TransitionManager,startMenuEvents=new StartMenuManager(transitionManager),init=function(){backGroundAnimation.startAnimation(),startMenuEvents.setEvents()};init();