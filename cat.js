const catImg = new Image();
catImg.src = './img/cat.png'
class Cat {
    constructor() {
        this.x = 150;
        this.y = 200;
        this.vy = 0;
        this.width = 35;
        this.height = 21;
        this.weight = 1;
    }
    update() {
        // Make the cat floating when idle
        let Curve = Math.sin(angle) * 20;
        // Set the lowest position the cat can fly
        if (this.y > canvas.height - (this.height * 3) + Curve) {
            this.y = canvas.height - (this.height * 3) + Curve;
            this.vy = 0;
        } else {
            // Make the cat drop
            this.vy += this.weight;
            this.vy *= 0.9;
            this.y += this.vy;
        }
        // Setting the highest positioin the cat can fly
        if (this.y < 0 + this.height) {
            this.y = 0;
            this.vy = 0;
        }
        // Run the fly() function when "Space" is pressed
        if (spacePressed && this.y > this.height * 3) this.fly(); 
    }
    draw() {
        //ctx.fillStyle = 'red';
        //ctx.fillRect(this.x, this.y, this.width, this.height); // The hit box with red color
        ctx.drawImage(catImg, this.x, this.y, this.width, this.height);  
    }
    fly() {
        this.vy -= 2;
    }
}
const cat = new Cat();