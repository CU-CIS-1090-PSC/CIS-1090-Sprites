//The y velocity of the dino
let yVelocity;

//True when the dino is dead
let dead;

//Initial score is zero
let score;

//setup function
function setup (sprites) {
    yVelocity = 0;
    score = 0;
    dead = false;

    //Make the dino to appear at the bottom of the screen(0,0)
    sprites[0].image = "🦖";
    sprites[0].flipH = true;
    sprites[0].x = 0;
    sprites[0].y = 0;

    //volcano sprite
    for (let i = 1; i < 2; i++) {
        sprites[i].image = "🌋"
        sprites[i].x = 500 * i;
        sprites[i].y = 0;
    }
   

   //eagle sprite
    for (let a = 3; a < 4; a++) {
        sprites[a].image = "🦅";
        sprites[a].y = 100;
        sprites[a].x = 500 * a; //Spread 500px apart
    } 
    
}

/**
 * Game function called every frame
 * @param sprites   Array of sprite objects
 * @param t         Time since start of game
 * @param dt        Time since last frame
 * @param up        Is up pressed?
 * @param down      "
 * @param left      "
 * @param right     "
 * @param space     "
 * @returns The current score
 */

 function frame(sprites, t, dt, up, down, left, right, space) {
    if (dead) {
        //If the dino is dead do nothing until they hit space
        if (space) {
            //reset the score, bring back to life and drop from the air
            score = 0;
            dead = false;
            sprites[0].y = 150;
        }
        return score;
    }

    //Pressing right or left?
    //Move the dino
    if (right) {
        sprites[0].x += dt * 150;
        sprites[0].flipH = true; //And flipH his sprite if he is going right
    } else if (left) {
        sprites[0].x -= dt * 200;
        sprites[0].flipH = false;
    }

    //If you try to run past the ends of the screen
    //it stops you
    if (sprites[0].x < 0)
        sprites[0].x = 0;
    if (sprites[0].x > 750)
        sprites[0].x = 750;
        
    if (left || right) {
        //If we are moving left or right
        if (sprites[0].y > 0) {
            //In the air? Always a running man
            sprites[0].image = "🦖";
            
        } else {
            //Otherwise swap between two poses
            //sprites[0].image = (Math.round(t * 10) % 2) ? "🦖" : "🦖";
        }
    } else {
        //Staying still? Use still person
        sprites[0].image = "🦖";
        sprites[0].flipH = true;
    }


    //If up pressed, and on the ground,
    //jump, give hero a positive velocity
    if (up && sprites[0].y == 0) {
        yVelocity = 500;
    }

    //Move hero by y velocity
    sprites[0].y += yVelocity * dt;

    //Update y velocity
    if (sprites[0].y > 0) {
        //If he is in the air, decrease his
        //y velocity
        yVelocity = yVelocity - 1500 * dt;
    } else {
        //When he is at the ground, set it 0
        yVelocity = 0;
        sprites[0].y = 0;
    }


    //Move volconoes 
    for (let i = 1; i < 2; i++) {
        //Move each volcano. Add some speed based on i
        //so they all go different speeds, and add some
        //speed based on the score
        sprites[i].x -= dt * (200 + 20 * score);

        //If a volcano goes off the left hand side
        if (sprites[i].x < -30) {
            //Move him back off the right hand side
            sprites[i].x = 800 + Math.random() * 400;
            score++; //Increase the score
        }
        //Make them bounce up and down a little
        //sprites[i].y = Math.sin(20 * t + 10 * i);
    }

    //Move eagles 
    for (let a = 3; a < 4; a++) {
        sprites[a].x -= dt * (300 + 20 * score);
        

         //if the eagle goes off the left hand side
        if (sprites[a].x < -30) {
        sprites[a].x = 750;
        score++;
        }
        //Make it swoop in
        sprites[a].y = (Math.sin(t * 10) * 100) + 90;
    }



    //Check each volcano to see if it hits the hero
    for (let i = 1; i < 2; i++) {
        let dMan = Math.abs(sprites[i].x - sprites[0].x);
        if (dMan < 10 && sprites[0].y < 30) {
            //Too close? hero dead!
            dead = true;
            sprites[0].image = "☠️";
        }
    }
    //check each eagle to see if it hits the hero
    for (let a = 3; a < 4; a++ ) {
        let dManx = Math.abs(sprites[a].x - sprites[0].x);
        let dMany = Math.abs(sprites[a].y - sprites[0].y);
        if (dManx < 10 && dMany < 10) {
            //Too close? dino dead!
            dead = true;
            sprites[0].image = "☠️";
        } 
    }

    return score;
};

export default {
    name: "Dino Dash",
    instructions: "Left and Right arrows to move, Up to jump, Space to restart.",
    icon: "🦖",
    background: {
        //A more complicated background
        "background-color": "skyblue",
        "background-image": "linear-gradient(blue, grey)",
        "border-bottom": "20px solid darkgreen"
    },
    frame,
    setup,
};
 

