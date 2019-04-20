// var cols, rows;
// var w = 40;
// var grid = [];
// var originalVector = [];
// var vectorMagnitude = [];

// var x1; //starting vertex
// var x2; //ending vertex
var r = 16; //vertex radius

function setup() {
  createCanvas(1500, 800);
  cols = floor(width/w);
  rows = floor(height/w);

  for (var j = 0; j < rows; j++) {
    for (var i = 0; i < cols; i++) {
      var cell = new Cell(i,j);
      grid.push(cell);
    }
  }
}

function draw() {
  background(18, 32, 96);
  for (var i = 0; i < grid.length; i++) {
    grid[i].show();
  }

  fill(255);
  rect(0, 0, 310, 1000);

  fill(0);
  textSize(45);
  textFont("Avenir");
  text("Vectors", 75, 100);

  //BUTTONS
  fill(252, 68, 86);
  noStroke();
  rect(50, 150, 200, 50, 30, 30, 30, 30);
  rect(50, 250, 200, 50, 30, 30, 30, 30);
  if (mouseX >= 50 && mouseX <= 250 && mouseY >= 150 && mouseY <= 200) {
    fill(255, 102, 102);
    rect(50, 150, 200, 50, 30, 30, 30, 30);
  }
  else if (mouseX >= 50 && mouseX <= 250 && mouseY >= 250 && mouseY <= 300) {
    fill(255, 102, 102);
    rect(50, 250, 200, 50, 30, 30, 30, 30);
  }
  fill(255);
  textSize(18);
  text("Generate Vector", 84, 180);
  text("Add Vectors", 100, 280);

  //ARROW CONSTRUCTION
  var offset = r;
  stroke(252, 68, 86);
  line(x1.x, x1.y, x2.x, x2.y); //draw a line between the vertices
  noStroke();
  ellipse(x1.x, x1.y, r, r); //starting vertex
  push(); //start new drawing state
  var angle = atan2(x1.y - x2.y, x1.x - x2.x); //angle of the line
  translate(x2.x, x2.y); //translates to the final vertex
  rotate(angle-HALF_PI); //rotates the arrow point
  noStroke();
  triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
  pop();
}

function Cell(i,j) {
  this.i = i;
  this.j = j;
  this.show = function() {
    var x = this.i*w;
    var y = this.j*w;
    stroke(55, 72, 142);
    noFill();
    rect(x,y,w,w);
  }
}

var counter = 0;
function mouseClicked() {
  if (mouseX >= 50 && mouseX <= 250 && mouseY >= 150 && mouseY <= 200 && counter <= 1) {
    counter++;
    createAVector();
    displayVectorMagnitude();
    console.log(counter);
  }
  else if (mouseX >= 50 && mouseX <= 250 && mouseY >= 150 && mouseY <= 200 && counter > 1) {
    window.alert("Sorry, you can only add two vectors at a time.");
  }
  else if (mouseX >= 50 && mouseX <= 250 && mouseY >= 250 && mouseY <= 300 && vectorMagnitude.length) {
    printSum();
  }
}

function createAVector() {
  if (originalVector.length >= 1) {
    console.log("Yay second vector");
    x1 = createVector(originalVector[1].x, originalVector[1].y); //random position within grid
    x2 = createVector(random(370, 1000), random(0, 800)); //random position within grid
  }
  else {
    console.log("This is the first vector")
    x1 = createVector(random(370, 1000), random(0, 800)); //random position within grid
    x2 = createVector(random(370, 1000), random(0, 800)); //random position within grid
  }
  originalVector.push(x1);
  originalVector.push(x2);
  console.log("Original Vector" + originalVector);


  //ARROW CONSTRUCTION
  var offset = r;
  fill(255);
  stroke(252, 68, 86);
  line(x1.x, x1.y, x2.x, x2.y); //draw a line beetween the vertices
  noStroke();
  ellipse(x1.x, x1.y, r, r); //starting vertex
  push() //start new drawing state
  var angle = atan2(x1.y - x2.y, x1.x - x2.x); //gets the angle of the line
  translate(x2.x, x2.y); //translates to the destination vertex
  rotate(angle-HALF_PI); //rotates the arrow point
  noStroke();
  triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
  pop();
  //puts magnitude into vectorMagnitude[]
  if (counter == 1){
    vectorMagnitude.push(Math.sqrt((Math.pow(originalVector[0].x - originalVector[1].x, 2) + Math.pow(originalVector[0].x - originalVector[1].x, 2))));
  }
  else if (counter == 2) {
    vectorMagnitude.push(Math.sqrt((Math.pow(originalVector[2].x - originalVector[3].x, 2) + Math.pow(originalVector[2].x - originalVector[3].x, 2))));
  }
  console.log(vectorMagnitude);
}

