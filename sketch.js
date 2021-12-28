var gameState = "fight";


var backGround;
var backGroundImg;
var shooter;
var shootingImg
var player;
var zombieImg;
var heart1;
var heart2;
var heart3;
var zombieGroup;
var heart1Img, heart2Img, heart3Img;
var bullet;
var bulletGroup;
var bullets = 50
var score = 0; 
var lives = 3
var win
var lose
var explosion
var edges;

function preload(){
backGroundImg = loadImage("assets/bg.jpeg");
shooter = loadImage("assets/shooter_2.png");
shootingImg = loadImage("assets/shooter_3.png");
zombieImg = loadImage("assets/zombie.png");
heart1Img = loadImage("assets/heart_1.png");
heart2Img = loadImage("assets/heart_2.png");
heart3Img = loadImage("assets/heart_3.png");

win = loadSound("assets/win.mp3")
lose = loadSound("assets/lose.mp3")
explosion = loadSound("assets/explosion.mp3")

}


function setup (){
createCanvas(windowWidth, windowHeight);
backGround= createSprite(displayWidth/2-20, displayHeight/2-40, 20,20);
backGround.addImage(backGroundImg);
backGround.scale= 1.08;                                                     

player= createSprite(displayWidth-1000, displayHeight-300,50,50);

player.addImage(shooter);

player.scale= 0.4;
//player.debug = true;
player.setCollider("rectangle",0,0,300,300);

heart1= createSprite(displayWidth-100, 40,20,20);
heart2 = createSprite(displayWidth- 150,40,20,20);
heart3= createSprite(displayWidth- 200,40,20,20);

heart1.addImage(heart1Img);
heart2.addImage(heart2Img);
heart3.addImage(heart3Img);

heart1.scale = 0.4
heart2.scale = 0.4
heart3.scale = 0.4

heart1.visible = false
heart2.visible = false


zombieGroup = new Group(); 
bulletGroup = new Group();

}

function draw(){
 edges = createEdgeSprites();
 player.collide(edges)
 
  if(gameState==="fight"){
     
 if (lives===3){
   heart3.visible=true;
   heart2.visible=false;
   heart1.visible=false;
 }
 if (lives===2){
  heart3.visible=false;
  heart2.visible=true;
  heart1.visible=false;
}
if (lives===1){
  heart3.visible=false;
  heart2.visible=false;
  heart1.visible=true;
}
if(lives===0 ){
  gameState= "lost"
}
  if (score===90){
gameState= "won";
win.play();


  }
if (keyDown("UP_ARROW")){
  player.y = player.y -30
  
}
if(keyDown("DOWN_ARROW")){
  player.y = player.y +30
}




if(keyWentDown("space")){
bullet = createSprite(displayWidth-1000, player.y-30,20,10);
bullet.velocityX= 20;
bulletGroup.add(bullet);
bullets= bullets-1;
player.depth= bullet.depth;
player.depth = player.depth+2
player.addImage(shootingImg);
explosion.play();
}
else if (keyWentUp("space")) { 
  player.addImage(shooter);
  }
if(bullets===0){
  gameState= "bullet";
  lose.play();

}
if(zombieGroup.isTouching(bulletGroup)){

for(var i=0;i<zombieGroup.length;i++){
  if(zombieGroup[i].isTouching(bulletGroup)){
    zombieGroup[i].destroy();
    bulletGroup.destroyEach();
    score= score+2;
    explosion.play();
  }

}


}
if(zombieGroup.isTouching(player)){
lose.play();
  for(var i=0;i<zombieGroup.length;i++){
    if(zombieGroup[i].isTouching(player)){
      zombieGroup[i].destroy();
      lives= lives-1;
    }
  
  }
  
  
  }


spawnEnemies();
  }
  drawSprites();
  textSize(20);
  fill('white');
  text("score="+score,displayWidth-200,displayHeight/2-220);
  text("lives=" + lives, displayWidth- 200, displayHeight/2-280)
if (gameState==="lost"){
  textSize(70);
  fill ("red");
  text("You are a loser",400,500);
  player.destory();
  zombieGroup.destroyEach();

}
else if(gameState==="won"){
  textSize(100);
  fill ("yellow");
  text("Gud Job",490,400);
  player.destory();
  zombieGroup.destroyEach();

}
else if(gameState==="bullet"){
  textSize(50.01);
  fill ("yellow");
  text("You ran out of ammo",650,450);
  player.destory();
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();

}
}



function spawnEnemies(){

if(frameCount%50===0){


  zombie= createSprite(random(500,1200),random(100,500),40,40);
  
  zombie.addImage(zombieImg);

  zombie.scale = 0.15;
  zombie.velocityX=-3;
  zombie.lifetime= 400;

  zombieGroup.add(zombie);
}



}


