function setup() {
  createCanvas(160, 83);
}

function draw() {
  background(0);

  noStroke();

  push();
  fill(255,255,0);
  arc(60,40,50,50,425,235);
  pop();

  push();
  fill(255,0,0);
  rect(100,39,50,25);
  ellipse(125,39,50,50);
  pop();
  push();
  fill(255,255,255);
  ellipse(112,39,15,15);
  ellipse(138,39,15,15);
  pop();
  push();
  fill(0,0,255);
  ellipse(112,39,10,10);
  ellipse(138,39,10,10);
  pop();
}
