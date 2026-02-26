class Unit{
constructor(x,y,type,dir){
this.x=x;this.y=y;this.type=type;this.dir=dir;
this.hp=100;this.dmg=5;this.speed=.4;
this.stun=0;this.cd=0;this.air=false;this.invis=false;

if(type=="Dragón"){this.air=true}
if(type=="Fantasma"){this.invis=true}
if(type=="MiniPEKKA"){this.dmg=15}
}

update(){
if(this.stun>0){this.stun--;return;}
this.y+=this.speed*this.dir;

if(this.type=="Bruja"){
this.cd++;
if(this.cd>600){
for(let i=0;i<4;i++)player.push(new Unit(this.x+Math.random()*20,this.y,"Esqueleto",-1));
this.cd=0;
}
}
}

draw(ctx){
if(this.invis)return;
ctx.fillText(icon(this.type),this.x,this.y);
ctx.fillStyle="red";
ctx.fillRect(this.x-10,this.y-15,20*(this.hp/100),3);
}
}

function icon(t){
return{
"Bruja":"🧙","Cazador":"🔫","Mosquetera":"🏹","Bárbaro":"🪓",
"Dragón":"🐲","Fantasma":"👻","MiniPEKKA":"🤖","Mago":"⚡","Esqueleto":"💀"
}[t]||"⚔";
}