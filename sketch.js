const canvas = document.getElementById('canvas');


const canvasSketch = require('canvas-sketch');
const math = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const color = require('canvas-sketch-util/color');

const settings = {
    dimensions: [1080, 1080]
};

/* const degToRad = (degrees) => {
    return degrees / 180 * Math.PI;
}

const randomRange = (min, max) => {
    return Math.random() * (max - min) + min;
} */

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

const sketch = () => {
    return ({ context, width, height }) => {
        context.fillStyle = getRandomColor();
        context.fillRect(0, 0, width, height);

        context.fillStyle = getRandomColor();

        const cx = width * 0.5;
        const cy = height * 0.5;
        const w = width * 0.01;
        const h = height * 0.1;
        let x, y;

        const num = 40;

        for (let i = 0; i < num; i++) {

            const slice = math.degToRad(360 / num);
            const angle = slice * i;
            const radius = width * 0.3;

            x = cx + radius * Math.sin(angle);
            y = cy + radius * Math.cos(angle);

            context.save();
            context.translate(x, y);
            context.rotate(-angle);
            context.scale(random.range(0.1, 2), random.range(0.5, 0.5));

            context.beginPath();
            context.rect(-w * 0.5, random.range(0, -h * 0.5), w, h);
            context.fill();
            context.restore();

            context.save();
            context.translate(cx, cy);
            context.rotate(-angle);

            context.lineWidth = random.range(5, 20)
            context.strokeStyle = getRandomColor()

            context.beginPath();
            context.arc(0, 0, radius * random.range(0.7, 1.3), slice * random.range(0, -8), slice * random.range(0, 5));
            context.stroke();


            context.restore();

        }


    };
}

canvasSketch(sketch, settings);