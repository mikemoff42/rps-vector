let CanvasSize = 500;

let Size;
let Speed;
let NumberOfEach;

let rocks,papers,scissors;
let rock_img,paper_img,scissor_img;
let gameover;
let resetsim;
let Mag = 0.2;

let slider_size;
let slider_speed;
let slider_number;
let slider_screensize;

let collided;

function setup() {
  createCanvas(CanvasSize, CanvasSize);
  createSliders();
  generateRPS();
}

function createSliders(){
  slider_size = createSlider(5,80,20,5);  
  slider_speed = createSlider(0.01,0.5,0.1,0.01);  
  slider_number = createSlider(1,150,90,1);  
  slider_screensize = createSlider(100,windowHeight,900,10);
    
  
  resetsim = createButton('Reset');
  resetsim.mousePressed(generateRPS);
}

function draw() {
  background(0);
  checkWinner();
  showRPS();
  showBackground();
}

function showBackground(){
  textAlign(LEFT,BOTTOM);
  textSize(width/32);
  noStroke();
  text("Size",0,height);
  text("Speed",width/4,height);
  text("Number",width/2,height);
  text("ScreenSize",width*3/4,height);
  
  textAlign(LEFT,TOP);
  text('Rocks: '+rocks.length,0,0);
  text('Papers: '+papers.length,width/4,0);
  text('Scissors: '+scissors.length,width/2,0);
  
  stroke(255);
  line(0,0,width,0);
  line(0,0,0,height);
  line(0,height,width,height);
  line(width,0,width,height);
  
}

function mousePressed(){
  if (gameover) generateRPS();
}

function generateRPS(){

  gameover = false;
  Size = slider_size.value();
  Mag = slider_speed.value();
  NumberOfEach = slider_number.value();
  CanvasSize = slider_screensize.value();
  resizeCanvas(CanvasSize, CanvasSize);
  slider_size.position(0,height);
  slider_size.size(width/6);
  slider_speed.position(width/4,height);
  slider_speed.size(width/6);
  slider_number.position(width/2,height);
  slider_number.size(width/6);
  slider_screensize.position(width*3/4,height);
  slider_screensize.size(width/6);
  
  resetsim.size(width/15);
  resetsim.position(width - width/15,height);
  
  let loc_min = Size/2;
  let loc_max = width-Size/2;
  
  rocks=[];
  papers=[];
  scissors=[];
  
  for (let i=0;i<NumberOfEach;i++) 
    rocks[i] = new Rock(random(loc_min,loc_max),random(loc_min,loc_max));
  for (let i=0;i<NumberOfEach;i++) 
    papers[i] = new Paper(random(loc_min,loc_max),random(loc_min,loc_max));
  for (let i=0;i<NumberOfEach;i++) 
    scissors[i] = new Scissor(random(loc_min,loc_max),random(loc_min,loc_max));
  
}

function checkWinner(){
  textAlign(CENTER,CENTER);
  textSize(width*0.075);
  fill(210,0,0,170);
  if (rocks.length == NumberOfEach*3) {
    text("Rock wins!",width/2,height/2);
    gameover = true;
  }
  if (papers.length == NumberOfEach*3) {
    text("Paper wins!",width/2,height/2);
    gameover = true;
  }
  if (scissors.length == NumberOfEach*3) {
    text("Scissor wins!",width/2,height/2);
    gameover = true;
  }
}

