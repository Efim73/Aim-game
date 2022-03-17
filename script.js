let level = document.getElementsByClassName('level')[0];
let timeButton = document.getElementsByClassName('gameButton')[0];
let accuracyButton = document.getElementsByClassName('gameButton')[1];
let reactionButton = document.getElementsByClassName('gameButton')[2];
let levelPlay = false;
let container = document.getElementsByClassName('container')[0];
let watch = document.getElementsByClassName('watch')[0]
let startButton = document.getElementsByClassName('startButton')[0]
var c = document.getElementById("myCanvas");
let time = 6;
let x, y, accuracyTime;

let scoreboard = document.getElementsByClassName('scoreboard')[0]
let score = 0;
let gameInterval;
let allowPlay = false
let mode = 'time';
let gameMode = document.getElementById('gameMode')
let modes = document.getElementsByClassName('modes')[0];

let timer = 0;



let timeShot = 0;
let circles = 20;
let randomNumber = 2;
let randomTime = Math.floor(Math.random() * 9) + 2;
let watchReaction = 0;
let pressA = document.getElementsByClassName('pressA')[0]
let h2Reaction = document.getElementById('h2Reaction')
let close = document.getElementsByClassName('close')[0];

close.onclick = function(){
    container.classList.remove('showContainer')
    accuracyButton.classList.add('visible')
    timeButton.classList.add('visible')
    reactionButton.classList.add('visible')

}
// pressA.onclick = function(){
//     console.log(randomTime);
//     h2Reaction.innerHTML='When you see green -tup to this button'
//     setTimeout(()=>{
//         gameInterval = setInterval(()=>{
//             watchReaction=watchReaction+1;
//             h2Reaction.innerHTML=watchReaction;

//         },10)

//     },randomTime)
//     press.onclick=function(){
//         press.style.background='red'
//         clearInterval(gameInterval)
//     }
// }


function createGame() {
    if (mode == 'time') {
        gameMode.innerHTML = 'Time'
        time = 60;
        watch.innerHTML = 'Time: ' + time;
        startButton.onclick = function () {
            timeMode();

        }
    }
    else if (mode == 'accuracy') {
        gameMode.innerHTML = 'Accuracy'
        watch.innerHTML = 'Circles: 20'
        startButton.onclick = () => {
            accuracyMode();
        }
    }
    else if (mode == 'reaction') {
        gameMode.innerHTML = 'Reaction'
        watch.innerHTML = 'Attempts: 20'
        startButton.onclick = () => {
            reactionMode();
        }
    }
}
function reactionMode() {
    allowPlay=true;
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.beginPath()
    ctx.rect(0, 0, c.width, c.height)
    ctx.fillStyle = 'green'
    setTimeout(function () {
        ctx.fill();
        gameInterval=setInterval(()=>{

            timer++;
            scoreboard.innerHTML = 'Score: ' + timer;
        },100)
    }, randomTime * 1000)
}

function accuracyMode() {




    // if (timeShot == 1) {
    //     ctx.clearRect(0, 0, c.width, c.height)
    // }
    // gameInterval = setInterval(() => {
    //     time++;

    // }, 1000)
    // if (ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[0] == 255 && allowPlay == true) {
    //     console.log(14);
    //     score++;
    //     scoreboard.innerHTML = 'Score: ' + score;
    //     getCircle();
    // }
    if (startButton.innerHTML == 'Start') {
        circles = 100;
        score=0;
        accuracyTime=1000;
        scoreboard.innerHTML='Score: '+score
        watch.innerHTML = 'Circles: ' + circles;
        startButton.innerHTML = 'Stop'
        getCircle();
        accuracyInterval();
    }
    else {
        clearInterval(gameInterval);
        ctx.clearRect(0, 0, c.width, c.height);
        startButton.innerHTML = 'Start'
    }
}


function accuracyInterval(){
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        // timeShot++
        getCircle();
        circles--;

        watch.innerHTML = 'Circles: ' + circles;
        if (circles == 0) {
            clearInterval(gameInterval);
            ctx.clearRect(0, 0, c.width, c.height);
            startButton.innerHTML = 'Start'

        }
    },accuracyTime)
}


function timeMode() {
    if (startButton.innerHTML == 'Start') {
        getCircle();
        startButton.innerHTML = 'Stop'
        time = 60;
        allowPlay = true;
        time--;

        watch.innerHTML = 'Time: ' + time
        score = 0;
        scoreboard.innerHTML = 'Score: ' + score;
        gameInterval = setInterval(() => {
            time--;
            watch.innerHTML = 'Time: ' + time;
            if (time == 0) {
                allowPlay = false;
                startButton.innerHTML = 'Start'
                score = 0;
                ctx.clearRect(0, 0, c.width, c.height)
                clearInterval(gameInterval);
            }
        }, 1000)
    }


    else {
        startButton.innerHTML = 'Start'
        clearInterval(gameInterval);
    }
}


