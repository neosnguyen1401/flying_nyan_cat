const buildingArray = [];

class Building {
    constructor() {
        this.top = (Math.random() * canvas.height / 3) + 25;
        this.bottom = (Math.random() * canvas.height / 3) + 25;
        this.x = canvas.width; // Spawn at the right edge of canvas
        this.width = 25;
        this.color = 'hsla(' + hue + ', 100%, 50%, 1)'; // Rainbow color
        this.counted = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top); // Top building
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom); // Bottom building
    }
    update() {
        this.x -= gamespeed; // Constantly move the buildings to the left
        // Counting the score
        if (!this.counted && this.x < cat.x) {
            score += 1;
            this.counted = true;
        }
        this.draw();
    }
}

function handleBuilding() {
    // Use array to constantly spawn buildings
    if (frame % 40 === 0) { // Distance between buildings
        buildingArray.unshift(new Building);
    }
    for (let i = 0; i < buildingArray.length; i++) {
        buildingArray[i].update();
    }
    // Remove out-of-screen buildings to avoid perfomance issue
    if (buildingArray.length > 20) {
        buildingArray.pop(buildingArray[0]);
    }
}