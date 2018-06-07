"use strict";var _createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var SquaresAnimationManager=function(){function e(t){_classCallCheck(this,e),this.width=t.clientWidth,this.height=t.clientHeight,this.container=t,this.container.width=this.width,this.container.height=this.height,this.squares=[],this.squaresNumber=0,this.containerGraphicContext=this.container.getContext("2d"),this.draw=this.draw.bind(this),this.colors=[[246,114,128],[192,108,132],[53,92,125],[69,173,168],[153,184,152],[255,255,255],[253,253,150]]}return _createClass(e,[{key:"setWidth",value:function(t){this.width=t}},{key:"setHeight",value:function(t){this.height=t}},{key:"getWidth",value:function(){return this.width}},{key:"getHeight",value:function(){return this.height}},{key:"drawTheColor",value:function(){return this.colors[Math.floor(7*Math.random())]}},{key:"createSquare",value:function(){var t={actualAngle:1,velocity:1*Math.random()+.01,rotationSpeed:Number.parseFloat(.01*Math.random()).toFixed(3),width:Number.parseInt(80*Math.random()),x:Math.random()*this.getWidth()+1,y:this.getHeight(),opacity:.2*Math.random(),color:this.drawTheColor()};return 0==Number.parseFloat(t.rotationSpeed)&&(t.rotationSpeed=Number.parseFloat(.01)),t}},{key:"fillSquaresArray",value:function(){var t=[];this.squaresNumber=Number.parseInt(this.getWidth()/100),this.squaresNumber<4&&(this.squaresNumber=4);for(var e=0;e<this.squaresNumber;e++)t[e]=this.createSquare();this.squares=t}},{key:"clearElement",value:function(){this.containerGraphicContext.clearRect(0,0,this.getWidth(),this.getHeight()),this.containerGraphicContext.beginPath()}},{key:"updateSquaresPosition",value:function(){this.squares=this.squares.map(function(t){return t.y-=t.velocity,t})}},{key:"updateSquaresRotationAngle",value:function(){this.squares=this.squares.map(function(t){return 359<=Number.parseFloat(t.actualAngle)?t.actualAngle=1:t.actualAngle=Number.parseFloat(t.actualAngle)+Number.parseFloat(t.rotationSpeed),t})}},{key:"updateSquaresNumber",value:function(){for(var t=this.squares.filter(function(t){return 1<t.y+2*t.width}),e=this.squaresNumber-t.length,i=0;i<e;i++)t.push(this.createSquare());this.squares=t}},{key:"drawSquares",value:function(){for(var t=0;t<this.squares.length;t++)this.containerGraphicContext.save(),this.containerGraphicContext.beginPath(),this.containerGraphicContext.translate(this.squares[t].x+this.squares[t].width,this.squares[t].y+this.squares[t].width),this.containerGraphicContext.rotate(this.squares[t].actualAngle+Math.PI/180),this.containerGraphicContext.translate(-1*this.squares[t].width,-1*this.squares[t].width),this.containerGraphicContext.rect(this.squares[t].width/2,this.squares[t].width/2,this.squares[t].width,this.squares[t].width),this.containerGraphicContext.fillStyle="rgba("+this.squares[t].color[0]+","+this.squares[t].color[1]+","+this.squares[t].color[2]+","+this.squares[t].opacity+")",this.containerGraphicContext.fill(),this.containerGraphicContext.restore()}},{key:"draw",value:function(){this.clearElement(),this.drawSquares(),this.updateSquaresPosition(),this.updateSquaresRotationAngle(),this.updateSquaresNumber(),window.requestAnimationFrame(this.draw)}},{key:"setResizeEvent",value:function(){var t=this,e=void 0;window.addEventListener("resize",function(){clearTimeout(e),e=setTimeout(function(){t.clearElement(),t.setHeight(t.container.clientHeight),t.setWidth(t.container.clientWidth),t.container.width=t.width,t.container.height=t.height,t.fillSquaresArray()},200)})}},{key:"startAnimation",value:function(){this.fillSquaresArray(),this.setResizeEvent(),window.requestAnimationFrame(this.draw)}}]),e}();_createClass=function(){function n(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(t,e,i){return e&&n(t.prototype,e),i&&n(t,i),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var StartMenuManager=function(){function t(){_classCallCheck(this,t),this.startButton=document.querySelector("#startButton"),this.sliderThumb=document.querySelector(".sliderThumb"),this.sliderThumbX=this.sliderThumb.getBoundingClientRect().x,this.sliderTrack=document.querySelector(".sliderTrack"),this.sliderShiftedTrack=document.querySelector(".sliderShiftedTrack"),this.level=3,this.endThumbDrag=this.endThumbDrag.bind(this),this.thumbDrag=this.thumbDrag.bind(this)}return _createClass(t,[{key:"setLevel",value:function(t){this.level=t}},{key:"getLevel",value:function(){return this.level}},{key:"thumbDrag",value:function(t){t.clientX>this.sliderTrack.getBoundingClientRect().x&&t.clientX<this.sliderTrack.getBoundingClientRect().right?this.sliderThumb.style.webkitTransform="translate("+-1*(this.sliderThumbX-t.clientX)+"px,0)":this.sliderThumb.getBoundingClientRect().x<this.sliderTrack.getBoundingClientRect().x||t.clientX<this.sliderTrack.getBoundingClientRect().x?this.sliderThumb.style.webkitTransform="translate("+-1*(this.sliderThumbX-this.sliderTrack.getBoundingClientRect().x)+"px,0)":(this.sliderThumb.getBoundingClientRect().x>this.sliderTrack.getBoundingClientRect().x+this.sliderTrack.getBoundingClientRect().width||t.clientX>this.sliderTrack.getBoundingClientRect().x+this.sliderTrack.getBoundingClientRect().width)&&(this.sliderThumb.style.webkitTransform="translate("+(this.sliderTrack.getBoundingClientRect().right-this.sliderThumbX)+"px,0)")}},{key:"endThumbDrag",value:function(){document.removeEventListener("mouseup",this.endThumbDrag),document.removeEventListener("mousemove",this.thumbDrag)}},{key:"sliderThumbDragEvent",value:function(){var e=this;this.sliderThumb.addEventListener("mousedown",function(t){document.addEventListener("mouseup",e.endThumbDrag),document.addEventListener("mousemove",e.thumbDrag)})}},{key:"startButtonEvent",value:function(){this.startButton.addEventListener("click",function(){console.log("start")})}},{key:"setEvents",value:function(){this.startButtonEvent(),this.sliderThumbDragEvent()}}]),t}(),startBackGroundSquaresAnimation=function(){new SquaresAnimationManager(document.querySelector(".backgorundCanvas")).startAnimation()},setStartMenuEvents=function(){(new StartMenuManager).setEvents()},init=function(){startBackGroundSquaresAnimation(),setStartMenuEvents()};init();