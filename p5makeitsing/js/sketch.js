let initTone = true;
let pitch = 950;
let pitch2 = 300;
let pitch3 = 150;
let pitch4 = 100;
// Set up Tone
let osc = new Tone.AMOscillator(pitch, 'sine', 'sine').start()
let gain = new Tone.Gain().toDestination();
let pan = new Tone.Panner().connect(gain);
let ampEnv = new Tone.AmplitudeEnvelope({
  attack: 1.0,
  decay: 3.0,
  sustain: 0.0,
  release: 3.5
}).connect(pan);
osc.connect(ampEnv);

let osc2 = new Tone.AMOscillator(pitch2, 'sine', 'sine').start()
let gain2 = new Tone.Gain().toDestination();
let pan2 = new Tone.Panner().connect(gain2);
let ampEnv2 = new Tone.AmplitudeEnvelope({
  attack: 1.0,
  decay: 3.0,
  sustain: 0.0,
  release: 3.5
}).connect(pan2);
osc2.connect(ampEnv2);

let osc3 = new Tone.AMOscillator(pitch3, 'sine', 'sine').start()
let gain3 = new Tone.Gain().toDestination();
let pan3 = new Tone.Panner().connect(gain3);
let ampEnv3 = new Tone.AmplitudeEnvelope({
  attack: 5.0,
  decay: 5.0,
  sustain: 0.0,
  release: 3.5
}).connect(pan3);
osc3.connect(ampEnv3);

let osc4 = new Tone.AMOscillator(pitch4, 'sine', 'sine').start()
let gain4 = new Tone.Gain().toDestination();
let pan4 = new Tone.Panner().connect(gain4);
let ampEnv4 = new Tone.AmplitudeEnvelope({
  attack: 8.0,
  decay: 5.0,
  sustain: 0.0,
  release: 4.5
}).connect(pan4);
osc4.connect(ampEnv4);

function setup() {
  createCanvas(400, 400);
}

let song = new Tone.Player("assets/squish.wav");
let spriteSheet;
let spriteSheet2;
let walkingAnimation;
let walkingAnimation2;
let walkingAnimation3;
const delay = new Tone.FeedbackDelay("8n", 0.5);

let spriteSheetFilenames = ["bug.png"];
let spriteSheets = [];
let animations = [];

const GameState = {
  Start: "Start",
  Playing: "Playing",
  GameOver: "GameOver"
};

let game = { score: 0, maxScore: 0, maxTime: 30, elapsedTime: 0, totalSprites: 50, state: GameState.Start };

function preload(){
  for(let i=0; i < spriteSheetFilenames.length; i++){
    spriteSheets[i] = loadImage("assets/" + spriteSheetFilenames[i]);
  } 
  song.toDestination;
}

function setup() {
  createCanvas(400, 400);
  imageMode(CENTER);
  angleMode(DEGREES);

  reset();
}


function reset() {
  game.elapsedTime = 0;
  game.score = 0;
  game.totalSprites = 50;

  animations = [];
  for(let i=0; i < game.totalSprites; i++){
    animations[i] = new WalkingAnimation(random(spriteSheets), 80, 80, random(100,300),random(100,300), 4, random(1,2), 6,random([0,1]));
  }

}

function draw() {

  switch(game.state) {
    case GameState.Playing:
     ampEnv4.triggerAttackRelease('4n');
     ampEnv4.triggerAttackRelease('4n', '+1');
     ampEnv4.triggerAttackRelease('4n', '+2');
     ampEnv4.triggerAttackRelease('4n', '+3');
     ampEnv3.triggerAttackRelease('8n', '+4');
     background(220);
     for(let i=0; i < animations.length; i++) {
     animations[i].draw();
     }
     fill(0);
     textSize(40);
     text(game.score,30,40);
     let currentTime = game.maxTime - game.elapsedTime;
     text(ceil(currentTime), 355,40);
     game.elapsedTime += deltaTime / 1000;
     if(currentTime < 0){
     game.state = GameState.GameOver;
     }
      break;
    case GameState.GameOver:
      game.maxScore = max(game.score,game.maxScore);

      background(0);
      fill(255);
      textSize(40);
      textAlign(CENTER);
      text("Game Over",200,200);
      textSize(35);
      text("Score: " + game.score,200,270);
      text("Max Score: " + game.maxScore,200,320);
      break;
    case GameState.Start:
     ampEnv3.triggerAttackRelease('24n');
     ampEnv3.triggerAttackRelease('4n');
     //ampEnv2.triggerAttackRelease('24n');
      background(0);
      fill(255);
      textSize(50);
      textAlign(CENTER);
      text("Bugsquish Game",200,200);
      textSize(30);
      text("Press Any Key to Start",200,300)
      break;
  }
  
}

