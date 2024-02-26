let axiom = "F";
let rules = {
  F: "FF+[+F-F-F]-[-F+F+F]",
};

let sentence = axiom;

let greg;
let ra = 30;
let la = 30;
let ln = 10;
let wind;
let tank;

function preload() {
  wind = loadImage("windowsm.png");
  tank = loadImage("tanks.png");
}

function setup() {
  createCanvas(900, 900);
  background(0, 0, 128);
  wind.resize(550, 0);
  greg = new Gurtle(width / 2, height, color(0));
  angleMode(DEGREES);
  print(sentence);
  for (var i = 0; i < 4; i++) {
    applyRule();
    print(sentence);
  }
  greg.left(90);
  drawSent();
  //strokeWeight(2)
}

function draw() {
  background(135, 206, 235);
  image(tank, 450, 500);
  // reset greg
  greg.angle = 0;
  greg.left(65);
  greg.x = 0;
  greg.y = height;
  ra = map(sin(frameCount), -1, 1, 10, 30);
  la = ra; //map(sin(frameCount),-1,1,10,10)
  ln = map(sin(frameCount * 4), -1, 1, 12, 15);

  drawSent();
  image(wind, 185, 0);
}
function applyRule() {
  var newSentence = "";
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let rkeys = Object.keys(rules);
    let found = false;
    for (let j = 0; j < rkeys.length; j++) {
      // if current is in the rule set make that substitution
      if (current === rkeys[j]) {
        newSentence += rules[rkeys[j]];
        found = true;
      }
    }
    // if that current is not one of the rules append it to the new sentence
    if (!found) {
      newSentence += current;
    }
  }
  sentence = newSentence;
}

function drawSent() {
  for (let i = 0; i < sentence.length; i++) {
    let instr = sentence.charAt(i);
    switch (instr) {
      case "F":
        greg.forward(ln);
        break;
      case "+":
        greg.right(ra);
        break;
      case "-":
        greg.left(la);
        break;
      case "[":
        greg.pushIt();
        break;
      case "]":
        greg.popIt();
        break;
    }
  }
}
