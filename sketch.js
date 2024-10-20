let colors = [[255, 87, 51], [218, 247, 166], [255, 195, 0], [199, 0, 57], [144, 12, 63], [88, 24, 69]];
let types = ['Mammal', 'Bird', 'Reptile', 'Amphibian', 'Fish', 'Vascular Plant'];
let circleData = [];

function preload() {
  data = loadTable("./data.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();

  for (let i = 0; i < data.getRowCount(); i++) {
    let type = data.get(i, 'CategoryName');
    let number = data.getNum(i, 'References');
    let transparent = map(number, 0, 88, 30, 255);
    let x,
    color = [];

    for (let idx = 0; idx < types.length; idx++) {
      if (type === types[idx]) {
        color = [colors[idx][0], colors[idx][1], colors[idx][2], transparent];
        x = map(idx, 0, types.length - 1, 100, windowWidth - 100);
        fill(color)
        text(types[idx], x - 20, windowHeight - 20);
      }
    }

    let y = random(30, windowHeight - 50);
    let change = random(-(windowWidth - 200) / 12, (windowWidth - 200) / 12);
    let r = map(number, 0, 88, 10, 100);

    circleData.push({ x: x + change, y: y, r: r, SciName: data.get(i, 'SciName'), color: color,xT:x-30,type:type });
  }
}

function draw() {
  // I tried to make the transparency changes by time but my computer can't handle it 
  background("black");
  for (let circle of circleData) {
    fill(circle.color[0], circle.color[1], circle.color[2], circle.color[3]);
    ellipse(circle.x, circle.y, circle.r);
    text(circle.type,circle.xT,windowHeight-30)

    if (dist(circle.x, circle.y, mouseX, mouseY) < circle.r) {
      fill('white');
      text(circle.SciName, circle.x, circle.y); 
    }
  }
}


