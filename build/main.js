"use strict";var _createClass=function(){function a(t,e){for(var n=0;n<e.length;n++){var a=e[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(t,a.key,a)}}return function(t,e,n){return e&&a(t.prototype,e),n&&a(t,n),t}}();function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}var BackgroundAnimationManager=function(){function e(t){_classCallCheck(this,e),this.width=t.clientWidth,this.height=t.clientHeight,this.container=t,this.squares=[],this.containerGraphicContext=this.container.getContext("2d")}return _createClass(e,[{key:"setWidth",value:function(t){this.width=t}},{key:"setHeight",value:function(t){this.height=t}},{key:"getWidth",value:function(){return this.width}},{key:"getHeight",value:function(){return this.height}},{key:"updateNumberSquare",value:function(){var t=Number.parseInt(this.getWidth()/200),e=[];t<2&&(t=2);for(var n=0;n<t;n++)e[n]={x:Math.floor(Math.random()*this.getWidth())+1,y:0,velocity:Number.parseInt(10*Math.random()),rotationSpeed:Number.parseInt(10*Math.random()),width:Number.parseInt(100*Math.random()),opacity:.3*Math.random()};this.squares=e}}]),e}(),obiektProbny=new BackgroundAnimationManager(document.querySelector(".backgorundCanvas"));obiektProbny.updateNumberSquare(),console.log(obiektProbny.squares),console.log("witaj w starcvie"),console.log("Witaj w grze puzzle");