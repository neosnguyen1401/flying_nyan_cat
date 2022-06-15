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

// Create a gradient color for score
const gradient = ctx.createLinearGradient(0, 0, 0, 70);
gradient.addColorStop('0.4', '#fff');
gradient.addColorStop('0.5', '#000');
gradient.addColorStop('0.55', '#4040ff');
gradient.addColorStop('0.6', '#000');
gradient.addColorStop('0.9', '#fff');

// Create background
const background = new Image();
background.src = './img/bg.png'
const BG = {
    x1: 0,
    x2: canvas.width,
    y: 0,
    width: canvas.width,
    height: canvas.height
}

// Create background loop by drawing 2 background next to each other constantly
function handleBackground() {
    if (BG.x1 <= -BG.width + gamespeed) BG.x1 = BG.width;
    else BG.x1 -= gamespeed;
    if (BG.x2 <= -BG.width + gamespeed) BG.x2 = BG.width;
    else BG.x2 -= gamespeed;
    ctx.drawImage(background, BG.x1, BG.y, BG.width, BG.height);
    ctx.drawImage(background, BG.x2, BG.y, BG.width, BG.height);
}

// Create a function to wrap everything up and render the game
function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    handleBackground();
    handleBuilding();
    handleRainbow();
    cat.update();
    cat.draw();
    // Showing live score on the upper right corner of canvas
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

// Create a function to hide the title when game start and start rendering the game
document.addEventListener('keypress', handleStart, { once: true })
function handleStart() {
    title.classList.add('hide'); 
    animate();
}

// An event listener to control the spacePressed variable
window.addEventListener('keydown', function(e) {
    if (e.code === 'Space') spacePressed = true});
window.addEventListener('keyup', function(e) {
    if (e.code === 'Space') spacePressed = false});

// Create a function to handle the game when hit, lose
const bonk = new Image();
bonk.src = "./img/bonk.png";

function handleCollisioins() {
    for (let i = 0; i < buildingArray.length; i++) {
        // Conditions when hit
        if (cat.x < buildingArray[i].x + buildingArray[i].width && 
            cat.x + cat.width > buildingArray[i].x &&
            ((cat.y < 0 + buildingArray[i].top && cat.y + cat.height > 0) ||
            (cat.y > canvas.height - buildingArray[i].bottom &&
            cat.y + cat.height < canvas.height))) {
                // Draw an image at the hit point
                ctx.drawImage(bonk, cat.x, cat.y, 50, 50);
                ctx.font = '30px Georgia';
                ctx.fillStyle = 'white';
                // Show final score
                ctx.fillText('Game Over, your score is ' + score, 150, canvas.height/2);
                // Reload the page for new game when "Enter" is pressed
                ctx.fillText('Press Enter to play again', 160, canvas.height/2 + 40);
                window.addEventListener('keypress', function(e) {
                    if (e.code === 'Enter') setTimeout(() => location.reload(), 100);});
                return true;
            }
    }
}