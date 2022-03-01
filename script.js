let level = document.getElementsByClassName('level')[0];
let levelPlay = false;
let container = document.getElementsByClassName('container')[0];
let watch=document.getElementsByClassName('watch')[0]
let startButton=document.getElementsByClassName('startButton')[0]
var c = document.getElementById("myCanvas");
let time=60;
let x,y; 
let scoreboard = document.getElementsByClassName('scoreboard')[0]
let score = 0 ;
let gameInterval;
let allowPlay = false
c.width=container.offsetWidth;
c.height=600;
var ctx = c.getContext("2d");
// setTimeout=false;
// function levelHeigth{

// }

function getCircle(){
    ctx.clearRect(0,0, c.width,c.height)
    let dotRadius = 30
    x = Math.floor(Math.random()*(c.width-dotRadius*2))+dotRadius
    y = Math.floor(Math.random()*(c.height-dotRadius*2))+dotRadius
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle='red'
    ctx.fill()
    ctx.stroke();
    // if(levelPlay == true){
    //     setTimeout(()=>{
    //         ctx.clearRect(0,0, c.width,c.height)
    //         console.log('8689');
    
    //         getCircle();
    //     },2000)

    // }
    // else{
    //     levelPlay=false;
    // }


}
startButton.onclick = function(){
    getCircle()
    time=60;
    clearInterval(gameInterval)
    allowPlay=true;
    levelPlay=false;



    if(startButton.innerHTML=='Stop'){
        console.log(startButton.innerHTML);
        startButton.innerHTML='Start'
        clearInterval(gameInterval)
        ctx.clearRect(0,0, c.width,c.height)
    }
    else{

        startButton.innerHTML='Stop'
        gameInterval=setInterval(() => {
            time--;
            watch.innerHTML='Time: '+time;
            if(time==0){
                clearInterval(gameInterval)
                ctx.clearRect(0,0, c.width,c.height)
                
                allowPlay=false;
            }
        },1000);


    }
    // setTimeout=true;
}
c.onclick=function(event){
    console.log(ctx.getImageData(event.offsetX, event.offsetY, 1,1));
    // это условие - проверяет попали мы на красную фигуру, 255-красный, event.offsetX-Х мышки, 1,1-площадь 1Х1 px
    if(ctx.getImageData(event.offsetX,event.offsetY,1,1).data[0]==255 && allowPlay==true){
        console.log(14);
        score++;                                           
        scoreboard.innerHTML='Score: '+score

        getCircle();
    }


}
level.onclick = function(){
    setTimeout(()=>{
        ctx.clearRect(0,0, c.width,c.height)

    },2000)
    getCircle();
    levelPlay = true;
}
