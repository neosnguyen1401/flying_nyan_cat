const buildingArray = [];

class Building {
    constructor() {
        this.top = (Math.random() * canvas.height / 3) + 20;
        this.bottom = (Math.random() * canvas.height / 3) + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = 'hsla(' + hue + ', 100%, 50%, 1)';
        this.counted = false;
    }
    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    update() {
        this.x -= gamespeed;
        if (!this.counted && this.x < cat.x) {
            score += 1;
            this.counted = true;
        }
        this.draw();
    }
}

function handleBuilding() {
    if (frame % 50 === 0) {
        buildingArray.unshift(new Building);
    }
    for (let i = 0; i < buildingArray.length; i++) {
        buildingArray[i].update();
    }
    if (buildingArray.length > 20) {
        buildingArray.pop(buildingArray[0]);
    }
}