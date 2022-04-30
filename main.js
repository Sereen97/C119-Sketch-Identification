function setup()
{
    canvas= createCanvas(400,400);
    canvas.center();
    background("white");
    canvas.mouseReleased(ClassifyCanvas);
    synth=window.speechSynthesis;
    
}

function preload()
{
    classifier= ml5.imageClassifier('DoodleNet');
}

function clearCanvas()
{
    background("white");
}

function draw()
{
    strokeWeight(11);
    stroke(0);
    if (mouseIsPressed)
    {
        line (pmouseX, pmouseY, mouseX, mouseY);
    }
}

function ClassifyCanvas()
{
    classifier.classify(canvas,gotResult);
}

function gotResult(error,results)
{
    if (error) 
    {
        console.log(error);
    }
    else{
    console.log(results);
    document.getElementById('label').innerHTML='label:'+ results[0].label;

    document.getElementById('confidence').innerHTML='confidence:'+ Math.round(results[0].confidence * 100)+ '%;'

    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speech(utterThis);   
    }
}