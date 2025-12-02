var runLevels = function (window) {
  window.opspark = window.opspark || {};

  var draw = window.opspark.draw;
  var createjs = window.createjs;
  let currentLevel = 0;

  window.opspark.runLevelInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game
    var levelData = window.opspark.levelData;

    // set this to true or false depending on if you want to see hitzones
    game.setDebugMode(true);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createObstacle (x, y, damage) {
      var hitZoneSize = 25; // Size of the obstacle's collision area
      var damageFromObstacle = damage; // 
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // Creates the hit zone, attaches its size, and how much damage it deals, storing it in the variable
      obstacleHitZone.x = x; // Sets the x position of the obstacle
      obstacleHitZone.y = y; // Sets the y position of the obstacle
      game.addGameItem(obstacleHitZone); // Adds the obstacle to the game
      var obstacleImage = draw.bitmap("img/sawblade.png"); // Draws the image as a bitmap, stores it as an obstacle image
      obstacleHitZone.addChild(obstacleImage); // Takes obstacleImage and adds it as a child ot the Hitzone
      obstacleImage.x = -25; // Offsets the obstacle's image horizontally relative to the hit zone
      obstacleImage.y = -25; // Offsets the obstacle's image vetically relative to the hit zone
      
      obstacleHitZone.rotationalVelocity = -5;
    }

    createObstacle(400, groundY - 110, 10);
    createObstacle(750, groundY - 110, 10);
    createObstacle(1100, groundY - 110, 20);

    var enemy = game.createGameItem("enemy", 25);
    var redSquare = draw.rect(50, 50, "red");
    redSquare.x = -25;
    redSquare.y = -25;
    enemy.addChild(redSquare);   
    enemy.x = 1500;
    enemy.y = groundY - 50;
    game.addGameItem(enemy);

    enemy.velocityX -= 2;

    enemy.onPlayerCollision = function () {
      game.changeIntegrity(-15);
    }

    enemy.onProjectileCollision = function () {
      game.increaseScore(100);
      enemy.fadeOut();
    }
    function startLevel() {
      // TODO 13 goes below here



      //////////////////////////////////////////////
      // DO NOT EDIT CODE BELOW HERE
      //////////////////////////////////////////////
      if (++currentLevel === levelData.length) {
        startLevel = () => {
          console.log("Congratulations!");
        };
      }
    }
    startLevel();
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = runLevels;
}
