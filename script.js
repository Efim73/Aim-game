let level = document.getElementsByClassName('level')[0];
let timeButton = document.getElementsByClassName('gameButton')[0];
let accuracyButton = document.getElementsByClassName('gameButton')[1];
let reactionButton = document.getElementsByClassName('gameButton')[2];
let levelPlay = false;
let container = document.getElementsByClassName('container')[0];
let watch = document.getElementsByClassName('watch')[0]
let startButton = document.getElementsByClassName('startButton')[0]
var c = document.getElementById("myCanvas");
c.width = container.offsetWidth;
c.height = 600;
var ctx = c.getContext("2d");
let time = 6;
let x, y, accuracyTime, currentScore;

let scoreboard = document.getElementsByClassName('scoreboard')[0]
let score = 0;
let gameInterval, gameTimeout;
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
let closeButton = document.getElementsByClassName('close')[0];

closeButton.onclick = function () {
    container.classList.remove('showContainer')
    accuracyButton.classList.add('visible')
    timeButton.classList.add('visible')
    reactionButton.classList.add('visible')

}









timeButton.onclick = function () {
    allowPlay = true;
    mode = 'time';
    removeCards()


}
accuracyButton.onclick = function () {
    mode = 'accuracy'
    removeCards()
    allowPlay = true;


}

reactionButton.onclick = function () {
    mode = 'reaction'

    removeCards()








}

function removeCards() {
    accuracyButton.classList.remove('visible')
    timeButton.classList.remove('visible')
    reactionButton.classList.remove('visible')
    container.classList.add('showContainer')
    createGame();
}

function stopGame(){
    startButton.innerHTML='Start'
    ctx.clearRect(0,0, c.width, c.height);
    scoreboard.innerHTML='Score: 0'
    clearInterval(gameInterval);
}

function createGame() {
    if (mode == 'time') {
        gameMode.innerHTML = 'Time'
        time = 60;
        watch.innerHTML = 'Time: ' + time;
        stopGame();
        startButton.onclick = function () {
            timeMode();

        }
    }
    else if (mode == 'accuracy') {
        gameMode.innerHTML = 'Accuracy'
        watch.innerHTML = 'Circles: 20'
        stopGame();
        startButton.onclick = () => {
            accuracyMode();
        }
    }
    else if (mode == 'reaction') {
        gameMode.innerHTML = 'Reaction' 
        watch.innerHTML = 'Attempts: 20'
        stopGame();



        startButton.onclick = () => {
            reactionMode();
        }
    }
}

function reactionMode() {
    if (startButton.innerHTML == 'Start') {
        startButton.innerHTML = 'Stop'
        attempts = 5;
        score = 10000;
        watch.innerHTML = 'Attempts: ' + attempts;
        getReaction();
    }
    else {
        startButton.innerHTML = 'Start'
        clearInterval(gameInterval);
        ctx.clearRect(0, 0, c.width, c.height);
    }

    allowPlay = true;


}


function getReaction() {
    ctx.clearRect(0, 0, c.width, c.height)
    ctx.beginPath()
    ctx.rect(0, 0, c.width, c.height)
    ctx.fillStyle = 'green'
    // timer = 0;
    randomTime = Math.floor(Math.random() * 9) + 2;
    gameTimeout = setTimeout(function () {
        ctx.fill();
        timer = 0;
        gameInterval = setInterval(() => {

            if (timer < score) {
                timer++;
                scoreboard.innerHTML = 'Score: ' + timer;
            }

        }, 0.1)
    }, randomTime * 1000)
}

function accuracyMode() {




    if (startButton.innerHTML == 'Start') {
        circles = 100;
        score = 0;
        accuracyTime = 1000;
        scoreboard.innerHTML = 'Score: ' + score
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


function accuracyInterval() {
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
    }, accuracyTime)
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
}

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
            accuracyTime = accuracyTime - 5;
            accuracyInterval();

        }

    }

    if (ctx.getImageData(event.offsetX, event.offsetY, 1, 1).data[1] == 128 && allowPlay == true) {
        clearInterval(gameInterval);
        attempts--;
        if(attempts==0){
            startButton.innerHTML='Start'
            
        }
        else{
            getReaction();
        }
        watch.innerHTML = 'Attempts: ' + attempts;
        ctx.clearRect(0, 0, c.width, c.height)
        
        console.log(timer, score);
        score=timer

    }
}