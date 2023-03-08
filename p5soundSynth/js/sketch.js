let initTone = true;
let pitch = 300;
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

//let noise = new Tone.Noise('pink').start();
//let noiseEnv = new Tone.AmplitudeEnvelope({
//  attack: 0.1,
//  decay: 0.2,
//  sustain: 1.0,
// release: 0.8
//}).connect(gain);

//let noiseFilter = new Tone.Filter(400, "lowpass").connect(ampEnv);
//noise.connect(noiseFilter);

function setup() {
  createCanvas(400, 400);
}

function preload() {
  img = loadImage("assets/tugboat.png");
}

function draw() {
  background(220);
 // if((framecount % 60 === 0)){
 //   pitch = random(300, 1000);
 // }

  text('press space bar to initalize audio',100,300);
  image(img,20,30,img.width / 3,img.height / 3);
}

function keyPressed(){
  if (keyCode = 32 && initTone === true){
      console.log('spacebar pressed');
      Tone.start();
      initTone = false;
  }
}

function mousePressed() {
  console.log('pressed');
  ampEnv.triggerAttackRelease('4n');
  ampEnv.triggerAttackRelease(6.0, '+1');
}