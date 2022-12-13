//You might have some game state so you can keep track of
//what is happening:
let score;  //The players score
let alive;  //is the 
let timeuntilfireball = 4; //time each fireball is fired
let alienspeed = 150;
let dxbullet;
let dybullet;


//You might have some constants that you use
const speed = 300;  //In pixels per second
const gravity = 200;

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

    sprites[0].image = "💃🏻";
    sprites[0].x = 100;
    sprites[0].y = 100;

    //Putting two sprites together you
    //can make more complicated things.
    sprites[1].image = "👽";
    sprites[1].x = 300;
    sprites[1].y = 100;
    //sprites[2].image = "💀";
   // sprites[2].x = 300;
   // sprites[2].y = 120;
    //The bullet the girl shoots
    sprites[3].image = "✪";
    sprites[3].x = 100;
    sprites[3].y = 100;
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
    const girl = sprites[0]; //Easier to remember
    const alien = sprites[1]; //Easier to remember
    const fireball = sprites[2]; //Easier to remember
    const bullet = sprites[3];  //Easier to remember


    if (alive) {
        if (space) {
            score = 0;
            alive = false;
            sprites[0].y = 150;
            sprites[0].image = "💃🏻";
        }
        return score; 

    }

    //Move the fire engine
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.
        //
        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        girl.y += speed * dt;
    }
    if (down) {
        girl.y -= speed * dt;
    }
    if (right) {
        girl.x += speed * dt;
        //You can flipH a sprite so it is facing
        //the other direction
        girl.flipH = true;
    }
    if (left) {
        girl.x -= speed * dt;
        girl.flipH = false;
    }

    timeuntilfireball = timeuntilfireball - dt;
    if (timeuntilfireball <= 0) {
        fireball.x = alien.x;
        fireball.y = alien.y;
        console.log("shoot")
        timeuntilfireball = 4;
    }


    if (space) {
        if (bullet.flipH)
            bullet.x = girl.x - 40;
        else
            bullet.x = girl.x + 20;
        bullet.y = girl.y + 10;

        dxbullet = alien.x - bullet.x;
        dybullet = alien.y - bullet.y;
    }
    bullet.x = bullet.x + dxbullet / 60;
    bullet.y = bullet.y + dybullet / 60;

    alienspeed = alienspeed + gravity * dt;
    alien.y = alien.y - dt * alienspeed;

    if (alien.y <= 0) {
        alien.y = 450;
        alienspeed = 100;
        alien.x = Math.random() * 450;
    }

    if (distance(bullet, alien) < 50) {
        score++;
        alien.y = 450;
        alienspeed = 100;
        alien.x = Math.random() * 450;

    }

    if (distance(girl, alien) <= 50) {
        alive = true;
        sprites[0].image = "💀";
    }
    return score;

}


export default {
    name: "Kill the Alien",
    instructions: "Shoot the alien, but don't get abducted!",
    icon: "👽", //Choose an emoji icon
    background: {
        //You can put CSS here to change your background
        "background-color": "deep blue"
    },
    frame,
    setup,
};