$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "#85008bff"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    // toggleGrid();


    // TODO 2 - Create Platforms
    createPlatform(200, 650, 200, 20, "#85008bff");
    createPlatform(650, 650, 200, 20, "#85008bff");
    createPlatform(1100, 650, 200, 20, "#85008bff");
    createPlatform(425, 525, 200, 20, "#bc08adff");
    createPlatform(880, 525, 200, 20, "#bc08adff");
    createPlatform(650, 400, 200, 20, "#f229deff");
    createPlatform(1100, 400, 200, 20, "#f229deff");
    createPlatform(1305, 525, 200, 20, "#bc08adff");
    createPlatform(1250, 300, 20, 100, "#f229deff");
    createPlatform(200, 400, 200, 20, "#f229deff");
    createPlatform(1100, 200, 100, 20, "#eb62b9ff");
    // TODO 3 - Create Collectables
    createCollectable("candy", 730, 600, 0.025, 1);
    createCollectable("diamond2", 1335, 475, 0.025, 1);
    createCollectable("money", 730, 350, 0.025, 1);
    createCollectable("sombrero", 1241, 250, 0.025, 1);
    createCollectable("vase", 1130, 150, 0.025, 1);
    // TODO 4 - Create Cannons
    createCannon("right", 650, 1050);
    createCannon("left", 425, 1050);
    createCannon("left", 100, 1100);
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
