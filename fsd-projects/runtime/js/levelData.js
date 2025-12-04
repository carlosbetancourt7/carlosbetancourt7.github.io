var makeLevelData = function (window) {
  window.opspark = window.opspark || {};

  window.opspark.makeDataInGame = function (game) {
    // some useful constants
    var groundY = game.groundY;

    // this data will allow us to define all of the
    // behavior of our game

    // TODO 12: change the below data
    var levelData = [
      {
        name: "Robot Romp",
        number: 1,
        speed: -3,
        gameItems: [
          { type: "obstacle",  x: 400, y: groundY - 110, damage: 10, rotation: 0, image: "img/fireball left.png", offsetX: -31, offsetY: -31, hZsize: 25},
          { type: "obstacle", x: 750, y: groundY - 110, damage: 10, rotation: 0, image: "img/fireball left.png", offsetX: -31, offsetY: -31, hZsize: 25},
          { type: "obstacle", x: 1100, y: groundY - 110, damage: 20, rotation: 0, image: "img/fireball left.png", offsetX: -31, offsetY: -31, hZsize: 25},
          { type: "enemy", x: 1500, y: groundY - 50, damage: 15, image: "img/Scorpion.png", offsetX: -40, offsetY: -120},
          { type: "enemy", x: 2000, y: groundY - 50, damage: 15, image: "img/Scorpion.png", offsetX: -40, offsetY: -120},
          { type: "reward", x: 925, y: groundY - 125},
          { type: "level", x: 2500, y: groundY - 50},
        ],
      },
      {
        name: "Robot Rampage",
        number: 2,
        speed: -3,
        gameItems: [
          { type: "obstacle", x: 2050, y: groundY - 50},
          { type: "obstacle", x: 2400, y: groundY - 50},
          { type: "obstacle", x: 2750, y: groundY - 50},
        ],
      },
    ];
    window.opspark.levelData = levelData;
  };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if (
  typeof process !== "undefined" &&
  typeof process.versions.node !== "undefined"
) {
  // here, export any references you need for tests //
  module.exports = makeLevelData;
}
