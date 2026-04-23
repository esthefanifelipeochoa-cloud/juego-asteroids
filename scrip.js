//===============> VISTA
const canvas=document.getElementById("lienzo");
canvas.width=1000;
canvas.height=600;
const ctx= canvas.getContext("2d");
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

function dibujarBombas(){
    bombas.forEach(b=>{
        ctx.beginPath();
        ctx.arc(b.x,b.y,3,0,Math.PI*2);
        ctx.fillStyle="white";
        ctx.fill();
    });
   
}

function mostrarGameOver(){
    ctx.fillStyle = "white";
    ctx.font = "50px Verdana";
    ctx.fillText("GAME OVER", canvas.width/2 - 180, canvas.height/2);
    document.getElementById("reiniciar").style.display = "block";
}

//=======================> MODELO

let x=650;
let y=350;
let angulo=0;
let bombas=[];
let iz=false;
let der=false;
let mov=false;
let meteoritos=[];  
let naveViva = true; 

for(let i=0;i<10;i++){
    meteoritos.push({
        x: Math.random()*canvas.width,
        y: Math.random()*canvas.height,
        velx: (Math.random()-0.5)*4,
        vely: (Math.random()-0.5)*4
    });
}
function actualizar(){
//movimiento de direccion de la nave
    if(der) angulo += 0.2;
    if(iz) angulo -= 0.2;

    if(mov){
        x += Math.cos(angulo)*9;
        y += Math.sin(angulo)*9;
    }
// movimiento de bombas
    bombas.forEach(b=>{
        b.x += b.vBomX;
        b.y += b.vBomy;
        
    });
// evita que la nave al salir del canvas desaparesca si no aparesca al otro extremo de donde se encuentra
if (x < 0) {
    x = canvas.width;
}
if (x > canvas.width) {
    x = 0;
}
if (y < 0) {
    y = canvas.height;
}
if (y > canvas.height) {
    y = 0;
}   
// movimiento de meteoritos
    meteoritos.forEach(m=>{15
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
        m.velx = (Math.random() - 0.5) * 10;
        m.vely = Math.random() * 8 + 3;
        }
    })
// colisión nave
    meteoritos.forEach(m=>{
        let dx = x - m.x;
        let dy = y - m.y;
        if(dx*dx + dy*dy < 30*30){
            naveViva = false;
        }
    });
// colision de bombas con meteoritos
    for(let i = bombas.length - 1; i >= 0; i--){
    for(let j = meteoritos.length - 1; j >= 0; j--){

        let disX = bombas[i].x - meteoritos[j].x;
        let disY= bombas[i].y - meteoritos[j].y;
        let d = Math.sqrt(disX*disX + disY*disY);
        
        if(d < 20){
            bombas.splice(i, 1);
            meteoritos.splice(j, 1);
            break;
        }
    }
   }
// añadir meteoritos si es menor a 10
   if(meteoritos.length<10){
      meteoritos.push({
            x: Math.random()*canvas.width,
            y: -20,
            velx: (Math.random()-0.5)*10,
            vely: Math.random()*8+3,
            
        });
   }
   
}
function disparar(){
    let velocidad=15;
    let bomba={
        x: x,
        y: y,
        vBomX: Math.cos(angulo)*velocidad,
        vBomy: Math.sin(angulo)*velocidad
    };
    bombas.push(bomba);  
}

function reiniciarJuego(){
    x = canvas.width / 2;
    y = canvas.height / 2;
    angulo = 0;
    naveViva = true;

    bombas = [];

    meteoritos = [];
    for(let i=0;i<10;i++){
        meteoritos.push({
            x: Math.random()*canvas.width,
            y: Math.random()*canvas.height,
            velx: (Math.random()-0.5)*4,
            vely: (Math.random()-0.5)*4
        });
    }
    document.getElementById("reiniciar").style.display = "none";
}


//===============>CONTROLADOR

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
document.getElementById("reiniciar").addEventListener("click", reiniciarJuego);
function loop(){
     ctx.clearRect(0,0,canvas.width,canvas.height);
     actualizar(); 
    meteoritos.forEach(m => dibujarMeteorito(m.x,m.y));
    if (naveViva) {
       dibujarNave();
       dibujarBombas();
    }else{
       mostrarGameOver();
    }
requestAnimationFrame(loop);
}

loop();


