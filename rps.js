class rps {
  constructor(x,y) {
    this.pos = createVector(x,y);
    this.vel = createVector();
    
    //this.type = type;
    this.toDelete = false;
    this.collided = false;
  }  
  collide(other) {
    let d = dist(this.pos.x,this.pos.y,other.pos.x,other.pos.y);
    if (d < Size && !this.toDelete){
      
      // let tmpx = this.xspeed;
      // let tmpy = this.yspeed;
      // this.xspeed = other.xspeed;
      // this.yspeed = other.yspeed;
      // other.xspeed = tmpx;
      // other.yspeed = tmpy;

      let x1 = [this.pos.x, this.pos.y];
      let x2 = [other.pos.x, other.pos.y];
      let v1 = [this.vel.x, this.vel.y];
      let v2 = [other.vel.x, other.vel.y];


      let num1 = dotProduct(vectorSub(v1,v2), vectorSub(x1,x2));        // Numerator 1
      let num2 = vectorSub(x1,x2);                                      // Numerator 2
      let den1 = vectorMag(vectorSub(x1,x2))**2;                        // Denominator 1


      let num3 = dotProduct(vectorSub(v2,v1), vectorSub(x2,x1));        // Numerator 3
      let num4 = vectorSub(x2,x1);                                      // Numerator 4
      let den2 = vectorMag(vectorSub(x2,x1))**2;                        // Denominator 2

      let newv1 = vectorSub(v1, vectorMult(num2,(num1/den1)));
      let newv2 = vectorSub(v2, vectorMult(num4,(num3/den2)));

      // Update the velocities
      this.vel.x = newv1[0]*1;
      this.vel.y = newv1[1]*1;
      other.vel.x= newv2[0]*1;
      other.vel.y= newv2[1]*1;
      return true;
    }
  }  
}

function dotProduct(a,b){
  // Dot product of a*b (inner product/ scalar product)
  let product = 0;
  
  if (a.length !== b.length){
    return undefined;
  }
  else{
    for(let i = 0; i < a.length; i++){
      product += a[i]*b[i];
    }
    return product; // this is a scalar (just a number)
  }
}

function vectorMag(v){
  // Vector magnitude
  let mag = 0;
  for(let i of v){
    mag += i**2
  }
  return sqrt(mag); // this is also a scalar
}

function vectorSub(a,b){
  // Subtracts vector b from vector a
  let sub = []
  
  if (a.length !== b.length){
    return undefined;
  }
  else{
    for(let i = 0; i < a.length; i++){
      sub[i] = a[i]-b[i];
    }
    return sub; // this is a vector
  }
}

function vectorMult(v,s){
  // Multiplies vector (v) by scalar (s)
  let mult = [];
  for(let i = 0; i < v.length; i++){
    mult[i] = v[i]*s;
  }
  return mult; // This is also a vector
}


class Rock extends rps {
  constructor(x,y) {
    super(x,y)
  }  
  show() {
    this.typeOf = 'Rock';
    
    this.acc = p5.Vector.random2D();
    this.acc.setMag(Mag);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);    
    
    if (this.pos.x < Size/2) this.pos.x = Size/2;
    if (this.pos.x > width-Size/2) this.pos.x = width - Size/2;
    if (this.pos.y < Size/2) this.pos.y = Size/2;
    if (this.pos.y > height -Size/2) this.pos.y = height-Size/2;
    
    if (this.pos.x == Size/2 || this.pos.x == width-Size/2) this.vel.x=0;;
    if (this.pos.y == Size/2 || this.pos.y == height -Size/2) this.vel.y=0;;
    
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    image(rock_img, 0,0, Size, Size);
    pop();
  }
}

class Paper extends rps {
  constructor(x,y) {
    super(x,y)
  }  
  show() {
    this.typeOf = 'Paper';
    
    this.acc = p5.Vector.random2D();
    this.acc.setMag(Mag);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);    
    
    if (this.pos.x < Size/2) this.pos.x = Size/2;
    if (this.pos.x > width-Size/2) this.pos.x = width - Size/2;
    if (this.pos.y < Size/2) this.pos.y = Size/2;
    if (this.pos.y > height -Size/2) this.pos.y = height-Size/2;
    
    if (this.pos.x == Size/2 || this.pos.x == width-Size/2) this.vel.x=0;;
    if (this.pos.y == Size/2 || this.pos.y == height -Size/2) this.vel.y=0;;
    
    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    image(paper_img, 0,0, Size, Size);
    pop();
  }
}

class Scissor extends rps {
  constructor(x,y) {
    super(x,y)
  }  
  show() {
    this.typeOf = 'Scissor';
    this.acc = p5.Vector.random2D();
    this.acc.setMag(Mag);
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);    
    
    if (this.pos.x < Size/2) this.pos.x = Size/2;
    if (this.pos.x > width-Size/2) this.pos.x = width - Size/2;
    if (this.pos.y < Size/2) this.pos.y = Size/2;
    if (this.pos.y > height -Size/2) this.pos.y = height-Size/2;
    
    if (this.pos.x == Size/2 || this.pos.x == width-Size/2) this.vel.x=0;;
    if (this.pos.y == Size/2 || this.pos.y == height -Size/2) this.vel.y=0;;

    push();
    translate(this.pos.x,this.pos.y);
    rotate(this.vel.heading());
    image(scissor_img, 0,0, Size, Size);
    pop();
  }
}

