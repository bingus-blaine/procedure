var gravity = 1
var obstacle;
var standing
var leftwall
var rightwall
var ceiling
var leftcolumn
var rightcolumn
var floor
    ////fly
var flyleft
var flyright
var fly
var flypain = false
    //////////flybullet
var flygoo
var gooshoot
var flygoos
var squirt
var flyhit_right
var flyhit_left
var squirtspawn = false
    ////man
var jump = 15
var manspeed = 3
var manstand_anim
var manstand2_anim
var manmoveright_anim
var manmoveleft_anim
var man
var man_x
var canjump = true
    /////mutant
var mutantstand
var mutantstandright
var mutantright_anim
var mutantleft_anim
var mutant
var mutantjump = 20
var mutantjumping
var mutant_x
var mutantspeed
var mutantpain = false
var mutantdead = false
    ////////////mutant follow
var distance
    ////////////////////////mutant spit
var time;
var wait = 7000
var goon
var goons
var goonspawn = false
    //////////////////manbullet
var bullet
    //////mangrenade
var mangrenade
var bomb
var canthrow = true
var splosion
var splosions
var explode
    /////
var eyeman
var eyeanim
var eyehurt
var eyepain = false
var eyespawn = false
    ////////
var bulletright
var bulletleft
var bullets
///////////////////LIFE
var e = 5000;
var f = 5000;
var m = 5000;
var manlife = 900;
//////////
var showlives = false

function preload() {
    /////////man
    manstand_anim = loadAnimation("assets/running1.png");
    manstand2_anim = loadAnimation("assets/standleft.png");
    manmoveright_anim = loadAnimation("assets/running1.png", "assets/running18.png");
    manmoveleft_anim = loadAnimation("assets/runleft18.png", "assets/runleft1.png");
    ////////////////mutant
    mutantstand = loadAnimation("assets/mutant/mutant1.png");
    mutantstandright = loadAnimation("assets/mutant/mutantright1.png");
    mutantleft_anim = loadAnimation("assets/mutant/mutant4.png", "assets/mutant/mutant1.png");
    mutantright_anim = loadAnimation("assets/mutant/mutantright4.png", "assets/mutant/mutantright1.png");
    mutanthit_right = loadAnimation("assets/mutant/Rmutanthit1.png", "assets/mutant/Rmutanthit4.png");
    mutanthit_left = loadAnimation("assets/mutant/Lmutanthit.png");
    ////////////fly
    flyleft = loadAnimation("assets/fly/fly1.png", "assets/fly/fly2.png");
    flyright = loadAnimation("assets/fly/flyright1.png", "assets/fly/flyright6.png");
    squirt = loadAnimation("assets/fly/flygoo (1).png");
    flyhit_right = loadAnimation("assets/fly/flyhit_right.png");
    flyhit_left = loadAnimation("assets/fly/flyhit_left.png");
    ////////bomb
    bomb = loadAnimation("assets/bomb/bomb1.png", "assets/bomb/bomb3.png");
    //////eyeman
    eyeanim = loadAnimation("assets/eye/Eye1.png", "assets/eye/Eye20.png");
    eyehurt = loadAnimation("assets/eye/eyehurt.png");
    /////////manbullets
    bulletright = loadAnimation("assets/bullet/bulletright1.png", "assets/bullet/bulletright8.png");
    bulletleft = loadAnimation("assets/bullet/bulletleft1.png", "assets/bullet/bulletleft8.png");
        //////////manmelee
    meleeright = loadAnimation("assets/man/melee/manmelee_right1.png", "assets/man/melee/manmelee_right9.png");
    meleeleft = loadAnimation("assets/man/melee/manmelee_left1.png", "assets/man/melee/manmelee_left9.png");
        ///////////////goon
    goonleft = loadAnimation("assets/goon/goonleft1.png", "assets/goon/goonleft4.png");
    goonright = loadAnimation("assets/goon/goonright1.png", "assets/goon/goonright4.png")
    explode = loadAnimation("assets/explode/explode.png");
    ////////scenery
    leftcolumn = loadAnimation("assets/scenery/left column.png");
    floor = loadAnimation("assets/scenery/floor.png");


}

