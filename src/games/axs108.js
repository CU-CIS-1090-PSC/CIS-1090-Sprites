//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //is the 

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



    //A fire engine
    sprites[0].image = "🧚";
    sprites[0].x = 300;
    sprites[0].y = 100;
    sprites[1].image = ["🍏", "🥭", "🍌"];
    sprites[1].x = 300;
    sprites[1].y = 120;

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

let whichFruit = 0;
const fruits = ["🍏", "🥭", "🍌", "💣"]
let timer = 0;
let speed = 150;
const gravity = 450;
function frame(sprites, t, dt, up, down, left, right, space) {
    //move the player
    const player = sprites[0];
    if (player.image == "💀") {
        if (space) {
            score = 0;
            player.image =  "🧚";
            sprites[0].y = 150;
        }
        return score;
    }
    if (up) {
        player.y += speed * dt;
    }
    if (down) {
        player.y -= speed * dt;
    }
    if (right) {
        player.x += speed * dt;
        player.flipH = true;
    }
    if (left) {
        player.x -= speed * dt;
        player.flipH = false;
    }

    //random frt
    sprites[1].image = fruits[whichFruit];
    timer += dt;
    if (timer > 4) {
        whichFruit = Math.floor(Math.random() * 4);
        timer = 0;
    }

    //fall
    const fruit = sprites[1];

    // acceleration and movement
    speed = speed + gravity * dt;
    fruit.y = fruit.y - dt * speed;

    if (fruit.y <= 0) {
        fruit.y = 450;
        speed = 150;
        fruit.x = Math.random() * 750;
    };

    if (distance(player, fruit) <= 20){
        if (fruit.image == "💣") {
            score= 0;
            player.image= "💀";

        } else {
            fruit.y = 450;
            speed = 150;
            fruit.x = Math.random() * 750;
            score = score + 1;

        }
    }
    return score
}

    export default {
        name: "Fake Fruit Ninja",
        instructions: "Catch fruit, but don't get blown up!",
        icon: "🥭", //Choose an emoji icon
        background: {
            //You can put CSS here to change your background
            "background-color": "#555"
        },
        frame,
        setup,
    };
