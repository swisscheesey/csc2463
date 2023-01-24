function setup() {
  createCanvas(400, 420);
}

function draw() {
  background(20,0,140);

  push()
  fill(0,160,0);
  stroke(255);
  strokeWeight(6);
  ellipse(200,215,225,225);
  pop()

  push()
  fill(255,0,0);
  stroke(255);
  strokeWeight(6);
  beginShape();
  vertex(315,180);
  vertex(235,180);
  vertex(205,95);
  vertex(165,180);
  vertex(85,180);
  vertex(150,235);
  vertex(125,305);
  vertex(200,265);
  vertex(275,305);
  vertex(250,235);
  endShape(CLOSE);
  pop();
}