function setup() {
    createCanvas(1000, 500);
    man_x = 100;
    mutantspeed = 0;
    ////////platform
    platform = createSprite(width / 2, 475, 900, 100);
    platform.addAnimation("floor", floor);
    ////////////wals
    leftwall = createSprite(0, height / 2, 100, height);
    leftwall.addAnimation("leftcolumn", leftcolumn);
    rightwall = createSprite(width, height / 2, 100, height);
    rightwall.addAnimation("leftcolumn", leftcolumn)
    ceiling = createSprite(width / 2, -100, 1000, 200);
    //////grenade
    grenade_x = 2000;
    grenade_y = 2000;
    mangrenade = createSprite(grenade_x, grenade_y, 10, 10);
    mangrenade.addAnimation("grenade", bomb);
    ///////bullets
    bullets = new Group();
    flygoos = new Group();
    goons = new Group();
    splosions = new Group();
    ////////////fly
    fly = createSprite(500, 200);
    fly.addAnimation("flyright", flyright);
    fly.addAnimation("flyleft", flyleft);
    fly.addAnimation("flyhit_left", flyhit_left);
    fly.addAnimation("flyhit_right", flyhit_right);
    /////////////mutantanimations
    mutant = createSprite(900, 100);
    mutant.addAnimation("leftstand", mutantstand);
    mutant.addAnimation("rightstand", mutantstandright);
    mutant.addAnimation("mutantright", mutantright_anim);
    mutant.addAnimation("mutantleft", mutantleft_anim);
    mutant.addAnimation("mutanthit_right", mutanthit_right);
    mutant.addAnimation("mutanthit_left", mutanthit_left)
    mutant.position.x = 800;
    /////////////colliders
    mutant.setCollider("rectangle", 0, 0, 70, 160);
    fly.setCollider("rectangle", 0, 0, 80, 80);
    mangrenade.setCollider("rectangle", 0, 0, 10, 10);
    ////////////manimations
    man = createSprite(man_x, 100);
    man.addAnimation("default", manstand_anim);
    man.addAnimation("standleft", manstand2_anim);
    man.addAnimation("walkingright", manmoveright_anim);
    man.addAnimation("walkingleft", manmoveleft_anim);
    man.addAnimation("meleeleft", meleeleft);
    man.addAnimation("meleeright", meleeright);
    ////eyeman
    eyeman = createSprite(600, 80, 25, 25);
    eyeman.addAnimation("eye", eyeanim);
    eyeman.addAnimation("eyehurt", eyehurt);
    ////////////////////////splode
    time = millis();

}

