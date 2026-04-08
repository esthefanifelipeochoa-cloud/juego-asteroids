const canvas=document.getElementById("lienzo");
canvas.width=700;
canvas.height=700;
const ctx= canvas.getContext("2d");
let x=250;
let y=250;
let angulo=0;
let pBomX;
let pBomy;
let bombas=[];
function dibujarNave(){
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.save();
   ctx.translate(x,y);
   ctx.rotate(angulo);
   ctx.strokeStyle="white"
   ctx.fillStyle="black";
   ctx.beginPath();
   ctx.moveTo(20,0);
   ctx.lineTo(-15,-10);
   ctx.lineTo(-15,10);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();
   ctx.restore();
   dibujarBombas();
}

function girarIzq(){
    angulo-=0.1;
    dibujarNave();
}
function girarDer(){
    angulo+=0.1;
    dibujarNave();
}
function avanzar(){
    x=x+10*Math.cos(angulo);
    y=y+10*Math.sin(angulo);
    dibujarNave();
}
function dibujarBombas(){
    bombas.forEach((bomba,pos)=>{
        bomba.x +=bomba.pBomX;
        bomba.y +=bomba.pBomy;
        ctx.beginPath();
        ctx.arc(bomba.x,bomba.y,3,0,Math.PI*2);
        ctx.fillStyle="white";
        ctx.fill();
    });
   
}
function disparar(){
    let velocidad=5;
    let bomba={
        x: x,
        y: y,
        pBomX: Math.cos(angulo)*velocidad,
        pBomy: Math.sin(angulo)*velocidad
    };
    bombas.push(bomba);
   
}
function loop(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    dibujarNave();
    dibujarBombas();
    requestAnimationFrame(loop);
}

loop();