var dog,happyDogImg,dogImg;
var database,position;
var foods,foodStock;

function preload()
{
	//load images here
  dog = loadImage("images/dogImg1.png");
  happyDogImg = loadImage("images/dogImg.png");
}

function setup() {
	createCanvas(800, 700);
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.2;
  dog.shapeColor = "cyan";
  database = firebase.database();
  foodStock = database.ref("food");
  foodStock.on("value",readStock);
  var dogposition = database.ref("dog/position");
   dogposition.on("value",readPosition,showError);
  
}


function draw() {  
  background("black");

  if(keyWentDown(UP_ARROW)){
    writeStock(foods);
    dog.addImg(happyDogImg);
  }
  drawSprites();

  fill("red");
  textSize(20);
  text("press UP_ARROW to feed",100,50);
  text("food:"+foods,100,100);
  //add styles here

}

function readStock(data){
foods = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0;
  }

  else{
    x = x-1;
  }
 
  database.ref('/').update{
    Food:x
}