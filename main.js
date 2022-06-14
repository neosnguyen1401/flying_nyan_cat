const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = 600;
canvas.height = 400;
const title = document.querySelector('.title');

let spacePressed = false;
let angle = 0;
let hue = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

const background = new Image();
background.src = './img/bg.png'
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}
function handleBackground() {
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed;
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else BG.x2 -= gamespeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    //ctxfillRect(10, canvas.height - 90, 50, 50);
    handleBackground();
    handleBuilding();
    handleRainbow();
    cat.update();
    cat.draw();
    ctx.fillStyle = gradient;
    ctx.font = '70px Georgia';
    ctx.strokeText(score, 500, 70);
    ctx.fillText(score, 500, 70);
    handleCollisioins();
    if (handleCollisioins()) return;
    requestAnimationFrame(animate);
    angle += 0.12;
    hue += 1;
    frame += 1;
}

document.addEventListener('keypress', handleStart, { once: true })

function handleStart() {
    title.classList.add('hide');
    animate();
}

function handleLose() {
    setTimeout(() => location.reload(), 100);
    
}

window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true});
window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false});

const bonk = new Image();
bonk.src = "./img/bonk.png";

function handleCollisioins() {
    for (let i = 0; i < buildingArray.length; i++) {
        if (cat.x < buildingArray[i].x + buildingArray[i].width &&
            cat.x + cat.width > buildingArray[i].x &&
            ((cat.y < 0 + buildingArray[i].top && cat.y + cat.height > 0) ||
            (cat.y > canvas.height - buildingArray[i].bottom &&
            cat.y + cat.height < canvas.height))) {
                ctx.drawImage(bonk, cat.x, cat.y, 50, 50);
                ctx.font = '30px Georgia';
                ctx.fillStyle = 'white';
                ctx.fillText('Game Over, your score is ' + score, 150, canvas.height/2);
                ctx.fillText('Press Enter to play again', 160, canvas.height/2 + 40);
                window.addEventListener('keypress', function(e) {
                    if (e.code === 'Enter') handleLose()});
                return true;
            }
    }
}