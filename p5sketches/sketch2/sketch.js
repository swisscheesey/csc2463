function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(255);

  push();
  fill(255,0,0,75);
  noStroke();
  circle(200,80,100);
  pop();

  push();
  fill(0,255,0,75);
  noStroke();
  circle(230,130,100);
  pop();

  push();
  fill(0,0,255,75);
  noStroke();
  circle(170,130,100);
  pop();

}
