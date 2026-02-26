const canvas=document.getElementById("game");
const ctx=canvas.getContext("2d");

resize();onresize=resize;
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;}

const redirectWin="TU_PAGINA.html";

let elixir=10;
setInterval(()=>{if(elixir<10)elixir+=.4},1200);

const cardsData=["Bruja","Cazador","Mosquetera","Bárbaro","Dragón","Fantasma","MiniPEKKA","Mago"];
let deck=[0,1,2,3],queue=[4,5,6,7];

const cards=document.getElementById("cards");

function drawCards(){
cards.innerHTML="";
deck.forEach(i=>{
let d=document.createElement("div");
d.className="card";
d.innerHTML=icon(cardsData[i])+"<br>"+cardsData[i];
d.onclick=()=>play(i);
cards.appendChild(d);
});
}
drawCards();

let player=[],enemy=[];

function play(i){
if(elixir<4)return;
elixir-=4;
player.push(new Unit(canvas.width/2,canvas.height-140,cardsData[i],-1));

deck.splice(deck.indexOf(i),1);
deck.push(queue.shift());
queue.push(i);
drawCards();
}

setInterval(()=>enemy.push(new Unit(canvas.width/2,120,cardsData[Math.floor(Math.random()*8)],1)),2500);

let towers=[
{y:40,hp:300},{y:canvas.height-40,hp:300}
];

function loop(){
ctx.clearRect(0,0,canvas.width,canvas.height);

// campo
ctx.fillStyle="#22c55e";ctx.fillRect(0,0,canvas.width,canvas.height);
ctx.fillStyle="#0284c7";ctx.fillRect(0,canvas.height/2-20,canvas.width,40);

player.forEach(u=>{u.update();u.draw(ctx)});
enemy.forEach(u=>{u.update();u.draw(ctx)});

// combate
player.forEach(p=>{
enemy.forEach(e=>{
if(Math.abs(p.y-e.y)<15){
p.hp-=e.dmg;
e.hp-=p.dmg;
if(p.type=="Mago")e.stun=120;
if(e.type=="Mago")p.stun=120;
p.invis=false;e.invis=false;
}
});
});

// torres
player.forEach(u=>{if(u.y<60){towers[0].hp-=u.dmg;u.hp=0}});
enemy.forEach(u=>{if(u.y>canvas.height-60){towers[1].hp-=u.dmg;u.hp=0}});

ctx.fillStyle="gray";
ctx.fillRect(canvas.width/2-20,20,40,40);
ctx.fillRect(canvas.width/2-20,canvas.height-60,40,40);

ctx.fillStyle="white";
ctx.fillText(towers[0].hp,canvas.width/2-10,15);
ctx.fillText(towers[1].hp,canvas.width/2-10,canvas.height-70);

player=player.filter(u=>u.hp>0);
enemy=enemy.filter(u=>u.hp>0);

document.getElementById("eli").style.width=(elixir/10*100)+"%";

if(towers[0].hp<=0){
document.getElementById("victory").style.display="flex";
setTimeout(()=>location.href=redirectWin,3000);
}

requestAnimationFrame(loop);
}
loop();