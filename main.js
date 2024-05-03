import { createCanvas, loadImage } from 'canvas';
import colors from 'colors'; // Ignore the unused import warning here, this adds methods to the String prototype
import fs from 'fs';

// Create the skins directory if it doesn't exist
if (!fs.existsSync('./skins')) {
    fs.mkdirSync('./skins');

    console.log("The /skins directory didn't exist. I created it for you.".yellow);
}

// Check if the required images exist and if they have the correct resolution
const requiredImages = [
    {
        name: 'baseskin.png',
        resolutions: [ [ 64, 32 ], [ 64, 64 ] ]
    },
    {
        name: 'template.png',
        resolutions: [ [ 72, 24 ] ]
    }
]

for (const image of requiredImages) {
    if (!fs.existsSync(`./${image.name}`)) {
        console.error(`${image.name} was not found. Please make sure it exists in the root directory.`.red);
        process.exit(1);
    }

    await loadImage(`./${image.name}`).then((img) => {
        const { width, height } = img;

        if (!image.resolutions.some((res) => res[0] === width && res[1] === height)) {
            console.error(`${image.name} has an incorrect resolution. Please make sure it is ${image.resolutions.map((res) => `${res[0]}x${res[1]}`).join(' or ')}.`.red);
            process.exit(1);
        }
    });
}

// Loop backwards, skins are sorted from most to least recent
let i = 1;
for (let y = 2; y >= 0; y--) {
    for (let x = 8; x >= 0; x--) {
        const canvas = createCanvas(64, 32),
            ctx = canvas.getContext('2d');

        const baseSkin = await loadImage('./baseskin.png');
        ctx.drawImage(baseSkin, 0, 0, 64, 32);

        const template = await loadImage('./template.png');
        ctx.drawImage(template, 8 * x, 8 * y, 8, 8, 8, 8, 8, 8);

        // Generate random noise for the skin to be unique
        const makeNoise = (width, height) => {
            const noise = ctx.createImageData(width, height);

            for (let i = 0; i < noise.data.length; i += 4) {
                // RGBA
                [ ...Array(3) ].forEach((_, j) => noise.data[i + j] = Math.floor(Math.random() * 256));

                noise.data[i + 3] = 255;
            }

            return noise;
        }

        ctx.putImageData(makeNoise(2, 2), 19, 3);
        
        const filename = `skin_${i++}.png`,
            out = fs.createWriteStream(`./skins/${filename}`),
            stream = canvas.createPNGStream();

        stream.pipe(out);
        out.on('finish', () => console.log(`Generated ` + `${filename}`.brightCyan + ` (${x},${y})`.magenta));
    }
}