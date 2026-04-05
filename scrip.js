const canvas=document.getElementById("lienzo");
canvas.width=500;
canvas.height=500;
const ctx= canvas.getContext("2d");
let x=200;
let y=200;
let angulo=0;
function dibujar(){
   ctx.clearRect(0,0,canvas.width,canvas.height);
   ctx.save();
   ctx.translate(x,y);
   ctx.rotate(angulo);
   ctx.beginPath();
   ctx.moveTo(20,0);
   ctx.lineTo(-15,-10);
   ctx.lineTo(-15,10);
   ctx.closePath();
   ctx.stroke();
   ctx.restore();
  
}
function girarIzq(){
    angulo+=0.1;
    dibujar();
}
function girarDer(){
    angulo-=0.1;
    dibujar();
}
dibujar();