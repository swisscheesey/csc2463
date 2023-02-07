let spriteSheet;
let spriteSheet2;
let walkingAnimation;
let walkingAnimation2;
let walkingAnimation3;

function preload(){
  spriteSheet = loadImage("assets/SpelunkyGuy.png");
  spriteSheet2 = loadImage("assets/cyclops.png");
  spriteSheet3 = loadImage("assets/meatboy.png");
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);

  walkingAnimation = new WalkingAnimation(spriteSheet,80,80,300,200,9);
  walkingAnimation2 = new WalkingAnimation(spriteSheet,80,80,120,180,9);
  walkingAnimation3 = new WalkingAnimation(spriteSheet2,80,80,200,300,9);
  walkingAnimation4 = new WalkingAnimation(spriteSheet3,80,80,100,100,9);
}

function draw() {
  background(220);

  walkingAnimation.draw();
  walkingAnimation2.draw();
  walkingAnimation3.draw();
  walkingAnimation4.draw();
}

function keyPressed(){
 

  walkingAnimation.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation2.keyPressed(LEFT_ARROW,RIGHT_ARROW);
  walkingAnimation3.keyPressed(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation4.keyPressed(LEFT_ARROW,RIGHT_ARROW);
}

function keyReleased(){
 

  walkingAnimation.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation2.keyReleased(LEFT_ARROW,RIGHT_ARROW);
  walkingAnimation3.keyReleased(RIGHT_ARROW,LEFT_ARROW);
  walkingAnimation4.keyReleased(LEFT_ARROW,RIGHT_ARROW);
}

class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength){
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 0;
    this.xDirection = 1;
  }

  draw() {

  this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : 0;
  push();
  translate(this.dx, this.dy);
  scale(this.xDirection,1);

  image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw,this.v*this.sh,this.sw,this.sh);
  pop();

  if(frameCount % 6 == 0){
    this.currentFrame++;
  }

  this.dx += this.moving;
}
  keyPressed(right, left){
  if(keyCode === right){
    this.moving = 1;
    this.xDirection = 1;
    this.currentFrame = 1;
  } else if(keyCode === left){
    this.moving = -1;
    this.xDirection = -1;
    this.currentFrame = 1;
  }
}

  keyReleased(right, left){
  if(keyCode === right || keyCode === left){
    this.moving = 0;
  }
}
}