function showRPS(){
  imageMode(CENTER);
  

  for (let i=0;i<rocks.length;i++) {
    rocks[i].show();
    rocks[i].collided = false;
  }
  for (let i=0;i<papers.length;i++) {
    papers[i].show();
    papers[i].collided = false;
  }
  for (let i=0;i<scissors.length;i++) {
    scissors[i].show();
    scissors[i].collided = false;
  }
  

  
  for (let i=rocks.length-1;i>=0;i--){
    for (let j=papers.length-1;j>=0;j--){
      if(rocks[i].collide(papers[j]) && !rocks[i].toDelete){
        let p = new Paper(rocks[i].pos.x,rocks[i].pos.y,rocks[i].xspeed,rocks[i].yspeed);
        p.collided = true;
        papers.push(p);
        rocks[i].toDelete = true;
      }
    }
    for (let k=scissors.length-1;k>=0;k--){
      if(rocks[i].collide(scissors[k]) && !scissors[k].toDelete){
        let r = new Rock(scissors[k].pos.x,scissors[k].pos.y,scissors[k].xspeed,scissors[k].yspeed)
        r.collided = true;
        rocks.push(r);
        scissors[k].toDelete = true;
      }
    }    
  }
  
  for (let i=rocks.length-1;i>=0;i--) if (rocks[i].toDelete) rocks.splice(i,1);
  for (let i=scissors.length-1;i>=0;i--) if (scissors[i].toDelete) scissors.splice(i,1);
  
  for (let i=scissors.length-1;i>=0;i--){
    for (let j=papers.length-1;j>=0;j--){
      if(scissors[i].collide(papers[j]) && !papers[j].toDelete){
        let s = new Scissor(papers[j].pos.x,papers[j].pos.y,papers[j].xspeed,papers[j].yspeed);
        s.collided = true;
        scissors.push(s);
        papers[j].toDelete = true;
      }
    }
  }
  

  for (let i=papers.length-1;i>=0;i--) if (papers[i].toDelete) papers.splice(i,1);
  
//   for (let i=0;i<rocks.length;i++)
//     for (let j=i+1;j<rocks.length;j++)
//       if (!rocks[i].collided && !rocks[j].collided) {
//         rocks[i].collide(rocks[j]);
//         rocks[i].collided = false;
//         rocks[j].collided = false;
//       }
      
//   for (let i=0;i<papers.length;i++)
//     for (let j=i+1;j<papers.length;j++)
//       if (!papers[i].collided && !papers[j].collided) {
//         papers[i].collide(papers[j]);
//         papers[i].collided = false;
//         papers[j].collided = false;
//       }
  
//   for (let i=0;i<scissors.length;i++)
//     for (let j=i+1;j<scissors.length;j++)
//       if (!scissors[i].collided && !scissors[j].collided) {
//         scissors[i].collide(scissors[j]);
//         scissors[i].collided = false;
//         scissors[j].collided = false;
//       }
  


//   let counter1=0;
//   for (let i=0;i<rocks.length;i++){
//     for (let j=counter1;j<rocks.length;j++){
//       if (i != j) sameCollide(rocks[i],rocks[j]);
//       if (j == rocks.length-1) {
//         counter1++;
//         //console.log('rock ' + counter1);
//       }
//     }
//   }
//   counter1=0;
  
  
//   for (let i=0;i<papers.length;i++){
//     for (let j=counter1;j<papers.length;j++){
//       if (i != j) sameCollide(papers[i],papers[j]);
//       if (j == papers.length-1) {
//         counter1++;
//         //console.log('paper ' + counter1);
//       }
//     }
//   }
//   counter1=0;
  
//   for (let i=0;i<scissors.length;i++){
//     for (let j=counter1;j<scissors.length;j++){
//       if (i != j) sameCollide(scissors[i],scissors[j]);
//       if (j == scissors.length-1) {
//         counter1++;
//         //console.log('scis: ' + counter1);
//       }
//     }
//   }
}


//function checkCollide()

function sameCollide(obj1,obj2){
  let d = dist(obj1.x,obj1.y,obj2.x,obj2.y);
  if (d < Size){
    //console.log(obj1.typeOf);
    // obj1.xspeed*=-1;
    // obj1.yspeed*=-1;
    // obj2.xspeed*=-1.01;
    // obj2.yspeed*=-1.01;
    let x1 = [obj1.x, obj1.y];
    let x2 = [obj2.x, obj2.y];
    let v1 = [obj1.xspeed, obj1.yspeed];
    let v2 = [obj2.xspeed, obj2.yspeed];


    let num1 = dotProduct(vectorSub(v1,v2), vectorSub(x1,x2));        // Numerator 1
    let num2 = vectorSub(x1,x2);                                      // Numerator 2
    let den1 = vectorMag(vectorSub(x1,x2))**2;                        // Denominator 1


    let num3 = dotProduct(vectorSub(v2,v1), vectorSub(x2,x1));        // Numerator 3
    let num4 = vectorSub(x2,x1);                                      // Numerator 4
    let den2 = vectorMag(vectorSub(x2,x1))**2;                        // Denominator 2

    let newv1 = vectorSub(v1, vectorMult(num2,(num1/den1)));
    let newv2 = vectorSub(v2, vectorMult(num4,(num3/den2)));

    // Update the velocities
    obj1.xspeed = newv1[0]*1;
    obj1.yspeed = newv1[1]*1;
    obj2.xspeed= newv2[0]*1;
    obj2.yspeed= newv2[1]*1;
    collided = true;
  }
}







function preload(){
  rock_img = loadImage("images/rock.png");
  paper_img = loadImage("images/paper.png");
  scissor_img = loadImage("images/scissors.png");
}