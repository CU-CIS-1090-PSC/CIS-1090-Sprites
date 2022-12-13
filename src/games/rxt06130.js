//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //is the 

//You might have some constants that you use
const speed = 300;  //In pixels per second

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

    sprites[0].image = "🐒"; //A monkey
    sprites[0].x = 100;
    sprites[0].y = 100;
    sprites[1].image = "🍌"; //A banana
    sprites[1].x = 300;
    sprites[1].y = 100;
    sprites[2].image = "🍌"; 
    sprites[2].x = 250;
    sprites[2].y = 200;
    sprites[3].image = "🍋"; //A lemon
    sprites[3].x = 400;
    sprites[3].y = 100;
    sprites[4].image = "🍋";
    sprites[4].x = 700;
    sprites[4].y = 200;
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
    //Keep references to the sprites in some variables with
    //better names:
    const monkey = sprites[0]; 
    const banana = sprites[1]; 
    const banana2 = sprites[2]; 
    const lemon = sprites[3];
    const secondlemon = sprites[4]


    //Move the monkey
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //monkey moves at the same speed if the
        //computer is fast or slow
        monkey.y += speed * dt;
    } 
    if (down) {
        monkey.y -= speed * dt;
    }
    if (right) {
        monkey.x += speed * dt;
        //You can flipH a sprite so it is facing
        //the other direction
        monkey.flipH = true;
    }
    if (left) {
        monkey.x -= speed * dt;
        monkey.flipH = false;
    }

    //If the monkey is close to the banana
    if ( distance(monkey, banana) < 20 ){
        banana.x = Math.random()*750;
        banana.y = Math.random()*200;
        score++;
    }
    if ( distance(monkey, banana2) < 20 ){
        banana2.x = Math.random()*700;
        banana2.y = Math.random()*350;
        score++;
    }
    if ( distance(monkey, lemon) < 25 ){
        lemon.x = Math.random()*750;
        lemon.y = Math.random()*400;
        score--;
    }
    if ( distance(monkey, secondlemon) < 25 ){
        secondlemon.x = Math.random()*750;
        secondlemon.y = Math.random()*400;
        score--;
    }

    //A very simple repeating animation
    sprites[1].y += Math.sin(t)/10;

    return score;
};




export default {
    name: "Monkey See, Monkey Do",
    instructions: "Instructions: Using the arrow keys, move around the monkey to collect all of the bananas! But be careful because if lemons are collected, a point will be deducted!",
    icon: "🐒", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "#9ACD32"
    },
    frame,
    setup,
};