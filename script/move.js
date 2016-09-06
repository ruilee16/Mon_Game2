
var canvas
var canvasContext
var ballSpeed=[10,4];
var ballPosition=[400,300];
const PADDLE_HEIGHT=100;
const PADDLE_THICKNESS=10;
var player1Score=0;
var player2Score=0;
//var winScore=3;
var ifWin=false;
function paddle(position,width,length){
  this.position=position;
  this.width=width;
  this.length=length;
}
var paddle1Y=0;
var paddle2Y=0;
function calculateMousePos(evt){
  var rect=canvas.getBoundingClientRect();
  var root=document.documentElement;
  var mouseX=evt.clientX-rect.left-root.scrollLeft;
  var mouseY=evt.clientY-rect.top-root.scrollTop;
  return{
  	x:mouseX,
  	y:mouseY
  };
}
window.onload=function (){
  canvas=document.getElementById('blackBoard');
  canvasContext=canvas.getContext('2d');
  var framePerSecond=30;
  setInterval(function(){
	moveThings();
	drawThings();
  },1000/framePerSecond);
   canvas.addEventListener('mousedown',handleMouseClick);
  canvas.addEventListener('mousemove',function(evt){
  	var mousePos=calculateMousePos(evt);
  	paddle1Y=mousePos.y-(PADDLE_HEIGHT/2);
  });
 
}
function handleMouseClick(evt){
	if (ifWin){
		 player2Score=0;
         player1Score=0;
         ifWin=false;
	}
}
function ballReset(){
	if(player1Score>=3||
	   player2Score>=3){

		 ifWin=true;
	}
	ballPosition=[canvas.width/2,canvas.height/2];
	ballSpeed[0]=-ballSpeed[0];
}
function computerMove(){

	var paddle2Mid=paddle2Y+PADDLE_HEIGHT/2;
	if (paddle2Mid>(ballPosition[1]+35)){
		paddle2Y-=6;
	}
	else if(paddle2Mid<(ballPosition[1]-35)){
		paddle2Y+=6;
	}
}
function moveThings(){
  if(ifWin){
  	return;
  }
  computerMove();
  ballPosition[0]+=ballSpeed[0];
  ballPosition[1]+=ballSpeed[1];
  if(ballPosition[0]>(canvas.width-25)){
  	if(ballPosition[1]>paddle2Y-5&&ballPosition[1]<paddle2Y+PADDLE_HEIGHT+5){
  		let delta=ballPosition[1]-(paddle2Y+PADDLE_HEIGHT/2);
  		ballSpeed[0]=-ballSpeed[0];
  		ballSpeed[1]=delta*0.35;
  	}
  	else{
  		player1Score++;
  		ballReset();
  		
  	}
  }
  if(ballPosition[0]<25){
  	if(ballPosition[1]>paddle1Y-5&&ballPosition[1]<paddle1Y+PADDLE_HEIGHT+5){
  		let delta=ballPosition[1]-(paddle1Y+PADDLE_HEIGHT/2);
  		ballSpeed[0]=-ballSpeed[0];
  		ballSpeed[1]=delta*0.35;
  	}
  	else{
  		player2Score++;
  		ballReset();
  		
  	}
  }
  if(ballPosition[1]>canvas.height){
  	ballSpeed[1]=-ballSpeed[1];
  }
  if(ballPosition[1]<0){
  	ballSpeed[1]=-ballSpeed[1];
  } 
}
function drawThings(){
  
  console.log(ballPosition);
  //draw background
  colorRec([0,0],canvas.width,canvas.height,'black');
   if(ifWin){
   	canvasContext.fillStyle='white';
   	if (player1Score>=3){
   		canvasContext.fillText('left win',350,100);
  	}
 	 else if (player2Score>=3){
  		canvasContext.fillText('right win',350,100);
  	}
   	canvasContext.fillText('click to start',350,250);
  	return;
  }
  //draw a ball
  colorBall(ballPosition,10,'white');
  //draw left paddle
  colorRec([10,paddle1Y],PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  //draw right paddle
  colorRec([canvas.width-PADDLE_THICKNESS-10,paddle2Y],PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
  //print score
  canvasContext.font='30px Georgia';
  canvasContext.fillText(player1Score+':'+player2Score,canvas.width/2,canvas.height/2);

}
function colorBall(xy,r,color){
  canvasContext.fillStyle=color;
  canvasContext.beginPath();
  canvasContext.arc(xy[0],xy[1],r,0,2*Math.PI);
  canvasContext.fill();
}
//next function generate colorful rectangular
function colorRec(xy,width,height,color){
  canvasContext.fillStyle=color;
  canvasContext.fillRect(xy[0],xy[1],width,height);
}