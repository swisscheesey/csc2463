function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  ellipse(200,100,50,50);
  ellipse(400,105,50,50);

  //fill(0);                    //basic way to fill only these shapes
  //ellipse(200,100,10,10);
  //ellipse(400,105,10,10);
  //fill(255);

  push();                      //better way to fill only these shapes
  fill(0);
  ellipse(200,100,10,10);
  ellipse(400,105,10,10);
  pop();

  //triangle(300,100,290,200,310,200);  //basicnose

  beginShape();                //badassnose
  vertex(295,100);
  vertex(280,200);
  vertex(300,205);
  vertex(320,200);
  vertex(305,100);
  endShape(CLOSE);


  arc(300,220,200,40,0,PI,PIE);

  line(175,65,225,65);
  line(175,70,425,65);
}
