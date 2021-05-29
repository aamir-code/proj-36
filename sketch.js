var dog,happyDog,database,dog1;
var FeedDrago;
var ADD;
var Food;
var foods;
var foodObj,foodStock;
var fedTime,lastFed;
var input,inpButton,greeting,DogName;

function preload() {
    dog = loadImage("dogImg.png")
    happyDog = loadImage("dogImg1.png")
}
function setup() {
    createCanvas(750,350)
    database = firebase.database()

    foodStock = database.ref("Food");
    foodStock.on("value",readStock);

    foodObj = new Foodd()

    dog1 = createSprite(500,250,20,20);
    dog1.scale = 0.15;
    dog1.addImage(dog);

    ADD = createButton("More Food");
    ADD.position(700,95);
    ADD.mousePressed(addFoods)

    FeedDrago = createButton("Feed");
    FeedDrago.position(800,95);
    FeedDrago.mousePressed(feedDog)
  
    input = createInput("name");
    input.position(930,350);
    
    
    inpButton = createButton("Give");
    inpButton.position(930,370);
    inpButton.mousePressed(addName)

}

function draw() {
    background(233,383,68);
    textSize(15)
    fill(0)
    

    fedTime = database.ref("FeedTime");
    fedTime.on("value",function(data){

        lastFed = data.val()
    })
    if(lastFed >= 12) {
        text("Last Fed :"+lastFed%12+"PM",350,30)

    }else if(lastFed==0) {
        text("Last Fed :12AM",350,30)

    }else{
        text("Last Fed :"+lastFed+"AM",350,30)
    }

    foodObj.display();
    drawSprites();
}
function readStock(data) {
    foods = data.val();
}
function feedDog() {
    dog1.addImage(happyDog);

    foodObj.updateFoodStock(foodObj.getFoodStock()-1)

    database.ref("/").update({
        Food:foodObj.getFoodStock(),
        FeedTime:hour()
    })
}
function addFoods() {
    foods++
    database.ref("/").update({
        Food:foods
    })
    foodObj.updateFoodStock(foodObj.getFoodStock()+1)

}
function addName() {
    input.hide();
    inpButton.hide();
    DogName = input.value()
    greeting = createElement("h3");
    greeting.html("My name is "+DogName);
    greeting.position(700,350);
}