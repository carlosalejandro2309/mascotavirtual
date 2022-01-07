var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed,lastFed;
var FeedTime;
//crea aquí las variables feed y lastFed 


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);
  
  foodObj = new Food();
 
  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //crea aquí el boton Alimentar al perro
  addFood=createButton("Alimenta a tu perro ");
  addFood.position(850,85);
  addFood.mousePressed(feedDog);
  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();
  FeedTime=database.ref("FeedTime");
  FeedTime.on("value",function(data){lastFed=data.val();});
  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
 if (lastFed>=12){
  text("Ultima hora en que se alimento : "+lastFed%12+"pm",350,30);
 } else if (lastFed==0){
   text("Ultima hora en que se alimento :12 pm",350,30);
 }else{
  text("Ultima hora en que se alimento : "+lastFed+"am",350,30);
 } 
 
  //escribe el código para mostrar el texto lastFed time aquí

 
  drawSprites();
}

//función para leer la Existencia de alimento
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  var food_stock_val =foodObj.getFoodStock();
  if (food_stock_val <=0){
      foodObj.updateFoodStock(food_stock_val *0);
  }else{
    foodObj.updateFoodStock(food_stock_val -1);
  }
  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
  database.ref("/").update({Food:foodObj.getFoodStock(),FeedTime:hour()});
}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}
