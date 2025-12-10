var background = function (window) {
    'use strict';
    
    window.opspark = window.opspark || {};
    var draw = window.opspark.draw;
    var createjs = window.createjs;
    
    /*
     * Create a background view for our game application
     */
    window.opspark.makeBackground = function(app,ground) {
        /* Error Checking - DO NOT DELETE */
        if(!app) {
            throw new Error("Invalid app argument");
        }
        if(!ground || typeof(ground.y) == 'undefined') {
            throw new Error("Invalid ground argument");
        }
        
        // useful variables
        var canvasWidth = app.canvas.width;
        var canvasHeight = app.canvas.height;
        var groundY = ground.y;
        
        // container which will be returned
        var background;
        
        //////////////////////////////////////////////////////////////////
        // ANIMATION VARIABLES HERE //////////////////////////////////////
        //////////////////////////////////////////////////////////////////
        // TODO (several):
        var lantern;
        var buildings = [];
      
        // called at the start of game and whenever the page is resized
        // add objects for display in background. draws each image added to the background once
        function render() {
            background.removeAllChildren();

            // TODO 1:
            // this currently fills the background with an obnoxious yellow;
            // you should modify both the height and color to suit your game
            var backgroundImage = draw.bitmap("img/Living Forest.png");
            backgroundImage.x = 0;
            backgroundImage.y = 0;
            backgroundImage.scaleX = 4.741;
            backgroundImage.scaleY = 3.768;          
            background.addChild(backgroundImage);

            /*
            // TODO 2: - Add a moon and starfield
            for (var i = 0; i < 75; i++) {
                var circle = draw.circle(1, "white", "LightGray", 2); // Creates a circle with a specified radius, border color, radius, alpha and stores it in the variable circle
                circle.x = canvasWidth * Math.random(); // Puts a circle on a random x-coordinate
                circle.y = groundY * Math.random(); // Puts a circle on a random y-coordinate
                background.addChild(circle); // Adds circle to the background object
            }

            var moon = draw.bitmap("img/moon.png");
            moon.x = canvas.width - 400; // Sets the moon's x position
            moon.y = canvas.height - 800; // Sets the moon's y position
            moon.scaleX = 0.15; // Scales the moon's width
            moon.scaleY = 0.15; // Scales the moon's height
            background.addChild(moon); // Creates a bitmap object using the image moon.png which is stored in the variable moon
            */
            //TODO 4: Part 1 - Add buildings!     Q: This is before TODO 4 for a reason! Why?
            /*
            for (var i = 0; i < 7; i++) { // Creates 5 buildings
                var buildingHeight = groundY * Math.random(); // Stores a random value for the height of the building
                var building = draw.rect(75, buildingHeight, "Gray", "White", 1); // Uses 75 as the width, buildingHeight as the height, gray is the fill, and white is the outline
                building.x = 300 * i; // Sets the x value for building
                building.y = groundY - buildingHeight; // Sets the y value for building
                background.addChild(building); // Takes the building object and adds it to the background
                buildings.push(building); // Takes the building and pushes it to the building array for it to be stored
            }
            */
            //TODO 3: Part 1 - Add a lantern
            lantern = draw.bitmap("img/Lantern.png"); // Creates a bitmap opbject using the lantern image and stores it in the variabel lantern
            lantern.x = 450; // Sets the x value of the lantern
            lantern.y = groundY - 500; // Sets the y value of the lantern
            lantern.scaleX = 0.15;
            lantern.scaleY = 0.15;
            background.addChild(lantern);
        
        } // end of render function - DO NOT DELETE
        
        
        // Perform background animation
        // called on each timer "tick" - 60 times per second
        function update() {
            // useful variables
            var canvasWidth = app.canvas.width;
            var canvasHeight = app.canvas.height;
            var groundY = ground.y;
            
            //TODO 3: Part 2 - Move the lantern!
            lantern.x = lantern.x - 1.95; // Moves the lantern to the left by subtracting from its current x position

            if (lantern.x < -100) { // Checks if the lantern has gone off to the left and resets it to the right
                lantern.x = canvasWidth;
            }
            
            // TODO 4: Part 2 - Parallax
            /*
            for (var i = 0; i < buildings.length; i++) {  
                var building = buildings[i]; // Takes index from the buildings array and stores it in building
                building.x -= 0.5; // Subtracts 0.5 from the x to move the building to the left
                if (building. x < -200) { // Checks if the x of the building goes off the screen
                    building.x = canvasWidth; // If it does, brings the building back to the right of the screen
                }
            }
            */

        } // end of update function - DO NOT DELETE
        
        
        
        /* Make a createjs Container for the background and let it know about the render and upate functions*/
        background = new createjs.Container();
        background.resize = render;
        background.update = update;
        
        /* make the background able to respond to resizing and timer updates*/
        app.addResizeable(background);
        app.addUpdateable(background);
        
        /* render and return the background */
        render();
        return background;
    };
};

// DON'T REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = background;
}
