
// Use capturer to save frames that you can export as a gif
// Unzip, cd to the folder and then export like this:
// ffmpeg -r 30 -f image2 -s 600x600 -i "%07d.png" -vcodec libx264 -crf 17 -pix_fmt yuv420p output.mp4
var capturer = new CCapture({ format: 'png', framerate: 30 });

// Whether to save frames
var capture = false

// t is the time variable (useful for making perfectly looping gifs)
var t = 0

function setup()
{
    // Create canvas
    var canvas = createCanvas(600, 600);
    canvas.parent('sketch-holder');

    // Plot the "paper texture" on a different graphics object
    texture_graphics = createGraphics(width, height);
    drawNoiseBackground(100000, texture_graphics);

    if(capture)
    {
        capturer.start();
    }
}

function draw()
{
    background(255)

    t += TWO_PI/100

    // Draw outer circle
    push()
        translate(.5*width, .5*height)
        rotate(t)
        strokeWeight(2)
        arc(0, 0, .8*height, .8*height, 0, .75*TWO_PI)
    pop()

    // Draw outer circle
    push()
        translate(.5*width, .5*height)
        rotate(-t)
        strokeWeight(2)
        arc(0, 0, .4*height, .4*height, 0, .75*TWO_PI)
    pop()

    // Imprint the "paper texture" after everything is drawn
    image(texture_graphics, 0, 0)

    if (t >= TWO_PI)
    {
        // Reset time
        //t = 0

        // End capture
        if(capture)
        {
            noLoop()
            capturer.stop()
            capturer.save()
            return
        }
    }

    // Capture frame
    if(capture)
    {
        capturer.capture(document.getElementById('defaultCanvas0'))
    }
}

function drawNoiseBackground(_n, _graphics)
{
    let c = color(0, 0, 0, 4);
    for (let i = 0; i < _n; i++)
    {
        let x = random(1) * width;
        let y = random(1) * height;
        let w = random(1, 4);
        let h = random(1, 4);
        _graphics.noStroke();
        _graphics.fill(c);
        _graphics.ellipse(x, y, w, h);
    }
}