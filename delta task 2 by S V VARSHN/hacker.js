
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
let bossbots=[];
botspeed=1.5;
bsize=10;//botsizes
let missiles=[];
let missilecount=0;
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

function generatebot(){bossbots.forEach(bossbot=>{
  bots.push({x:bossbot.x,y:bossbot.y,bid:bossbot.x})})
  }
function attackplayer(){
    for(let i=0;i<bots.length;i++){
        let bot=bots[i];
        
        if(bot.bid%2==0){//attackplayer
           let alph=Math.atan((Player.playery-bot.y)/(Player.playerx-bot.x))
           if(bot.x>Player.playerx){bot.y=bot.y-botspeed*Math.sin(alph);bot.x=bot.     x-botspeed*Math.cos(alph)}
           else{bot.y=bot.y+botspeed*Math.sin(alph);bot.x=bot.x+botspeed*Math.cos(alph);}}
        else{//attackbase
             let alph=Math.atan((basey-bot.y)/(basex-bot.x))
             if(bot.x>basex){bot.y=bot.y-botspeed*Math.sin(alph);bot.x=bot.x-botspeed*Math.cos(alph)}
             else{bot.y=bot.y+botspeed*Math.sin(alph);bot.x=bot.x+botspeed*Math.cos(alph);}}

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

      else if(true){
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
      else{}
      
        }
          }
          
function launchmissile(){
    let missilex=Player.playerx+Player.playerw/2;let missiley=Player.playery;
   // if(missilecount<10 && missilecount%10!=0){
    let missile={
      x:missilex,y:missiley,size:msize}
    missiles.push(missile);
    /*else{
      let missile={
        x:missilex,y:missiley,size:msize,type:"powered"}
      missiles.push(missile);}*/
    
    
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
       else{
            for(let j=0;j<bossbots.length;j++){
                 let bossbot=bossbots[j];
                 const dx = bossbots[j].x-missile.x;
                 const dy = bossbots[j].y-missile.y;
                 const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 12+ msize) {
                  scoreval=scoreval+50
                    //if(missile.type=="powered"){console.log("powered");bossbot.life=-100;}                  
                  bossbot.life=bossbot.life-20;              
                  if(bossbot.life<=0){bossbots.splice(j, 1)};
                  //if(missile.type!="powered")
                  missiles.splice(i, 1)               
                  i--;
                  j--;
                  break;}}}
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
        Player.playerx=Player.playerx-5;Player.ang=-0.15;}
    } else if (event.code === "ArrowRight") {
      if(Player.playerx<w-30){ 
        Player.playerx=Player.playerx+5;Player.ang=+0.15;}    
    }else if(event.code==="Space"){
        missilecount+=1
        launchmissile();
    }else if(event.code==="ArrowUp"){
      Player.playery=Player.playery-5;
    }else if(event.code==="ArrowDown"){
      Player.playery=Player.playery-5;
}}
function generatebossbots(){
    for(let i=0;i<3;i++){
    let x=Math.floor(Math.random()*w);
    let y=Math.floor(Math.random()*(h/3));
    bossbots.push({x:x,y:y,life:100})
    }}
function drawbossbots(){
      bossbots.forEach(bossbot=>{
        //console.log("drawing")
        ctx.beginPath()
        ctx.fillStyle="red"
        ctx.arc(bossbot.x,bossbot.y,12,0,2*Math.PI)
        ctx.fill()
    })
  }
function update(){
    ctx.clearRect(0, 0, w,h); 
    drawbossbots()   
    attackplayer();         
    Player.drawplayer();
    //drawlauncher();
    drawbase();  
    movemissile(); 
    if(bossbots.length<=0){generatebossbots()}
    if (checkgameover()!="over" && buttonval=="play"){requestAnimationFrame(update)};  
  }
alert("WELCOME TO DROID DEFENCE\n Gamecontrols :\n Arrowleft | right : Move player left | right\n  Arrowup | down : Move player up | down\n  Space : Shoot")

generatebossbots()

var id=setInterval("generatebot()",2000)
update()









