var cv = document.getElementById("tennisCanvas"),
    context = cv.getContext("2d"),
    buttonStart = document.createElement("input"),
    scoreBoard = document.createElement("div"),
    scorePlayer1 = 0,
    scorePlayer2 = 0,
    racket1,
    racket2,
    rackets,
    racketsArea,
    ball,
    balls,
    ballArea,
    setTimeOut;

requestAnimationFrame(move);

// добавляем кнопку Старт
buttonStart.type = "button";
buttonStart.value = "Старт!";
buttonStart.classList.add('buttonStart');
buttonStart = document.body.insertBefore(buttonStart, document.body.children[0]);
buttonStart.onclick = start;

// работа со счетом
scoreBoard.classList.add('scoreBoard');
scoreBoardInnerHTML(); // функция подсчета очков
scoreBoard = document.body.insertBefore(scoreBoard, document.body.children[1]);

// работа с ракетками
rackets = {
    racket1PosX: 0.5,
    racket1PosY: cv.getBoundingClientRect().height/2 - 60,
    racket1Speed: 0,

    racket2PosX: cv.getBoundingClientRect().width - 10,
    racket2PosY: cv.getBoundingClientRect().height/2 - 60,
    racket2Speed: 0,
    width: 10,
    height: 120,

    update: function() {
        context.fillStyle = "#09AA57";
        context.fillRect(this.racket1PosX, this.racket1PosY, this.width, this.height);

        context.fillStyle = "#191497";
        context.fillRect(this.racket2PosX , this.racket2PosY, this.width, this.height);
    }
};

//движение ракеток клавишами
window.addEventListener("keydown", function(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 17) {
        rackets.racket1Speed = 5;
    }

    if (EO.keyCode === 16) {
        rackets.racket1Speed = -5;
    }

    if (EO.keyCode === 40) {
        rackets.racket2Speed = 5;
    }

    if (EO.keyCode === 38) {
        rackets.racket2Speed = -5;
    }
});

window.addEventListener("keyup", function(EO) {
    EO = EO || window.event;
    EO.preventDefault();

    if (EO.keyCode === 17) {
        rackets.racket1Speed = 0;
    }

    if (EO.keyCode === 16) {
        rackets.racket1Speed = 0;
    }

    if (EO.keyCode === 40) {
        rackets.racket2Speed = 0;
    }

    if (EO.keyCode === 38) {
        rackets.racket2Speed = 0;
    }
});

// работа с мячом
balls = {
    posX: cv.getBoundingClientRect().width/2,
    posY: cv.getBoundingClientRect().height/2 - 15,
    speedX: 0,
    speedY: 0,
    width: 30,
    height: 30,
    radius: 15,

    update: function() {
        context.beginPath();
        context.fillStyle = "#F02137";
        context.arc(this.posX, this.posY, this.radius, 0, Math.PI*2, false);
        context.fill();
    }
};

function scoreBoardInnerHTML() {
    scoreBoard.innerHTML = scorePlayer1 + ":" + scorePlayer2;
}

function drawCanvas() {
    var width = 700,
        height = 400,
        canvasX = 0.5,
        canvasY = 0.5;

    context.strokeStyle = "black";
    context.fillStyle = "#F0EE7E";
    context.fillRect(canvasX, canvasY, width, height);
    context.strokeRect(canvasX, canvasY, width-1, height-1);
}

function start() {

    balls.speedX = 8;
    balls.speedY = 3;
}

function move() {
    drawCanvas();
    balls.update();

    // работаем с ракетками
    rackets.update();
    rackets.racket1PosY += rackets.racket1Speed;
    // вылетела ли ракетка ниже пола?
    if (rackets.racket1PosY + rackets.height > (cv.getBoundingClientRect().height)) {
        rackets.racket1PosY = cv.getBoundingClientRect().height - rackets.height;
    }

    // вылетела ли ракетка выше потолка?
    if (rackets.racket1PosY < 0.5) {
        rackets.racket1PosY = 0.5;
    }

    rackets.racket2PosY += rackets.racket2Speed;

    // вылетела ли ракетка ниже пола?
    if (rackets.racket2PosY + rackets.height > (cv.getBoundingClientRect().height)) {
        rackets.racket2PosY = cv.getBoundingClientRect().height - rackets.height;
    }

    // вылетела ли ракетка выше потолка?
    if (rackets.racket2PosY < 0.5) {
        rackets.racket2PosY = 0.5;
    }

    // работаем с мячиком
    balls.posX -= balls.speedX;
    // вылетел ли мяч правее стены?
    if ((balls.posY + balls.height < rackets.racket2PosY || balls.posY > (rackets.racket2PosY + rackets.height))
        && balls.posX + balls.width >= (cv.getBoundingClientRect().left + cv.getBoundingClientRect().width + 7)) {
        scorePlayer1 += 1;
        scoreBoardInnerHTML();
        balls.speedX = 0;
        balls.speedY = 0;

        balls.posX = cv.getBoundingClientRect().left + cv.getBoundingClientRect().width - balls.width + 6;

        setTimeOut = window.setTimeout(function () {

            balls.posX = cv.getBoundingClientRect().left + rackets.width;
            balls.posY = rackets.racket1PosY + rackets.height / 2;
            start();
        }, 2000);

    } else if (!(balls.posY + balls.height < rackets.racket2PosY + 16 || balls.posY > (rackets.racket2PosY + 16 + rackets.height))
        && balls.posX + balls.width > (rackets.racket2PosX + 16)) {
        balls.speedX = -balls.speedX;
        balls.posX = cv.getBoundingClientRect().left + cv.getBoundingClientRect().width - rackets.width - balls.width + 7;
    }

    // вылетел ли мяч левее стены
    if ((balls.posY + balls.height < rackets.racket1PosY || balls.posY > (rackets.racket1PosY + rackets.height))
        && balls.posX <= (cv.getBoundingClientRect().left + 7)) {

        scorePlayer2 += 1;
        scoreBoardInnerHTML();
        balls.speedX = 0;
        balls.speedY = 0;

        balls.posX = cv.getBoundingClientRect().left + 8;

        setTimeOut = window.setTimeout(function () {
            balls.posX = cv.getBoundingClientRect().left + cv.getBoundingClientRect().width - rackets.width;
            balls.posY = rackets.racket2PosY + rackets.height / 2;
            start();
        }, 2000);

    } else if (!(balls.posY + balls.height < rackets.racket1PosY + 16 || balls.posY > (rackets.racket1PosY + 16 + rackets.height))
        && balls.posX < (rackets.width + rackets.racket1PosX + 16)) {
        balls.speedX = -balls.speedX;
        balls.posX = cv.getBoundingClientRect().left + rackets.width + 7;
    }

    balls.posY -= balls.speedY;
    // вылетел ли мяч ниже пола?
    if (balls.posY + balls.height > (cv.getBoundingClientRect().height + 16)) {
        balls.speedY = -balls.speedY;
        balls.posY = cv.getBoundingClientRect().height - balls.height + 16;
    }

    // вылетел ли мяч выше потолка?
    if (balls.posY < 0.5 + 16) {
        balls.speedY = -balls.speedY;
        balls.posY = 0.5 + 16;
    }

    balls.update();

    requestAnimationFrame(move);
}