function keyPressed() {
  switch(game.state) {
    case GameState.Start:
      game.state = GameState.Playing;
     // backgroundMusic();
      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }
}

function mousePressed() {
  switch(game.state) {
    case GameState.Playing:
      for (let i=0; i < animations.length; i++){
        let contains = animations[i].contains(mouseX,mouseY);
        if(contains){
          if (animations[i].moving != 0){   //this is what makes a click on dead bug to move bug again
            animations[i].stop();             //
            game.score += 1;                   //
            ampEnv.triggerAttackRelease('64n');
            //song.start();
          } else {                               //
            if(animations[i].xDirection === 1){    //
              animations[i].moveRight();           //
            } else {                               //
              animations[i].moveLeft();            //
            }
          }
          animations[i].stop();             //this is what stops the bug
        }
        if(!contains){
          ampEnv2.triggerAttackRelease('64n');
        }
        
      }

      break;
    case GameState.GameOver:
      reset();
      game.state = GameState.Playing;
      break;
  }

}


class WalkingAnimation {
  constructor(spritesheet, sw, sh, dx, dy, animationLength, speed, framerate, vertical = false){
    this.spritesheet = spritesheet;
    this.sw = sw;
    this.sh = sh;
    this.dx = dx;
    this.dy = dy;
    this.u = 0;
    this.v = 0;
    this.animationLength = animationLength;
    this.currentFrame = 0;
    this.moving = 1;
    this.xDirection = 1;
    this.speed = speed;
    this.framerate = framerate*speed;
    this.vertical = vertical;
  }

  draw() {
  

  this.u = (this.moving != 0) ? this.currentFrame % this.animationLength : this.u;   //death animation
  push();
  translate(this.dx, this.dy);
   if(!this.vertical){
    rotate(270);
  }
  if(this.xDirection == 1){
    rotate(180);
  }
  scale(this.xDirection,1);

  //rect(-26,-35,50,70);      //SHOW HITBOX

  image(this.spritesheet,0,0,this.sw,this.sh,this.u*this.sw,this.v*this.sh,this.sw,this.sh);
  pop();
  let proportionalFramerate = round(frameRate() / this.framerate);

  if(frameCount % proportionalFramerate == 0){
    this.currentFrame++;
  }
  if(this.vertical){
    this.dy += (this.moving * this.speed);
    //this.turnAround();
    this.move(this.dy,this.sw / 4, height - this.sw / 4);
  } else {
    this.dx += (this.moving * this.speed);
    //this.turnAround();
    this.move(this.dx,this.sw / 4, width - this.sw / 3);
  }

  if (ceil(game.maxTime - game.elapsedTime) % 5 == 0){
    this.speed += 0.028;
  }
}

  move(position, lowerBounds, upperBounds){
    if (position > upperBounds) {
      //this.turnAround();
      
      this.moveLeft();
     
      //this.turnAround();
      
    } else if (position < lowerBounds) {
      //this.turnAround();
      
      this.moveRight();

     // this.turnAround();
    }
}

  moveRight(){
    this.moving = 1;
    this.xDirection = 1;
    this.v = 0;
   // this.turnAround();
  }

  moveLeft(){
    this.moving = -1;
    this.xDirection = -1;
    this.v = 0;
   // this.turnAround();
  }

  turnAround(){
    
    push();
    //translate(this.dx, this.dy);
    rotate(180);
    pop();
    
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

  contains(x,y){
    //rect(-26,-35,50,70);
    let insideX = x >= this.dx - 26 && x <= this.dx + 25;
    let insideY = y >= this.dy - 35 && y <= this.dy + 35;
    return insideX && insideY;
}

  stop() {
  this.moving = 0;
  this.u = 4;         //DEATH
  this.v = 0;         //ANIMATION
}
}
