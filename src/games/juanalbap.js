//You might have some game state so you can keep track of
//what is happening:
let score;
let alive;
let action;
let heroHealth = 100;
let zombieHealth = 100;
let facingRight = true;
let fired = false;
let bulletReady;


//You might have some constants that you use
const speed = 100;  //In pixels per second
let gunBulletSpeed = 300;
const zombieSpeed = 10;

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


    sprites[0].image = "🚶"; //Hero
    sprites[0].flipH = true;
    sprites[0].x = 120;
    sprites[0].y = -5;

    sprites[1].image = "🔫"; //Handgun: How do I resize? ❗❗
    sprites[1].flipH = true;
    sprites[1].x = sprites[0].x + 28;
    sprites[1].y = sprites[0].y;

    sprites[2].image = ""; //Bullet; How do I resize? Change color?
    sprites[2].x = sprites[1].x;
    sprites[2].y = sprites[1].y + 17;

    sprites[3].image = "🧟"; //Zombie. How do I make many? ❗❗
    sprites[3].x = 700;
    sprites[3].y = -5;

    bulletReady = true;



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

    const hero = sprites[0];
    const gun = sprites[1];
    const gunBullet = sprites[2];
    const zombie = sprites[3];

    //Movement mechanisms
    if (up) {
        //Speed is in pixels per second, and
        //dt is the number of seconds that have
        //passed since the last frame.

        //Multiply them together so that the
        //truck moves at the same speed if the
        //computer is fast or slow
        // hero.y += speed * dt;
    }
    if (down) {
        action = true;
    }
    if (right) {

        facingRight = true;
        hero.x += speed * dt;
        hero.flipH = true;
        gun.flipH = true;
        gun.x = hero.x + 28;

    }

    if (left) {

        facingRight = false;
        hero.x -= speed * dt;
        hero.flipH = false;
        gun.flipH = false;
        gun.x = hero.x - 50;

    }

    //Shooting mechanisms
    if (space && bulletReady == true) {

        if (facingRight == true) {
            gunBullet.x = gun.x + 46;
        } else {
            gunBullet.x = gun.x + 9;
        }

        gunBullet.image = ".";

        //Rotate gun a bit and make it go back to simulate recoil; ❗❗
        gun.x -= 2;
        //add delay
        gun.x += 2;
        //Add a little fire effect on the barrel? ❗❗
        if (facingRight == true) {
            gunBulletSpeed = 200;
            bulletReady = false;
        } else if (facingRight == false) {
            gunBulletSpeed = -200;
            bulletReady = false;
        }
        

    }

    //add recoil variable

    if (gunBulletSpeed != 0) {
    
        gunBullet.x += dt * gunBulletSpeed;
        bulletReady == true;

        //And stop it when it goes off screen
        if (gunBullet.x < -5 || gunBullet.x > 790){
            gunBullet.image = "";
            bulletReady = true;
            gunBulletSpeed = 0;
            
        }

        if (gunBullet.x <= zombie.x + 10 && gunBullet.x >= zombie.x + 10) {
            gunBullet.image = "";
            zombieHealth -= 100;
            bulletReady = true;
            gunBulletSpeed = 0;
            score++;
        }


    }

    //Zombie mechanisms
    if (hero.x < zombie.x) {
        zombie.x -= zombieSpeed * dt;
    }
    if (hero.x > zombie.x) {
        zombie.x += zombieSpeed * dt;
    }
    if (hero.x == zombie.x) {
        heroHealth -= 30;
    }

    if (zombieHealth <= 0) { //❗❗
        zombie.image = "🪦";
        setTimeout(() => { zombie.image = ""; }, 3000);
    }

    if (heroHealth <= 0) { //❗❗
        alive = false;
    }


    return score;
};





export default {
    name: "Zombie Frenzy",
    instructions: "Arrows to move, Spacebar to shoot, Down arrow to pick up loot.",
    icon: "🧟", //Choose an emoji icon
    background: {
        "background-color": "white",
        "background-image": "linear-gradient(#424299, skyblue)",
        "border-bottom": "120px solid green"
    },
    frame,
    setup,
};