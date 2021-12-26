video = "";
objects = [];
Status = "";

function preload() {
    video = createVideo('video.mp4');
    video.hide();
}

function setup() {
    canvas = createCanvas(480, 380);
    canvas.center();
}

function draw() {
    image(video, 0, 0, 480, 380);
    if(Status != "")
    {
       objectDetector.detect(video, gotResult);
       for (i = 0; i < objects.lenght; i++) {
           document.getElementById("status").innerHTML = "Status : Objects Detected";
           document.getElementById("number_of_objects").innerHTML = "Number of objects detected are : " + objects.length;

           fill("#FF69B4");
           percent = floor(objects[i].confidence * 100);
           text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
           noFill();
           stroke("#FF69B4");
           rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
       }
    }
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting Objects";
}

function modelLoaded() {
    console.log("Model Loaded!");
    Status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
    else
    {
        console.log(results);
        objects = results;
    }
}