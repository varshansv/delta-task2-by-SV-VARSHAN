
//Game variable and constants
const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");
const w=canvas.width;
const h=canvas.height;
//music effects
const gameoversound=new Audio("music/gameover.mp3")
const missilesound=new Audio("music/missile.mp3")
const attackedsound=new Audio("music/attacked.mp3")
const gamemusic=new Audio("music/gamemusic.mp3")
let buttonval="play"
let bots=[];
botspeed=1.5;
bsize=10;//botsizes
let missiles=[];
mspeed=10;//missile speed
msize=5;//missile size
let scoreval=0
let score=document.getElementById('score')
const playerimg= new Image();
playerimg.src="playerimg.jpeg"
const botimg=new Image();
botimg.src="botimg.jpg"
const baseimg=new Image()
baseimg.src="baseimg.jpeg"
class Playerclass{ 
 constructor(){
        this.playerw=30;
        this.playerh=30;
        this.playerx=w/2;this.playery=h-this.playerh;
        this.ang=0;
     }  

 drawplayer(){
            ctx.translate(this.playerx,this.playery)
           ctx.rotate(Player.ang)
            ctx.drawImage(playerimg,0,0,this.playerw,this.playerh)
            ctx.rotate(-Player.ang)
            ctx.translate(-this.playerx,-this.playery)};
            

}
const Player=new Playerclass();
let basex=Player.playerx;basey=Player.playery-Player.playerh*1.25;basew=Player.playerw*0.75;baseh=Player.playerh*0.75;
  
function drawbase(){
    ctx.fillStyle="blue"  
    ctx.fillRect(basex,basey,basew,baseh);}

function generatebot(){let x=Math.floor(Math.random()*w +10);
  let y=Math.floor(Math.random()*(h/3));
  bots.push({x:x,y:y,dy: botspeed,});
  ctx.drawImage(botimg,x,y,bsize,bsize)}

function attackplayer(){
    for(let i=0;i<bots.length;i++){
        let bot=bots[i];
        bot.y=bot.y+botspeed;
        ctx.fillStyle="red";
        ctx.fillRect(bot.x,bot.y,bsize,bsize);
      //checkcollision with player
      if((bot.y+bsize>Player.playery) &&(bot.x>=Player.playerx)&&(bot.x<=Player.playerx+Player.playerw) ){
        //reduce health
        playerattacked()
        bots.splice(i, 1);
        i--;
        checkgameover();
      }
      //check collision with base
      else if((bot.y+bsize>basey) &&(bot.x>=basex)&&(bot.x<=basex+basew)){
        //reduce  health
        playerattacked()
        bots.splice(i, 1);
        i--;
        checkgameover();
      } 
      //bot going out of screen
      else if(bot.y>h){
        bots.splice(i, 1);
        i--;
      } 
      else{
      for (let j = 0; j < missiles.length; j++) {
        const missile =missiles[j];
        const dx = bot.x - missile.x;
        const dy = bot.y - missile.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < bsize+ msize) {
            //score += 10;
            missiles.splice(j, 1);
            bots.splice(i, 1);
            i--;
            scoreval=scoreval+10;     
            score.textContent=scoreval;
            break;}}}
            }
}
function launchmissile(){
    let missilex=Player.playerx+Player.playerw/2;let missiley=Player.playery;
    let missile={
      x:missilex,y:missiley,size:msize}
    missiles.push(missile);
    
    ctx.fillStyle="blue";
    ctx.fillRect(missilex,missiley,msize,msize);
}
function movemissile(){
    for(let i=0;i<missiles.length;i++){
       const missile=missiles[i];
       missilesound.play();
       gamemusic.play();
       missile.x=missile.x-mspeed*Math.sin(-Player.ang);
       missile.y=missile.y-mspeed*Math.cos(Player.ang);
       ctx.fillStyle="blue";
       ctx.fillRect(missile.x,missile.y,msize,msize);
       if (missile.y < 0) {
        missiles.splice(i, 1);//remove one element from index i 
        i--;
       }
    }
}

function pauseplay(){
  if(buttonval=="play"){buttonval="pause";clearInterval(id)}
  else{buttonval="play";update();setInterval("generatebot()",2000)}
}


function checkgameover(){
  
  if (health<=0){
    clearInterval(id);
    ctx.clearRect(0, 0, w,h);
    gamemusic.pause();
    gameoversound.play();
    alert("GAMEOVER!!! your score:"+scoreval);
    return "over"
    };
  
}
document.addEventListener("keydown",keyboardinput);
function keyboardinput(event) {
    if (event.code === "ArrowLeft") {
      if(Player.playerx>5){
         Player.playerx=Player.playerx-5;}
    } else if (event.code === "ArrowRight") {
         if(Player.playerx<w-30){ 
            Player.playerx=Player.playerx+5;}    
    }else if(event.code==="Space"){
        launchmissile();
    }else if(event.code==="ArrowUp"){
      Player.ang=Player.ang-0.35;
    }else if(event.code==="ArrowDown"){
      Player.ang=Player.ang+0.35;
}   }
function update(){
    ctx.clearRect(0, 0, w,h);    
    attackplayer();         
    Player.drawplayer();
    //drawlauncher();
    drawbase();  
    movemissile(); 
    if (checkgameover()!="over" && buttonval=="play"){requestAnimationFrame(update)};
   
  }
alert("WELCOME TO DROID DEFENCE\n Gamecontrols :\n Arrowleft | right : Move player left | right\n  Arrowup | down : player rotation anti | clockwise\n  Space : Shoot")

//generate new bot for each second
var id=setInterval("generatebot()",250)
update()









