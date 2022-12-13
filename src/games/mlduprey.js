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

    sprites[0].image = "🦶";
    sprites[0].x = 10;
    sprites[0].y = 0;

    sprites[1].image = "⚽";
    sprites[1].x = 200;
    sprites[1].y = 400;

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
let ballSpeed = -10;
let ballSpeedx = 100;
function frame(sprites, t, dt, up, down, left, right, space) {
    //Keep references to the sprites in some variables with
    //better names:
    const foot = sprites[0];
    const ball = sprites[1];

    if (right) {
        foot.x = foot.x + 500 * dt ;
        foot.flipH = true;
    }
    if (left) {
        foot.x = foot.x - 500 * dt;
        foot.flipH = false;
    }


    ball.y = ball.y + ballSpeed * dt;
    ballSpeed = ballSpeed - 1000 * dt;
    ball.x = ball.x + ballSpeedx * dt;

    ball.x = ball.x % 700;
    if ( ball.x < 0 )
        ball.x = 699;

    if (ball.y <= -30){
        ball.y = 400;
        ballSpeed = -10;
        ballSpeedx = Math.random() * 400 - 200;
        score = 0;
    }

    if(distance(ball, foot) < 50 && ballSpeed < 0){
        console.log("hit");
        score = score + 1
        ballSpeed = -ballSpeed;
        ballSpeedx = Math.random() * 400 - 200;
    }

    return score; 
};

export default {
    name: "Kick the Ball",
    instructions: "Try to keep up with the ball! Use the left and right arrows to move your foot, and don't let the ball hit the ground!",
    icon: "⚽", // ⚽
    background: {
        "background-color": "skyblue",
        "background-image": "linear-gradient(#424299, skyblue)",
        "border-bottom": "50px solid green"
    },
    frame,
    setup,
};