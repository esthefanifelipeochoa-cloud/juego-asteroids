const canvas=document.getElementById("lienzo");
canvas.width=1300;
canvas.height=700;
const ctx= canvas.getContext("2d");
let x=650;
let y=350;
let angulo=0;
let vBomX;
let vBomy;
let bombas=[];
let iz=false;
let der=false;
let mov=false;
document.addEventListener("keydown",(b)=>{
    if(b.key=="d"){
        der=true;    
    }
    if(b.key=="a"){
        iz=true;
    }
    if(b.key=="s"){
        mov=true;   
    }
     if(b.key=="Enter"){
        disparar();   
    }
});
document.addEventListener("keyup",(b)=>{
    if(b.key=="d"){
        der=false;
    }
    if(b.key=="a"){
        iz=false;
    }
     if(b.key=="s"){
        mov=false;
        
    }
});

function dibujarNave(){
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
    x=x+5*Math.cos(angulo);
    y=y+5*Math.sin(angulo);
    dibujarNave();
}
function dibujarBombas(){
    bombas.forEach((bomba,pos)=>{
        bomba.x +=bomba.vBomX;
        bomba.y +=bomba.vBomy;
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
        vBomX: Math.cos(angulo)*velocidad,
        vBomy: Math.sin(angulo)*velocidad
    };
    bombas.push(bomba);
   
}
function dibujarMeteorito(x,y) {  
   ctx.save();
   ctx.translate(x,y);
   ctx.strokeStyle="white";
   ctx.fillStyle="black";
   ctx.beginPath();
   ctx.moveTo(0, -20);
   ctx.lineTo(12, -15);
   ctx.lineTo(20, -5);
   ctx.lineTo(15, 10);
   ctx.lineTo(5, 20);
   ctx.lineTo(-10, 18);
   ctx.lineTo(-18, 5);
   ctx.lineTo(-15, -10);
   ctx.lineTo(-5, -18);
   ctx.closePath();
   ctx.fill();
   ctx.stroke();
   ctx.restore();
}
let meteoritos=[];   
    for(let i=0;i<10;i++){
        meteoritos.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            velx: (Math.random()-0.5)*4,
            vely: (Math.random()-0.5)*4
        });
    }
function loop(){
     ctx.clearRect(0,0,canvas.width,canvas.height);
    if(der){
        girarDer();
    }
    if(iz){
        girarIzq();
    }
    if(mov){
        avanzar();
    }
    meteoritos.forEach(m=>{
        m.x +=m.velx;
        m.y +=m.vely;
        if (
        m.x < -30 || 
        m.x > canvas.width + 30 || 
        m.y < -30 || 
        m.y > canvas.height + 30
        ) {
        m.x = Math.random() * canvas.width;
        m.y = -20;
        m.velx = (Math.random() - 0.5) * 4;
        m.vely = Math.random() * 3 + 1;
        }
        dibujarMeteorito(m.x,m.y);
    }
    )
   
    dibujarNave();
    dibujarBombas();
    requestAnimationFrame(loop);
}

loop();