function draw() {
    background(245);
    //////////////gravity
    man.velocity.y += gravity;
    mutant.velocity.y += gravity;
    mangrenade.velocity.y += 0.5;
    ///////////////////////////collide
    ////////////mancollide
    if (man.collide(platform)) {
        man.velocity.y = 0;
    }
    if (man.collide(leftwall)) {
        man.velocity.x = 0;
        man.changeAnimation("standleft");
    }
    if (man.collide(rightwall)) {
        man.velocity.x = 0;
        man.changeAnimation("default");
    }
    if (man.collide(ceiling)) {
        man.velocity.y = 0;
    }
    ///////////mutant collide
    if (mutant.collide(platform)) {
        mutant.velocity.y = 0;
    }
    if (mutant.collide(leftwall)) {
        mutant.velocity.x = 0;
        mutant.changeAnimation("leftstand");
    }
    if (mutant.collide(rightwall)) {
        mutant.velocity.x = 0;
        mutant.changeAnimation("rightstand");
    }
    if (mutant.collide(ceiling)) {
        a
        mutant.velocity.y = 0;
    }
    ////////flycollide
    if (fly.collide(platform)) {
        fly.velocity.y = 0;
    }
    if (fly.collide(leftwall)) {
        fly.velocity.x = 0;
    }
    if (fly.collide(rightwall)) {
        fly.velocity.x = 0;
    }
    if (fly.collide(ceiling)) {
        fly.velocity.y = 0;
    }
    ///////////eyemancollide
    if (eyeman.collide(platform)) {
        eyeman.velocity.y = 0;
    }
    if (eyeman.collide(leftwall)) {
        eyeman.velocity.x = 0;
    }
    if (eyeman.collide(rightwall)) {
        eyeman.velocity.x = 0;
    }
    if (eyeman.collide(ceiling)) {
        eyeman.velocity.y = 0;
    }
    ///////////////////////man on monsters
    /////mutant
    if (mutant.collide(man)) {
        onmonster();
    }
    if (man.collide(mutant)) {
        mutant.velocity.x = 0;
    }
    if (man.collide(fly)) {
        onfly();
    }
    /////
    ////////////////////Manmoving
    if (canjump && keyWentDown("w")) {
        man.velocity.y -= jump;
    }
    if (man.collide(platform)) {
        man.velocity.y = 0;
    }
    /////manmoving
    if (keyWentDown("d")) {
        man.velocity.x += manspeed;
    }
    if (keyWentDown("a")) {
        man.velocity.x -= manspeed;
    }
    if (man.velocity.x > 0) {
        man.changeAnimation("walkingright");
    }
    if (man.velocity.x < 0) {
        man.changeAnimation("walkingleft");
    }
    /////////////manstopping
    if (man.velocity.x < 0) {
        goright = false
    }
    if (man.velocity.x > 0) {
        goright = true
    }
    if (man.velocity.x == 0) {
        if (goright = true) {
            man.changeAnimation("default");
        }
        if (goright = false) {
            man.changeAnimation("standleft");
        }
    }
    //////////////////mangrenade
    if (canthrow && keyWentDown("i")) {
        canthrow = false
        mangrenade.position.x = man.position.x
        mangrenade.position.y = man.position.y
        mangrenade.velocity.y = -7;
        if (man.velocity.x <= 0) {
            mangrenade.velocity.x = man.velocity.x - 6;
        }
        if (man.velocity.x >= 0) {
            mangrenade.velocity.x = man.velocity.x + 6;
        }
        setTimeout(explosion, 2000);
    }
    ////////////////////mangrenade.bounce
    if (mangrenade.collide(platform)) {
        mangrenade.velocity.y = mangrenade.velocity.y / -1.5;
        mangrenade.velocity.x = mangrenade.velocity.x / 2;
    }
    if (mangrenade.collide(rightwall)) {
        mangrenade.velocity.x = -mangrenade.velocity.x;
    }
    if (mangrenade.collide(leftwall)) {
        mangrenade.velocity.x = -mangrenade.velocity.x;
    }
    //////////////monsterhurt
    mutant.overlap(bullets, mutanthit);
    mutant.overlap(splosions, mutantsplode);
    fly.overlap(bullets, flyhit);
    eyeman.overlap(splosions, eyesplode);
    eyeman.overlap(bullets, eyehit);
    //////////////////////////manshoot
    if (keyWentDown("j")) {
        var bullet = createSprite(man.position.x, man.position.y);
        bullet.addAnimation("bulletleft", bulletleft);
        bullet.addAnimation("bulletright", bulletright);
        bullet.setCollider("rectangle", 0, 0, 20, 20);
        bullet.velocity.x = -15;
        bullet.life = 250;
        bullets.add(bullet);
    }
    if (keyWentDown("l")) {
        var bullet = createSprite(man.position.x, man.position.y);
        bullet.addAnimation("bulletright", bulletright);
        bullet.setCollider("rectangle", 0, 0, 20, 20);
        bullet.velocity.x = 15
        bullets.add(bullet);
    }
    //////////////////mutantspeed
    if (mutant.position.x > man.position.x) {
        mutant.changeAnimation("mutantleft");
        mutant.velocity.x -= 0.009;
    }
    if (mutant.position.x < man.position.x) {
        mutant.changeAnimation("mutantright");
        mutant.velocity.x += 0.009;
    }
    if (mutantpain) {
        setTimeout(mutantfine, 100);
        if (mutant.position.x > man.position.x) {
            mutant.velocity.x -= 0.009;
            mutant.changeAnimation("mutanthit_left");
        }
        if (mutant.position.x < man.position.x) {
            mutant.velocity.x += 0.009;
            mutant.changeAnimation("mutanthit_right");
        }
    }
    //////////////////mutantspit
    if(goonspawn){
    if (millis() - time >= wait) {
        var goon = createSprite(mutant.position.x, mutant.position.y - 15);
        goon.addAnimation("goonright", goonright);
        goon.addAnimation("goonleft", goonleft);
        if (man.position.x >= mutant.position.x) {
            goon.velocity.x = 4;
            goon.position.x = mutant.position.x +40;
            goon.changeAnimation("goonright");
        }
        if (man.position.x <= mutant.position.x) {
            goon.velocity.x = -4;
            goon.position.x = mutant.position.x - 40
            goon.changeAnimation("goonleft");
        }
        goon.velocity.y = 6;
        goons.add(goon);
        time = millis();
        }
    }

    goons.overlap(platform, goonground);
    goons.overlap(leftwall, goonwall);
    goons.overlap(rightwall, goonwall);
    goons.overlap(splosions, goonsplode)
    /////////////////////flyspeed
    if (fly.position.x > man.position.x) {
        fly.changeAnimation("flyleft");
        fly.velocity.x -= 0.09;
    }
    if (fly.position.x < man.position.x) {
        fly.changeAnimation("flyright");
        fly.velocity.x += 0.09;
    }
    ///////////flybeinghit
    if (flypain) {
        if (fly.position.x > man.position.x) {
            fly.changeAnimation("flyhit_left");
            fly.velocity.x -= 0.09;
        }
        if (fly.position.x < man.position.x) {
            fly.changeAnimation("flyhit_right");
            fly.velocity.x += 0.09;
        }
        setTimeout(flyfine, 100);
    }
    /////////////////////gooshoot
    if(squirtspawn){
    if (fly.position.x <= man.position.x + 30 &&
        fly.position.x >= man.position.x - 30) {
        var flygoo = createSprite(fly.position.x, fly.position.y, 10, 10)
        flygoo.addAnimation("flygoo", squirt);
        flygoo.attractionPoint(10, man.position.x, man.position.y);
        flygoo.life = 27;
        flygoos.add(flygoo);
        }
    }

    //////////////eyeman

    if (eyepain) {
        eyeman.changeAnimation("eyehurt");
        setTimeout(eyefine, 100);
    }
//////////////////////////////////DEATH
    ////////monsterdeath
    if (m <=0) {
        mutantdeath();
    }

    if (e <= 0){
        eyedeath();
    }

    if (f <=0){
        flydeath();
    }
    drawSprites();
    //////////////////LIFE
    fill(68, 0, 255);
    rect(50, 475, manlife, 10);

     if(man.overlap(goons)){
        manlife = manlife - 1;
    }
     if(man.overlap(flygoos)){
       manlife = manlife - 1
     }
    if(eyespawn){
    eyeman.attractionPoint(0.05, man.position.x, man.position.y);
    if (man.overlap(eyeman)){
        manlife = manlife - 1
    }
    }
    if(manlife <= 0){
        fill(0);
        rect(0, 0, width, height);
    }

    if(showlives){
    text(f, fly.position.x, fly.position.y -60);
    text(m, mutant.position.x-30, mutant.position.y-100);
    text(e, eyeman.position.x-15, eyeman.position.y-50);
    }

}

