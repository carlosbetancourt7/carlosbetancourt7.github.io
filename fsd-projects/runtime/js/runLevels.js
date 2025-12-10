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
    function createObstacle (x, y, damage, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
      var hitZoneSize = hZsize; // Size of the obstacle's collision area
      var damageFromObstacle = damage; // 
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // Creates the hit zone, attaches its size, and how much damage it deals, storing it in the variable
      obstacleHitZone.x = x; // Sets the x position of the obstacle
      obstacleHitZone.y = y; // Sets the y position of the obstacle
      game.addGameItem(obstacleHitZone); // Adds the obstacle to the game
      var obstacleImage = draw.bitmap(image); // Draws the image as a bitmap, stores it as an obstacle image
      obstacleHitZone.addChild(obstacleImage); // Takes obstacleImage and adds it as a child to the Hitzone
      obstacleImage.x = offsetX; // Offsets the obstacle's image horizontally relative to the hit zone
      obstacleImage.y = offsetY; // Offsets the obstacle's image vetically relative to the hit zone
      obstacleImage.scaleX = scaleX;
      obstacleImage.scaleY = scaleY;
      obstacleHitZone.rotationalVelocity = rotation;
      obstacleImage.velocityX = speed;
    }
    

    function createEnemy (x, y, damage, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
      var enemy = game.createGameItem("enemy", hZsize); //Creates enemy game item with a hit zone of 25, stored in the enemy variable
      var enemyImage = draw.bitmap(image);
      var damageFromEnemy = damage;
      enemyImage.x = offsetX; // Horizontal offset from the image to the hitzone
      enemyImage.y = offsetY; // Vertical offset from the image to the hitzone
      enemyImage.scaleX = scaleX;
      enemyImage.scaleY = scaleY;
      enemy.addChild(enemyImage); // Attaches enemyImage to the enemy object
      enemy.x = x; // Sets the enemy's x position
      enemy.y = y; // Sets the enemy's y position
      game.addGameItem(enemy); // Adds the enemy to the game
      enemyImage.rotationalVelocity = rotation;
      enemy.velocityX = speed;

      // Handles whe Hallebot collides with the enemy
      enemy.onPlayerCollision = function () {
        enemy.fadeOut();
        game.changeIntegrity(damageFromEnemy); // Decreases player health
      }

      // Handles whe Hallebot shoots with the enemy
      enemy.onProjectileCollision = function () {
        game.increaseScore(100); // Increase the score after Halle shoots the enemy
        enemy.fadeOut(); // enemy's animation when shot
      }
    }


    function createReward (x, y, health, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
      var reward = game.createGameItem("reward", hZsize); //Creates reward game item with a hit zone of 25, stored in the reward variable
      var rewardImage = draw.bitmap(image);
      var healthFromEnemy = health;
      rewardImage.x = offsetX; // Horizontal offset from the image to the hitzone
      rewardImage.y = offsetY; // Vertical offset from th eimage to the hitzone
      rewardImage.scaleX = scaleX;
      rewardImage.scaleY = scaleY;
      reward.addChild(rewardImage); // Attaches rewardImage to the reward object
      reward.x = x; // Sets the reward's x position
      reward.y = y; // Sets the reward's y position
      game.addGameItem(reward); // Adds the reward to the game
      rewardImage.rotationalVelocity = rotation;

      reward.velocityX = speed;

      // Handles whe Hallebot collides with the reward
      reward.onPlayerCollision = function () {
        game.changeIntegrity(healthFromEnemy); // Increases player health
        reward.fadeOut(); // reward's animation when touched
        game.increaseScore(150); // Increase the score after Halle touches the reward
      }

      // (^_^) //
    }

      function createLevelMarker (x, y, health, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
        var levelMarker = game.createGameItem("level", hZsize); //Creates level game item with a hit zone of 25, stored in the level variable
        var levelImage = draw.bitmap(image);
        var healthFromLevel = health;
        levelImage.x = offsetX; // Horizontal offset from the image to the hitzone
        levelImage.y = offsetY; // Vertical offset from th eimage to the hitzone
        levelImage.scaleX = scaleX;
        levelImage.scaleY = scaleY;
        levelMarker.addChild(levelImage); // Attaches levelImage to the level object
        levelMarker.x = x; // Sets the level's x position
        levelMarker.y = y; // Sets the level's y position
        game.addGameItem(levelMarker); // Adds the level to the game
        levelImage.rotationalVelocity = rotation;

        levelMarker.velocityX = speed;

      // Handles whe Hallebot collides with the level
      levelMarker.onPlayerCollision = function () {
        game.changeIntegrity(healthFromLevel); // Increases player health
        game.increaseScore(500);
        levelMarker.fadeOut(); // level's animation when touched
        startLevel();
      }

      
    }
    

    function startLevel() {
      // TODO 13 goes below here
      var level = levelData[currentLevel]; // Fetches the current level from the levelData array and stores it inside the level variable
      var levelObjects = level.gameItems; // Retrieves the array of gameItems and stores it in the levelObjects variable

      for (var i = 0; i < levelObjects.length; i++) {
        var element = levelObjects[i];

        if (element.type === "obstacle") {
          createObstacle(element.x, element.y, element.damage, element.rotation, element.image, element.offsetY, element.offsetX, element.hZsize, element.scaleX, element.scaleY, element.speed);
        }
        if (element.type === "enemy") {
          createEnemy(element.x, element.y, element.damage, element.rotation, element.image, element.offsetX, element.offsetY, element.hZsize, element.scaleX, element.scaleY, element.speed);
        }
        if (element.type === "reward") {
          createReward(element.x, element.y, element.health, element.rotation, element.image, element.offsetX, element.offsetY, element.hZsize, element.scaleX, element.scaleY, element.speed);
        }
        if (element.type === "level") {
          createLevelMarker(element.x, element.y, element.health, element.rotation, element.image, element.offsetX, element.offsetY, element.hZsize, element.scaleX, element.scaleY, element.speed);
        }
      }

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
