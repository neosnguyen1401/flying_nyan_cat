const rainbowArray = [];

class Rainbow {
    constructor() {
        // Make the rainbow follow the cat
        this.x = cat.x;
        this.y = cat.y;

        this.size = Math.random() * 7 + 3;
        this.speedY = (Math.random() * 1) - 0.5;
        this.color = 'hsla(' + hue + ', 100%, 50%, 0.8)'; // Rainbow gradient color
    }
    update() {
        // Leave the rainbow trail
        this.x -= gamespeed;
        this.y += this.speedY;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function handleRainbow() {
    // Use array to constantly spawn rainbow
    rainbowArray.unshift(new Rainbow);
    for (let i = 0; i < rainbowArray.length; i++) {
        rainbowArray[i].update();
        rainbowArray[i].draw();
    }

    // Remove out-of-screen rainbow to avoid perfomance issue
    if (rainbowArray.length > 200) {
        for (let i = 0; i < 20; i++) {
            rainbowArray.pop(rainbowArray[i]);
        }
    }
}