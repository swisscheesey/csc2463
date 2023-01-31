let currentColor;
let black;
let red;
let orange;
let yellow;
let green;
let cyan;
let blue;
let white;
let pink;
let brown;

function setup() {
  createCanvas(700, 500);
  background(255);
  currentColor = 0;
  black = new colorBox(0,"black");
  red = new colorBox(50,"red");
  orange = new colorBox(100,"orange");
  yellow = new colorBox(150,"yellow");
  green = new colorBox(200,"limegreen");
  cyan = new colorBox(250, "cyan");
  blue = new colorBox(300, "blue");
  white = new colorBox(350, "white");
  pink = new colorBox(400, "magenta");
  brown = new colorBox(450, "sienna");
}

function draw() {
  if(mouseIsPressed){
    if(mouseX > 51){
      drawing();
    }
  }

  black.appear();
  black.onMousePressed();
  red.appear();
  orange.appear();
  yellow.appear();
  green.appear();
  cyan.appear();
  blue.appear();
  white.appear();
  pink.appear();
  brown.appear();
}

class colorBox{
  constructor(y, color){
    this.x = 0;
    this.y = y;
    this.w = 50;
    this.h = 50;
    this.color = color;
  }
  appear(){
    push();
    noStroke();
    fill(this.color);
    rect(this.x,this.y,this.w,this.h);
    pop();
  }

  onMousePressed(){
    if(mouseIsPressed){
      if(mouseX < 50){
        if(mouseY > 0 && mouseY < 50){
          currentColor = "black";
        }
        else if (mouseY > 50 && mouseY < 100){
          currentColor = "red";
        }
        else if (mouseY > 100 && mouseY < 150){
          currentColor = "orange";
        }
        else if (mouseY > 150 && mouseY < 200){
          currentColor = "yellow";
        }
        else if (mouseY > 200 && mouseY < 250){
          currentColor = "limegreen";
        }
        else if (mouseY > 250 && mouseY < 300){
          currentColor = "cyan";
        }
        else if(mouseY > 300 && mouseY < 350){
          currentColor = "blue";
        }
        else if(mouseY > 350 && mouseY < 400){
          currentColor = "white";
        }
        else if(mouseY > 400 && mouseY < 450){
          currentColor = "magenta";
        }
        else if(mouseY > 450 && mouseY < 500){
          currentColor = "sienna";
        }
    }
  }
 }
}

function drawing(){
  push();
  stroke(currentColor);
  strokeWeight(10);
  line(pmouseX, pmouseY, mouseX, mouseY);
  pop();
}
