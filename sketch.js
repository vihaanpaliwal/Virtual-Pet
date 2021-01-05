var dog, happyDog, database, foodS, foodStock,dogImg,dogImg1;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  dogImg1 = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
  
  createCanvas(500,500);

  
  dog = createSprite(250,250);
  dog.addImage(dogImg);
  dog.scale = 0.15
  
  foodStock = database.ref('Food');
  foodStock.on("value",readStock);

 

  
}


function draw() {  
  background("cyan");

if(keyWentDown(UP_ARROW)){
  writeStock(foodS);
  dog.addImage(dogImg1);
}

if(keyWentUp(UP_ARROW)){
  dog.addImage(dogImg);
}

  drawSprites();

  textSize(25);
  fill("orange");
  strokeWeight(5);
  stroke("purple");
  text("Note : Press Up Arrow to feed the Dog",50,470);

  text("food remaining : " + foodS,120,180);
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }
  database.ref('/').update({
  Food:x
  })
}



