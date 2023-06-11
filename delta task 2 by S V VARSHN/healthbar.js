class Healthbar{
    constructor(x,y,height,width,maxhealth,color){
        this.x=x;
        this.y=y;
        this.h=height;
        this.w=width;
        this.maxhealth=maxhealth;
        this.health=maxhealth;
        this.maxwidth=width;
        this.c=color; 
    }
    show(context){
        context.linewidth=5;
        context.fillStyle=this.c;

        context.fillRect(this.x,this.y,this.w,this.h);
        context.strokeRect(this.x,this.y,this.maxwidth,this.h)
    }
    updatehealth(val){
        
        if(val>=0){
        this.health=val; 

        this.w=(this.health/this.maxhealth)*this.maxwidth;}
        //console.log(this.w)
        }
    }


const hcanvas=document.getElementById("healthbar");
const context=hcanvas.getContext("2d");
let health=100;
const width=hcanvas.width;
const height=hcanvas.height;
let healthbar=new Healthbar(0,0,height,width,100,"green");
function frame(){
    //console.log(Healthbar.x)
    context.clearRect(0,0,width,height)
    healthbar.show(context);
    requestAnimationFrame(frame)
}
function playerattacked(){;
    health=health-5;
    healthbar.updatehealth(health);
    attackedsound.play()
    
    
}
frame();