function displayVectorMagnitude() {
  //PRINTED VECTOR INFORMATION
  
  fill(119, 142, 255);
  rect(40, 412, 230, 60, 30, 30, 30, 30);
  fill(255);
  textSize(25)
  text("Magnitudes", 86, 450);
  noStroke();
  fill(0)
  textSize(18);
  if (counter == 1) {
    fill(119, 142, 255);
    ellipse(92, 530, 40, 40)
    fill(255)
    text("1", 86, 535)
    fill(0)
    text("(", 135, 535);
    text(Math.round(originalVector[1].x - originalVector[0].x), 145, 535);
    text(",", 186, 535);
    text(Math.round(originalVector[0].y - originalVector[1].y), 200, 535);
    text(")", 235, 535);    
    //text(Math.round(vectorMagnitude[0]), 118, 535);
  }
  else if (counter == 2) {
    fill(119, 142, 255);
    ellipse(92, 595, 40, 40)
    fill(255)
    text("2", 86, 600)
    fill(0)
    text("(", 135, 600);
    text(Math.round(originalVector[3].x - originalVector[2].x), 145, 600);
    text(",", 186, 600);
    text(Math.round(originalVector[2].y - originalVector[3].y), 200, 600);
    text(")", 235, 600);
    //text("Second vector: " + Math.round(vectorMagnitude[1]), 70, 550);
  }
}

function ifMoreThanTwoVectors() {
  if  (originalVector.length > 2) {
    window.alert('Sorry, you can only add two vectors at a time.');
  }
}
/*
function printMagnitude() {
  fill(178, 178, 178);
  noStroke();
  textSize(18);
  text("1" + "(" + originalVector[0].x)

  //text("First vector: " + vectorMagnitude[0]);
}
*/
function printSum() {
  fill(119, 142, 255);
  rect(50, 648, 75, 40, 30, 30, 30, 30)
  fill(255)
  text("SUM", 68, 675)
  fill(0)
  text("(", 135, 675);
  text(Math.round(originalVector[3].x - originalVector[0].x), 145, 675);
  text(",", 186, 675);
  text(Math.round(originalVector[0].y - originalVector[3].y), 200, 675);
  text(")", 235, 675);
  sum1 = createVector(originalVector[0].x, originalVector[0].y);
  sum2 = createVector(originalVector[3].x, originalVector[3].y);
  var offset = r;
  fill(255);
  stroke(244, 200, 66);
  line(sum1.x, sum1.y, sum2.x, sum2.y); //draw a line beetween the vertices
  noStroke();
  fill(244, 200, 66);
  ellipse(sum1.x, sum1.y, r, r); //starting vertex
  push() //start new drawing state
  var angle = atan2(sum1.y - sum2.y, sum1.x - sum2.x); //gets the angle of the line
  translate(sum2.x, sum2.y); //translates to the destination vertex
  rotate(angle-HALF_PI); //rotates the arrow point
  noStroke();
  triangle(-offset*0.5, offset, offset*0.5, offset, 0, -offset/2); //draws the arrow point as a triangle
  pop();
}