function onmonster() {
    canjump = true
    man.velocity.y = 0
    mutant.velocity.x = 0
    mutant.animation.stop;
    man.changeAnimation("default");
    if (keyWentDown("w")) {
        man.velocity.y -= 7;
    }
    if (man.collide(mutant)) {
        man.velocity.y = 0;
    }
}

function onfly() {
    man.velocity.y = 0
    if (keyWentDown("w")) {
        man.velocity.y -= 7;
    }
    if (man.collide(fly)) {
        man.velocity.y = 0;
    }
}

function explosion(){
    canthrow = true
    splosion = createSprite(mangrenade.position.x, mangrenade.position.y-15);
    splosion.addAnimation("explode", explode);
    mangrenade.velocity.x = 0
    mangrenade.velocity.y = -3;
    setTimeout(resetsplode, 200);
    splosions.add(splosion);

}
function resetsplode(){
    splosion.remove();
    mangrenade.position.x = 3000;
}

function mutanthit(mutant, bullet) {
    bullet.remove();
    mutantpain = true;
    m = m - 1;
}

function mutantsplode(mutant, splosion){
    mutant.velocity.y = -7;
    mutantpain = true
    m = m-8;
}

function mutantfine() {
    mutantpain = false;
}

function mutantdeath() {
   mutant.position.x = 1100;
   mutant.velocity.y = 0;
   mutant.velocity.x = 0;
    goonspawn = false
}

function flyhit(fly, bullet) {
    bullet.remove();
    flypain = true
    f = f - 1
}

function eyesplode(){
    eyepain = true;
    eyeman.velocity.y = -30
    e = e-5
}

function flyfine() {
    flypain = false
}

function flydeath(){
    fly.position.x = 1100
    fly.velocity.x = 0
    fly.velocity.y = 0
    squirtspawn = false

}

function eyehit(eyeman, bullet){
    bullet.remove();
    eyepain = true;
    e = e-1
}

function eyefine(){
    eyepain = false;
    eyeman.changeAnimation("eye");
}

function eyedeath(){
    eyeman.position.x = 1100;
    eyeman.velocity.x = 0;
    eyeman.velocity.y = 0;
}

function manhit(man, flygoo) {
    flygoo.remove();
}

function goonground(goon) {
    goon.velocity.y = 0;
}

function goonwall(goon) {
    goon.velocity.x = -1 * goon.velocity.x
    if (goon.velocity.x <= 0) {
        goon.changeAnimation("goonleft")
    }
    if (goon.velocity.x >= 0) {
        goon.changeAnimation("goonright")
    }
}

function goonsplode(goon, splosion){
    goon.velocity.y = -30;
    goon.velocity.x = goon.velocity.x*-1;
    goon.life = 60;

}


function keyPressed(){
    if(keyCode === SHIFT){
        squirtspawn = true;
        goonspawn = true;
        eyespawn = true;
        e = 100;
        f = 75;
        m = 350;
        showlives = true
    }
}



