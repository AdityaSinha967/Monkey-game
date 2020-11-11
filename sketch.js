var PLAY, END;
var gameState=PLAY;
var monkSey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score;
var ground;
var SURVIVALTIME=0;
var score=0;
function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(667,520);
  
  monkey= createSprite(100,357,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.scale=0.135;
  
  ground= createSprite(190,400,1000,10);
  
  FoodGroup= createGroup();
  obstacleGroup= createGroup();
}


function draw() {
  background("white");
  textSize(20);
  text("score-"+score,500,50);
  text("SURVIVALTIME-"+SURVIVALTIME,200,50);
  ground.velocityX=-10;
  if(gameState===PLAY){
  if(ground.x===170){
    ground.x=ground.width/2;
     SURVIVALTIME=Math.ceil(frameCount/frameRate());

  }
  if(keyDown("space")&& monkey.y >= 100){
    monkey.velocityY=-12;
  }
            monkey.velocityY= monkey.velocityY+0.8
    if(monkey.isTouching(FoodGroup)){
      FoodGroup.destroyEach();
      score=score+1;
    }
    if(obstacleGroup.isTouching(monkey)){
      gameState=END;
            FoodGroup.setVelocityXEach(0);
            obstacleGroup.setVelocityXEach(0);
    FoodGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
      SURVIVALTIME=0;
      text("GAMEOVER",300,300);
    }
    }
  else if(gameState===END&& obstacleGroup.isTouching(monkey)){
    
      FoodGroup.destroyEach();
      obstacleGroup.destroyEach();
    }
  monkey.collide(ground);
  spawnFood();
  spawnObstacle();
drawSprites();
}
function spawnFood(){
  if(frameCount%80===0){
    var banana = createSprite(200,200,20,20);
    banana.addImage(bananaImage);
    banana.scale=0.12;
    banana.velocityX=-5;
    banana.x=Math.round(random(100,550));
    banana.y=Math.round(random(100,300));
    banana.lifetime=100;
      FoodGroup.add(banana);

  }
}
function spawnObstacle(){
  if(frameCount%300===0){
    var obstacle = createSprite(550,373,20,20);
    obstacle.addImage(obstacleImage);
    obstacle.scale=0.12;
    obstacle.velocityX=-8;
    obstacle.x= Math.round(random(300,605));
    
    obstacle.lifetime=150;
    obstacleGroup.add(obstacle);
  }
}




















