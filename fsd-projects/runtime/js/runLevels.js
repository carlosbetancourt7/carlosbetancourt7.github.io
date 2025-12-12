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
    game.setDebugMode(false);

    // TODOs 5 through 11 go here
    // BEGIN EDITING YOUR CODE HERE
    function createObstacle (x, y, damage, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
      var hitZoneSize = hZsize; // Size of the obstacle's collision area
      var damageFromObstacle = damage; // Determines how much damage the player takes from the obstalce
      var obstacleHitZone = game.createObstacle(hitZoneSize, damageFromObstacle); // Creates the hit zone, attaches its size, and how much damage it deals, storing it in the variable
      obstacleHitZone.x = x; // Sets the x position of the obstacle
      obstacleHitZone.y = y; // Sets the y position of the obstacle
      game.addGameItem(obstacleHitZone); // Adds the obstacle to the game
      var obstacleImage = draw.bitmap(image); // Draws the image as a bitmap, stores it as an obstacle image
      obstacleHitZone.addChild(obstacleImage); // Takes obstacleImage and adds it as a child to the Hitzone
      obstacleImage.x = offsetX; // Offsets the obstacle's image horizontally relative to the hit zone
      obstacleImage.y = offsetY; // Offsets the obstacle's image vetically relative to the hit zone
      obstacleImage.scaleX = scaleX; // Sets size for the image's x-value
      obstacleImage.scaleY = scaleY; // Sets size for the image's y-value
      obstacleHitZone.rotationalVelocity = rotation; // Sets the image's rotation velocity
      obstacleImage.velocityX = speed; // Sets how fast the image moves
    }
    

    function createEnemy (x, y, damage, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
      var enemy = game.createGameItem("enemy", hZsize); //Creates enemy game item with a hit zone of 25, stored in the enemy variable
      var enemyImage = draw.bitmap(image); // Draws the image as a bitmap, stores it as an enemy image
      var damageFromEnemy = damage;
      enemyImage.x = offsetX; // Horizontal offset from the image to the hitzone
      enemyImage.y = offsetY; // Vertical offset from the image to the hitzone
      enemyImage.scaleX = scaleX; // Sets size for the image's x-value
      enemyImage.scaleY = scaleY; // Sets size for the image's y-value
      enemy.addChild(enemyImage); // Attaches enemyImage to the enemy object
      enemy.x = x; // Sets the enemy's x position
      enemy.y = y; // Sets the enemy's y position
      game.addGameItem(enemy); // Adds the enemy to the game
      enemyImage.rotationalVelocity = rotation; // Sets the image's rotation velocity
      enemy.velocityX = speed; // Sets how fast the image moves

      // Handles whe Hallebot collides with the enemy
      enemy.onPlayerCollision = function () {
        enemy.fadeOut();
        game.changeIntegrity(damageFromEnemy); // Decreases player health
      }

      // Handles whe Hallebot shoots with the enemy
      enemy.onProjectileCollision = function () {
        game.increaseScore(500); // Increase the score after Halle shoots the enemy
        enemy.fadeOut(); // enemy's animation when shot
      }
    }


    function createReward (x, y, health, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
      var reward = game.createGameItem("reward", hZsize); //Creates reward game item with a hit zone of 25, stored in the reward variable
      var rewardImage = draw.bitmap(image); // Draws the image as a bitmap, stores it as an reward image
      var healthFromEnemy = health; // Determines how much health the reward gives to the player
      rewardImage.x = offsetX; // Horizontal offset from the image to the hitzone
      rewardImage.y = offsetY; // Vertical offset from th eimage to the hitzone
      rewardImage.scaleX = scaleX; // Sets size for the image's x-value
      rewardImage.scaleY = scaleY; // Sets size for the image's y-value
      reward.addChild(rewardImage); // Attaches rewardImage to the reward object
      reward.x = x; // Sets the reward's x position
      reward.y = y; // Sets the reward's y position
      game.addGameItem(reward); // Adds the reward to the game
      rewardImage.rotationalVelocity = rotation; // Sets the image's rotation velocity

      reward.velocityX = speed;  // Sets how fast the image goes on screen

      // Handles whe Hallebot collides with the reward
      reward.onPlayerCollision = function () {
        game.changeIntegrity(healthFromEnemy); // Increases player health
        reward.fadeOut(); // reward's animation when touched
        game.increaseScore(750); // Increase the score after Halle touches the reward
      }

      // (^_^) //
    }

      function createLevelMarker (x, y, health, rotation, image, offsetX, offsetY, hZsize, scaleX, scaleY, speed) {
        var levelMarker = game.createGameItem("level", hZsize); //Creates level game item with a hit zone of 25, stored in the level variable
        var levelImage = draw.bitmap(image); // Draws the image as a bitmap, stores it as an level marker image
        var healthFromLevel = health; // Determines how much health the reward gives to the player
        levelImage.x = offsetX; // Horizontal offset from the image to the hitzone
        levelImage.y = offsetY; // Vertical offset from th eimage to the hitzone
        levelImage.scaleX = scaleX; // Sets size for the image's x-value
        levelImage.scaleY = scaleY; // Sets size for the image's y-value
        levelMarker.addChild(levelImage); // Attaches levelImage to the level object
        levelMarker.x = x; // Sets the level's x position
        levelMarker.y = y; // Sets the level's y position
        game.addGameItem(levelMarker); // Adds the level to the game
        levelImage.rotationalVelocity = rotation; // Sets the image's rotation velocity

        levelMarker.velocityX = speed; // Sets how fast the image goes on screen

      // Handles whe Hallebot collides with the level
      levelMarker.onPlayerCollision = function () {
        game.changeIntegrity(healthFromLevel); // Increases player health
        game.increaseScore(2500);
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
