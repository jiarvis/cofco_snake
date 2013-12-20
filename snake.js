/*! snake 2013-12-20 */
function getKey(a){for(var b in keys)if(keys[b]instanceof Array&&keys[b].indexOf(a)>=0)return b;return null}function loop(){game.over||(game.resetCanvas(),snake.move(),food.draw(),snake.draw(),game.drawMessage()),setTimeout(function(){requestAnimationFrame(loop)},1e3/game.fps)}var canvas=document.getElementById("the-game"),context=canvas.getContext("2d"),game,snake,food;game={score:0,fps:8,over:!1,message:null,start:function(){game.over=!1,game.message=null,game.score=0,game.fps=8,snake.init(),food.set()},stop:function(){game.over=!0,game.message="GAME OVER - PRESS SPACEBAR"},drawBox:function(a,b,c,d){context.fillStyle=d,context.beginPath(),context.moveTo(a-c/2,b-c/2),context.lineTo(a+c/2,b-c/2),context.lineTo(a+c/2,b+c/2),context.lineTo(a-c/2,b+c/2),context.closePath(),context.fill()},drawScore:function(){context.fillStyle="#999",context.font=canvas.height+"px Impact, sans-serif",context.textAlign="center",context.fillText(game.score,canvas.width/2,.9*canvas.height)},drawMessage:function(){null!==game.message&&(context.fillStyle="#00F",context.strokeStyle="#FFF",context.font=canvas.height/10+"px Impact",context.textAlign="center",context.fillText(game.message,canvas.width/2,canvas.height/2),context.strokeText(game.message,canvas.width/2,canvas.height/2))},resetCanvas:function(){context.clearRect(0,0,canvas.width,canvas.height)}},snake={size:canvas.width/40,x:null,y:null,color:"#0F0",direction:"left",sections:[],init:function(){snake.sections=[],snake.direction="left",snake.x=canvas.width/2+snake.size/2,snake.y=canvas.height/2+snake.size/2;for(var a=snake.x+5*snake.size;a>=snake.x;a-=snake.size)snake.sections.push(a+","+snake.y)},move:function(){switch(snake.direction){case"up":snake.y-=snake.size;break;case"down":snake.y+=snake.size;break;case"left":snake.x-=snake.size;break;case"right":snake.x+=snake.size}snake.checkCollision(),snake.checkGrowth(),snake.sections.push(snake.x+","+snake.y)},draw:function(){for(var a=0;a<snake.sections.length;a++)snake.drawSection(snake.sections[a].split(","))},drawSection:function(a){game.drawBox(parseInt(a[0],10),parseInt(a[1],10),snake.size,snake.color)},checkCollision:function(){snake.isCollision(snake.x,snake.y)===!0&&game.stop()},isCollision:function(a,b){return a<snake.size/2||a>canvas.width||b<snake.size/2||b>canvas.height||snake.sections.indexOf(a+","+b)>=0?!0:void 0},checkGrowth:function(){snake.x==food.x&&snake.y==food.y?(game.score++,game.score%5===0&&game.fps<60&&game.fps++,food.set()):snake.sections.shift()}},food={size:null,x:null,y:null,color:"#0FF",set:function(){food.size=snake.size,food.x=Math.ceil(10*Math.random())*snake.size*4-snake.size/2,food.y=Math.ceil(10*Math.random())*snake.size*3-snake.size/2},draw:function(){game.drawBox(food.x,food.y,food.size,food.color)}};var inverseDirection={up:"down",left:"right",right:"left",down:"up"},keys={up:[38,75,87],down:[40,74,83],left:[37,65,72],right:[39,68,76],start_game:[13,32]};addEventListener("keydown",function(a){var b=getKey(a.keyCode);["up","down","left","right"].indexOf(b)>=0&&b!=inverseDirection[snake.direction]?snake.direction=b:["start_game"].indexOf(b)>=0&&game.over&&game.start()},!1);var requestAnimationFrame=window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame;requestAnimationFrame(loop);