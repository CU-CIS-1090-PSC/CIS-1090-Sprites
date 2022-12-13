//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //is the 
const walk = 360;

//You might have some constants that you use
//In pixels per second

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


    //Putting two sprites together you
    //can make more complicated things.
    sprites[1].image = "🧤"; //A fire engine
    sprites[1].x = 300;
    sprites[1].y = 25;
    sprites[2].image = "⚾"; //A fire engine
    sprites[2].x = 300;
    sprites[2].y = 500;

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

let speed = 330;
const gravity = 450;

function frame(sprites, t, dt, up, down, left, right, space) {

    const glove = sprites[1];
    const ball = sprites[2];

    sprites[2].y = sprites[2].y - dt * speed;

    if (sprites[2].y <= 0) {
        ball.y = 450;
        speed = 330;
        ball.x = Math.random() * 750;
    }

    if (distance(ball, glove) <= 20){
        ball.y = 450;
        speed = 330;
        ball.x = Math.random() * 750;
        score++
    }

    //move glove

    if (right) {
        glove.x += walk * dt;
    }
    if (left) {
        glove.x -= walk * dt;
    }

    //A very simple repeating animation
    sprites[2].y += Math.sin(t) / 10;


    return score;
}


export default {
    name: "Ball Boy!",
    instructions: "Catch the Balls!",
    icon: "⚾", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#155"
    },
    frame,
    setup,
};