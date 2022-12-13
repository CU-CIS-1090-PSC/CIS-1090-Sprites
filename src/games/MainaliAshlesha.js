//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //is the 
let foodspeed = 150;
let explosionspeed = 100;

//You might have some constants that you use
const speed = 300;  //In pixels per second
const gravity = 150;

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
    alive = true;   //Set player to alive

    //Sprite "Images" are just characters,
    //But you can use emojis!
    // https://emojis.wiki/

    sprites[0].image = "👨 "; // Man 
    sprites[0].x = 100;
    sprites[0].y = 100;

    //Putting two sprites together you
    //can make more complicated things.
    sprites[1].image = "🍩"; //Food
    sprites[1].x = 200;
    sprites[1].y = 450;
    sprites[2].image = "💣"; //Explosion 
    sprites[2].x = 300;
    sprites[2].y = 450;
}

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
    if (!alive)
        return 0;
    //Keep references to the sprites in some variables with
    //better names:
    const man = sprites[0]; 
    const food = sprites[1]; 
    const explosion = sprites[2]; 


    //Move the man
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //man moves at the same speed if the
        //computer is fast or slow
        man.y += speed * dt;
    }
    if (down) {
        man.y -= speed * dt;
    }
    if (right) {
        man.x += speed * dt;
        //You can flipH a spright so it is facing
        //the other direction
        food.flipH = true;
    }
    if (left) {
        man.x -= speed * dt;
        man.flipH = false;
    }


    explosion.y = explosion.y - 1
    food.y = food.y - 1

    //Check each explosion to see if it hits the man
    if (distance(man, explosion) <= 50) {
        //Too close? man dead!
        alive = false;
        sprites[0].image = "☠️";
    }

    
    foodspeed = foodspeed + gravity * dt;
    food.y = food.y - dt * foodspeed;

    //Check  to see if food hits the man
    if (distance(man, food) <= 50) {
        // Man scores!
        score = score+1;
        food.y = 450;
        foodspeed = 150;
        food.x = Math.random() * 750;
    }



    if (food.y <= 0) {
        food.y = 450;
        foodspeed = 150;
        food.x = Math.random() * 750;
    }
    explosionspeed = explosionspeed + gravity * dt;
    explosion.y = explosion.y - dt * explosionspeed;

    if (explosion.y <= 0) {
        explosion.y = 450;
        explosionspeed = 150;
        explosion.x = Math.random() * 750;
    }

    return score;
 
};

export default {
    name: " Choose Wisely ",
    instructions: "Use the arrows to move, Up, down, left and right, Get the food, Stay away from explosions or else game over.",
    icon: "🍩/💣", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#555"
    },
    frame,
    setup,
};



