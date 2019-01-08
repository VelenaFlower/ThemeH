var cv = document.getElementById("wrapper"),
    context = cv.getContext("2d"),
    cvCenterX = cv.offsetWidth / 2, // центр canvas X
    cvCenterY = cv.offsetHeight / 2, // центр canvas Y
    radius = 120,
    angleValue = 0, // угол
    distanceOfDigits = 30, // расстояние(в градусах) между цифрами на часах
    // для электронных часов
    digitalWatch,
    digitalWatchText,
    digitalWatchWidth = 90,
    digitalWatchHeight = 25,
    radiusForDigitalWatch = 70, // радиус  для электронных часов;
    // (для стрелки часов)
    elemForArrowHours,
    elemForArrowHoursHeight = 50,
    elemForArrowHoursWidth = 9,
    // для стрелки минут
    elemForArrowMinutes,
    elemForArrowMinutesHeight = 110,
    elemForArrowMinutesWidth = 5,
    // для стрелки секунд
    elemForArrowSeconds,
    elemForArrowSecondsHeight = 135,
    elemForArrowSecondsWidth = 2,
    hoursDeg, // где должна быть стрелка часов
    minutesDeg, // где должна быть стрелка минут
    secondsDeg, // где должна быть стрелка секунд
    hourDigits = 12;

function bigWatch() {
    context.fillStyle = "#FCCA66";
    context.beginPath();
    context.arc(cvCenterX,cvCenterY,150,0,Math.PI*2, false);
    context.fill();

    for (var i = 1; i <= hourDigits; i++) {
        var smallCircleCX,
            smallCircleCY,
            smallCircleRadius = 20,
            smallCircleColor = "#48B382",
            angle;

        angleValue += distanceOfDigits;
        angle = angleValue / 180 * Math.PI;

        smallCircleCX = Math.round(cvCenterX + radius * Math.sin(angle));
        smallCircleCY = Math.round(cvCenterY - radius * Math.cos(angle));

        context.beginPath();
        context.fillStyle = smallCircleColor;
        context.arc(smallCircleCX,smallCircleCY,smallCircleRadius,0,Math.PI*2, false);
        context.fill();

        context.fillStyle ='black';
        context.font ="normal normal 20px 'Times New Roman'";
        context.textAlign="center";
        context.textBaseline="middle";
        context.fillText(i,smallCircleCX, smallCircleCY);
    }
}

// для электронных часов
function digitalWatch() {
    var time = new Date(); //текущее время
    context.globalCompositeOperation = "source-over";
    context.fillStyle = "#FCCA66";
    context.beginPath();
    context.fillRect(cvCenterX - digitalWatchWidth/2, cvCenterY - radiusForDigitalWatch - digitalWatchHeight/2, 100, 25);
    context.fill();

    context.fillStyle = "black";
    digitalWatchText = time.toLocaleTimeString();
    context.font ="normal normal 25px 'Times New Roman'";
    context.textAlign='center';
    context.textBaseline='middle';
    context.fillText(digitalWatchText, cvCenterX, cvCenterY - radiusForDigitalWatch);
    context.fill();
}

// для стрелок часов
function hoursArrow() {
    var time = new Date();
    hoursDeg = 30 * (time.getHours() + (1 / 60) * time.getMinutes());
    context.strokeStyle = "black";
    context.lineWidth = elemForArrowHoursWidth;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(cvCenterX, cvCenterY);
    context.lineTo(cvCenterX + elemForArrowHoursHeight * Math.sin(hoursDeg/180 * Math.PI),
        cvCenterY - elemForArrowHoursHeight * Math.cos(hoursDeg/180 * Math.PI));
    context.stroke();
}
// для стрелки минут
function minutesArrow() {
    var time = new Date();
    minutesDeg = 6 * (time.getMinutes() + (1 / 60) * time.getSeconds());
    context.strokeStyle = "black";
    context.lineWidth = elemForArrowMinutesWidth;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(cvCenterX, cvCenterY);
    context.lineTo(cvCenterX + elemForArrowMinutesHeight * Math.sin(minutesDeg/180 * Math.PI),
        cvCenterY - elemForArrowMinutesHeight * Math.cos(minutesDeg/180 * Math.PI));
    context.stroke();
}

// для стрелки секунд
function secondsArrow() {
    var time = new Date();
    secondsDeg = 6 * time.getSeconds();
    context.strokeStyle = "black";
    context.lineWidth = elemForArrowSecondsWidth;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(cvCenterX, cvCenterY);
    context.lineTo(cvCenterX + elemForArrowSecondsHeight * Math.sin(secondsDeg/180 * Math.PI),
        cvCenterY - elemForArrowSecondsHeight * Math.cos(secondsDeg/180 * Math.PI));
    context.stroke();
}

// функция для определения положение электронных часов и стрелок для часов, минут, секунд
function ShowArrows() {
    bigWatch();
    digitalWatch();
    hoursArrow();
    minutesArrow();
    secondsArrow();
}

window.onload = ShowArrows();
window.setInterval (ShowArrows, 1000);