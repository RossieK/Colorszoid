//Global selections and variables
const colorDivs = document.querySelectorAll('.color');
const generateBtn = document.querySelector('.generate');
const sliders = document.querySelectorAll('input[type="range"]');
const currentHexes = document.querySelectorAll('.color h2');
let initialColors;

//Functions

//Color generator
function generateHex() {
    const hexColor = chroma.random();
    return hexColor;
}

function randomColors() {
    colorDivs.forEach((div, index) => {
        const hexText = div.children[0];
        const randomColor = generateHex();

        //Add color to the background
        div.style.backgroundColor = randomColor;
        hexText.innerText = randomColor;

        //Check for contrast
        checkTextContrast(randomColor, hexText);

        //Initial colorize sliders
        const color = chroma(randomColor);
        const sliders = div.querySelectorAll('.sliders input');
        const hue = sliders[0];
        const brightness = sliders[1];
        const saturation = sliders[2];

        colorizeSliders(color, hue, brightness, saturation);
    })
}

function checkTextContrast(color, text) {
    const luminance = chroma(color).luminance();

    if (luminance > 0.5) {
        text.style.color = "black";
    } else {
        text.style.color = "white";
    }
}

function colorizeSliders(color, hue, brightness, saturation) {
    //Scale saturation
    const noSaturation = color.set('hsl.s', 0);
    const fullSaturation = color.set('hsl.s', 1);
    const scaleSaturation = chroma.scale([noSaturation, color, fullSaturation]);
    //Scale brightness
    const midBright = color.set("hsl.l", 0.5);
    const scaleBrightness = chroma.scale(['black', midBright, 'white']);

    //Update input colors
    saturation.style.backgroundImage = `linear-gradient(to right, ${scaleSaturation(0)}, ${scaleSaturation(1)})`;
    brightness.style.backgroundImage = `linear-gradient(to right, ${scaleBrightness(0)}, ${scaleBrightness(0.5)}, ${scaleBrightness(1)})`;
    hue.style.backgroundImage = `linear-gradient(to right, rgb(204, 75, 75), rgb(204, 204, 75), rgb(75, 204, 75), rgb(75, 204,204), rgb(75, 75, 204), rgb(204, 75, 204), rgb(204, 75, 75))`
}

randomColors();