//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score, built-in, cannot be removed.
let dead; //The player's dead state

//You might have some constants that you use
let speed = 300;  //In pixels per second

//This is a helper function to compute the distance
//between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//This setup function is called once when the game starts
function setup(sprites) {
    score = 0;      //set score to zero
    dead = false; //Player is alive by default
    sprites[0].image = "🧍"; //Standing man
    sprites[0].x = 350;
    sprites[0].y = 230;
    sprites[1].image = "☢️"; //Radiation particle 1
    sprites[1].x = 675;
    sprites[1].y = 400;
    sprites[2].image = "☣️"; //Radiation particle 2
    sprites[2].x = 675;
    sprites[2].y = 10;
    sprites[3].image = "☢️"; //Radiation particle 3
    sprites[3].x = 50;
    sprites[3].y = 50;
}
//The Velocity for the particles
//Set to 0 for debugging / coordinate adjustment purposes
//Each particle cannot share the same vx and vy, otherwise there will be bounce collision conflictions!
let vx = 250;
let vy = 250;
let vx2 = 250;
let vy2 = 250;
let vx3 = 250;
let vy3 = 250;

/**
 * This function is called every frame
 * @param sprites   Array of sprite objects
 * @param t         Seconds since start of game
 * @param dt        Seconds since last frame (A very small number)
 * @param up        Is up arrow pressed?
 * @param down      "
 * @param left      "
 * @param right     "
 * @param space     Is spacebar pressed?
 * @returns The current score
 */
function frame(sprites, t, dt, up, down, left, right, space) {
    //Keep references to the sprites in some variables with
    //better names:
    const player = sprites[0]; //A nickname easier to remember 
    const RadiationOne = sprites[1]; 
    const RadiationTwo = sprites[2]; 
    const RadiationThree = sprites[3];

    //Game killcode for the dead state
    if (dead) {
        //If the hero is dead do nothing until they hit space
        if (space) {
            //reset the score, being to life, lift up in the air
            setup(sprites);
        }
        return score;
    }

    score += dt;
    if (score < 1000000){
        score = Math.floor(score + 1)
    }
    //Move the player
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        player.y += speed * dt;
    } 
    if (down) {
        player.y -= speed * dt;
    }
    if (right) {
        player.x += speed * dt;
        sprites[0].image = "🏃‍♂️";
        //You can flipH a spright so it is facing
        //the other direction
        player.flipH = true;
    }
    if (left) {
        player.x -= speed * dt;
        sprites[0].image = "🏃‍♂️";
        player.flipH = false;
    }


    //Killcode lines for the default radiation touching player
    if (distance(player, RadiationOne) < 50) {
        dead = true;
    }

    if (distance(player, RadiationTwo) < 50) {
        dead = true;
    }

    if (distance(player, RadiationThree) < 50) {
        dead = true;
    }

    //stops the player from leaving the frame horizontally
    if (sprites[0].x < -20)
        sprites[0].x = -20;
    if (sprites[0].x > 755)
        sprites[0].x = 755;
    //stops the player from leaving the frame vertically
    if (sprites[0].y < -9)
        sprites[0].y = -9;
    if (sprites[0].y > 445)
        sprites[0].y = 445;

    
    //The radiation's code for bouncing around the frame
    //The Radiation goes diagonally, because Vertical and Horizontal velocity is called at the same time
    //to prevent the sprites from escaping, if they're less than or equal to 450 (the square of the frame)
    //If walls are hit, they'll reverse their trajectory

    //For the first three default starting particles
    //default for all bounce positions, 450 y and 750 x
    //Radiation particle one, "☢️"
    sprites[1].y = sprites[1].y + vy * dt
    sprites[1].x = sprites[1].x + vx * dt
    if (sprites[1].y >= 450 || sprites[1].y <= 0){
        vy = -vy
    }
    if (sprites[1].x >= 750 || sprites[1].x <= 0){
        vx = -vx
    }
    //Radiation particle two, "☣️"
    sprites[2].y = sprites[2].y + vy2 * dt
    sprites[2].x = sprites[2].x + vx2 * dt
    if (sprites[2].y >= 450 || sprites[2].y <= 0){
        vy2 = -vy2
    }
    if (sprites[2].x >= 750 || sprites[2].x <= 0){
        vx2 = -vx2
    }
    //Radiation particle three, "☢️"
    sprites[3].y = sprites[3].y + vy3 * dt
    sprites[3].x = sprites[3].x + vx3 * dt
    if (sprites[3].y >= 450 || sprites[3].y <= 0){
        vy3 = -vy3
    }
    if (sprites[3].x >= 750 || sprites[3].x <= 0){
        vx3 = -vx3
    }
    //end of trajectory "function"

    return score
};


export default {
    name: "Radiation Runaway",
    instructions: "Dodge the Radiation particles using the arrow keys!",
    icon: "☢️", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#555"
    },
    frame,
    setup,
};