c.width = container.offsetWidth;
c.height = 600;
var ctx = c.getContext("2d");
// setTimeout=false;
// function levelHeigth{

// }
timeButton.onclick = function () {
    allowPlay = true;
    mode = 'time';
    removeCards()
    // startButton.onclick = function () {
    //     if (startButton.innerHTML = 'Stop') {
    //         startButton.onclick = function () {

    //         }
    //     }


    //     startButton.innerHTML = 'Stop'
    //     gameInterval = setInterval(() => {
    //         time--;
    //         watch.innerHTML = 'Time: ' + time;
    //         if (time == 0) {
    //             clearInterval(gameInterval);
    //             allowPlay = false;
    //             startButton.innerHTML = 'Start'
    //         }

    //     }, 1000)
    //     c.onclick = function (event) {
    //         // это условие - проверяет попали мы на красную фигуру, 255-красный, event.offsetX-Х мышки, 1,1-площадь 1Х1 px
    //         if (ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[0] == 255 && allowPlay == true) {
    //             score++;
    //             scoreboard.innerHTML = 'Score: ' + score;
    //             getCircle();
    //         }
    //     }
    //     allowGame = true;
    //     getCircle();
    //     if (time < 0) {
    //         allowPlay = false;
    //     }

    // }

}
accuracyButton.onclick = function () {
    mode = 'accuracy'
    removeCards()
    allowPlay = true;

}

reactionButton.onclick = function () {
    mode = 'reaction'

    removeCards()

    // startButton.onclick = function () {
    //     gameInterval = setInterval(() => {

    //         c.style.backgroundColor = 'green'
    //     }, randomTime * 1000);
    // }


    if (c.style.backgroundColor == 'green') {
        gameInterval = setInterval(() => {
            timer++;
            // watch.innerHTML=watch;
            console.log(timer);


        }, 100);
    }



}
function removeCards() {
    accuracyButton.classList.remove('visible')
    timeButton.classList.remove('visible')
    reactionButton.classList.remove('visible')
    container.classList.add('showContainer')
    createGame();
}
function getCircle() {
    ctx.clearRect(0, 0, c.width, c.height)
    let dotRadius = 30
    x = Math.floor(Math.random() * (c.width - dotRadius * 2)) + dotRadius
    y = Math.floor(Math.random() * (c.height - dotRadius * 2)) + dotRadius
    ctx.beginPath();
    ctx.arc(x, y, dotRadius, 0, 2 * Math.PI);
    ctx.fillStyle = 'red'
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
// startButton.onclick = function () {
//     getCircle()
//     time = 60;
//     // clearInterval(gameInterval)
//     allowPlay = true;
//     levelPlay = false;



//     if (startButton.innerHTML == 'Stop') {
//         console.log(startButton.innerHTML);
//         startButton.innerHTML = 'Start'
//         clearInterval(gameInterval)
//         ctx.clearRect(0, 0, c.width, c.height)
//         console.log(000);
//         startButton.onclick = function () {
//             getCircle()
//             time = 60;
//             console.log(897);
//         }
//     }
//     else {

//         startButton.innerHTML = 'Start'
//         gameInterval = setInterval(() => {
//             time--;
//             watch.innerHTML = 'Time: ' + time;
//             if (time == 0) {
//                 clearInterval(gameInterval)
//                 ctx.clearRect(0, 0, c.width, c.height)

//                 allowPlay = false;
//             }
//         }, 1000);


//     }
//     // setTimeout=true;
// }

// level.onclick = function(){
//     setTimeout(()=>{
//         ctx.clearRect(0,0, c.width,c.height)

//     },2000)
//     getCircle();
//     levelPlay = true;
// }
c.onclick = function (event) {
    console.log(ctx.getImageData(event.offsetX, event.offsetY, 1, 1));
    // это условие - проверяет попали мы на красную фигуру, 255-красный, event.offsetX-Х мышки, 1,1-площадь 1Х1 px
    if (ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[0] == 255 && allowPlay == true) {
        console.log(14);
        score++;
        scoreboard.innerHTML = 'Score: ' + score;
        if (mode == 'time') {
            getCircle();


        }
        else if (mode == 'accuracy') {
            ctx.clearRect(0, 0, c.width, c.height)
            accuracyTime=accuracyTime-5;
            accuracyInterval();
            // if(score>4){
            //     accuracyTime=800;


            //     accuracyInterval();
            // }
            // if(score>10){
            //     accuracyTime=600;
            //     accuracyInterval();
            // }
            // if(score>15){
            //     accuracyTime=500;
            //     accuracyInterval();
            // }
            
        }

    }

    if(ctx.getImageData(event.offsetX, event.offsetY, 1,1).data[1]==128 && allowPlay==true) {
        clearInterval(gameInterval);
    }
}