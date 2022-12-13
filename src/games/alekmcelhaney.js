
//This is a helper function to compute the distance
//between two sprites
function distance(a, b) {
    let dx = a.x - b.x;
    let dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//This setup function is called once
//So you can set everything up.
function setup(sprites) {


    //Make sprite zero a little person at 0,0
    sprites[0].image = "🧍🏿";
    sprites[0].x = 10;
    sprites[0].y = 10;

    sprites[1].image = "🥛";
    sprites[1].y = 0;
    sprites[1].x = 300;

    sprites[2].image = "🍠";
    sprites[2].y = 0;
    sprites[2].x = 300;

    sprites[3].image = "🐂";
    sprites[3].y = 0;
    sprites[3].x = 300;




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

let speed = 150;
const gravity = 450;
let caughtMilk = false;
function frame(sprites, t, dt, up, down, left, right, space) {
    const milk = sprites[1];
    const yam = sprites[2];
    const ox = sprites[3];


    //acceleration and movement
    speed = speed + gravity * dt;
    milk.y = milk.y - dt * speed;
    yam.y = yam.y - dt * speed;
    ox.y = ox.y - dt * speed;

    if (milk.y <= 0) {
        milk.y = 450;
        speed = 150;
        milk.x = Math.random() * 750;
    }

    if (yam.y <= 0) {
        yam.y = 450;
        speed = 150;
        yam.x = Math.random() * 750;
    }

    if (ox.y <= 0) {
        ox.y = 450;
        speed = 150;
        ox.x = Math.random() * 750;
    }



    //Pressing right or left?
    //Move the man.
    if (right) {
        sprites[0].x += dt * 500;
        sprites[0].flipH = true; //And flipH his sprite if he is going right
    }
    if (left) {
        sprites[0].x -= dt * 500;
        sprites[0].flipH = false;
    }


    //If you try to run past the ends of the screen
    //it stips you
    if (sprites[0].x < 0)
        sprites[0].x = 0;
    if (sprites[0].x > 750)
        sprites[0].x = 750;

    if (left || right) {
        //Otherwise swap between two poses
        sprites[0].image = (Math.round(t * 10) % 2) ? "🧍🏿" : "🕺🏾";
    } else {
        //Staying still? Use still person
        sprites[0].image = "🧍🏿";
    }

    if (distance(milk, sprites[0]) < 50) {
        caughtMilk = true;
    }

    if (caughtMilk) {
        milk.x = sprites[0].x;
        milk.y = sprites[0].y;

    }

    if (distance(milk, sprites[0]) > 700) {
        caughtMilk = false;


    }
}
    export default {
        name: "King Shaka Day",
        instructions: "Left and Right arrows to move.",
        icon: "🥳",
        background: {
            //A more complicated background
            "background-color": "blue",
            "background-image": "linear-gradient(#424299, skyblue)",
            "border-bottom": "50px solid green"
        },
        frame,
        setup,
    }