
// let sound1 = new Tone.Player("sounds/chicken.wav");

let sounds = new Tone.Players({

  "nuggets": "sounds/chicken.wav",
  "churchbell": "sounds/churchbell.mp3",
  "monkey": "sounds/monkey.mp3",
  "laugh": "sounds/laugh.mp3",
  "applause": "sounds/applause.mp3"

})

const delay = new Tone.FeedbackDelay("8n", 0.5);

let soundNames = ["nuggets", "churchbell", "monkey","laugh","applause"];
let buttons = [];

let dSlider;
let fSlider;

// let button1, button2, button3;

function setup() {
  createCanvas(400, 400);
  sounds.connect(delay);
  delay.toDestination();

  soundNames.forEach((word, index) => {
    buttons[index] = createButton(word);
    buttons[index].position(index, index*50);
    buttons[index].mousePressed( () => buttonSound(word))
  })

  dSlider = createSlider(0., 1., 0.5, 0.05);
  dSlider.mouseReleased( () => {
    delay.delayTime.value = dSlider.value();
  })

  fSlider = createSlider(0., 1., 0.5, 0.05);
  fSlider.mouseReleased( () => {
    delay.feedback.value = fSlider.value();
  })


}

function draw() {
  background(220, 120, 150);
  text('Press the buttons for sound', 3, 270)

}

function buttonSound(whichSound) {
    sounds.player(whichSound).start();
}