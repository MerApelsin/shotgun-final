
var user = new Player();
var aiUser = new AiPlayer();

var resultText = document.getElementById("actionText");

var choiceBtn = document.getElementById("choiceButton");
choiceBtn.addEventListener("click",getText);

var resetButton = document.getElementById("resetBtn");
resetButton.addEventListener("click",function(){resetGame(user, aiUser);});

bulletCount = document.getElementById("bulletCount");

//game logic "loop"
function getText()
{
    var resultText = document.getElementById("actionText");
    action = document.getElementById("textChoice").value;
    if (user.alive == true && aiUser.aAlive == true && action < 5)
    {
        userPlay(user, action);
        if(user.validMove == true)
        {
            aiUser.gunLoad();
            compare(user, aiUser);
        }
        else
        {
        resultText.innerHTML="Please pick a legit move for your circumstances!";
        }
    }
    else if(action >= 5){
        resultText.innerHTML="Please pick a legit move!";
    }
    else{
        resultText.innerHTML="Someone is dead, if you'd like to play again, please press restart!";
    }
}
//AI-class
function AiPlayer()
{
    this.enemyAction = document.getElementById("enemyImg");
    this.enemyBCount = document.getElementById("enemyBullets");
    this.aBullets = 0;
    this.move;
    this.aAlive = true;

    this.gunLoad = function(){
        if(this.aBullets < 3)
        {
            this.aBullets = this.aBullets + 1;
            this.move = "load";
            console.log("load");
            this.enemyBCount.innerHTML = "Enemy bullets: " + this.aBullets;
            this.enemyAction.src = "img/enemyC-idle.png";
        }
        else { this.randomMove(); }
    }
    this.gunShoot = function(){
        if(this.aBullets != 0)
        {
            this.aBullets = this.aBullets - 1;
            this.move = "shot";
            console.log("shot");
            this.enemyBCount.innerHTML = "Enemy bullets: " + this.aBullets;
            this.enemyAction.src = "img/enemyC-shot.png";
        }
        else { this.randomMove();}
    }
    this.blocking = function(){
        this.move = "block";
        console.log("block");
        this.enemyBCount.innerHTML = "Enemy bullets: " + this.aBullets;
        this.enemyAction.src = "img/enemyC-block.png";
    }
    this.ultimateB = function(){
        if(this.aBullets > 3 )
        {
            this.move = "shotgun";
            console.log("shotgun");
            this.enemyBCount.innerHTML = "Enemy bullets: " + this.aBullets;
            this.aBullets = this.aBullets - 3;
            this.enemyAction.src = "img/enemyC-shot.png";
        }
        else { this.randomMove(); }
    }
    this.aDead = function(yesNo){
        if(yesNo == true)
            {this.enemyAction.src = "img/enemyC-dead.png";}
        else if (yesNo == false)
            {this.enemyAction.src = "img/enemyC-idle.png";}
    }

    this.randomMove = function()
    {
        var ranNr = Math.random();
        if (ranNr < 0.20){
            this.gunLoad();
        }
        else if(ranNr > 0.20 && ranNr < 0.40){
            this.gunShoot();
        }
        else if(ranNr > 0.40 && ranNr < 0.60){
            this.blocking();
        }
        else if (ranNr > 0.60){
            this.ultimateB();}
    }

}
//Player class
function Player(){
    this.nBullets = 0;
    this.move;
    this.alive = true;
    this.validMove = true;
    this.playerAction = document.getElementById("playerImg");

    this.loadGun = function(){
        if(this.nBullets < 3){
            console.log(" player load");
            this.validMove = true;
            this.nBullets = this.nBullets + 1;
            this.move = "load";
            bulletCount.innerHTML = "Bullets: " + this.nBullets;
            this.playerAction.src = "img/playerC-idle.png";
        }
        else{
            console.log("player invalid move - load");
            this.validMove = false;
            resultText.innerHTML="You already have three bullets, no need to load.";
            this.playerAction.src = "img/playerC-idle.png";
        }
    }

    this.shootGun = function(){
        if(this.nBullets > 0){
            this.validMove = true;
            console.log(" player shot");
            this.nBullets = this.nBullets - 1;
            this.move = "shot";
            bulletCount.innerHTML = "Bullets: " + this.nBullets;
            this.playerAction.src = "img/playerC-shot.png";
        }
        else{
            console.log("player invalid move - shot");
            resultText.innerHTML="You have no bullets, please load first.";
            this.validMove = false;
            this.playerAction.src = "img/playerC-idle.png";
        }
    }

    this.block = function(){
        this.validMove = true;
        this.move = "block";
        console.log(" player block");
        bulletCount.innerHTML = "Bullets: " + this.nBullets;
        this.playerAction.src = "img/playerC-block.png";
    }

    this.ultimate = function()
    {
        if(this.nBullets < 3){
            this.validMove = false;
            console.log("player invalid move - shotgun");
            resultText.innerHTML="You haven't saved enough bullets!";
            this.playerAction.src = "img/playerC-idle.png";
        }
        else{
            this.validMove = true;
            console.log(" player shotgun");
            this.nBullets = this.nBullets - 3;
            bulletCount.innerHTML = "Bullets: " + this.nBullets;
            this.move = "shotgun";
            this.playerAction.src = "img/playerC-shot.png";
        }
    }

    this.dead = function(yesNo){
        if(yesNo == true)
            this.playerAction.src = "img/playerC-dead.png";
        else if (yesNo == false)
            this.playerAction.src = "img/playerC-idle.png";
    }
}

//Handle the player actions
function userPlay(playerVar, numberChoice){
    if(numberChoice == 1){
        playerVar.shootGun();
    }
    else if(numberChoice == 2){
        playerVar.block();
    }
    else if(numberChoice == 3){
        playerVar.loadGun();
    }
    else if(numberChoice == 4){
        playerVar.ultimate();
    }
}
//compare the moves of ai/player and says result, also handle action img + dead img
//Obviously, this is a if/else of doom.
function compare(playerVar, aiVar){
    var actionPic = document.getElementById("actionImg");

    //BOTH THE SAME
    if(playerVar.move == "shot" && aiVar.move == "shot"){
        resultText.innerHTML="Bham! Both player lose a bullet!";
        actionPic.src = "img/bang.png";
    }
    else if(playerVar.move == "block" && aiVar.move == "block"){
        resultText.innerHTML="Nothing happened! Both blocked!";
        actionPic.src = "img/block.png";
    }
    else if(playerVar.move == "load" && aiVar.move == "load"){
        resultText.innerHTML="Nothing happened! Both loaded their guns!";
        actionPic.src = "img/idle.png";
    }
    else if(playerVar.move == "shotgun" && aiVar.move == "shotgun"){
        resultText.innerHTML="BOOM? Both used shotgun and lost three bullets!";
        actionPic.src = "img/bang.png";
    }

    //SAME RESULT
    else if((playerVar.move == "block" && aiVar.move == "shot") || (playerVar.move == "shot" && aiVar.move == "block")){
        resultText.innerHTML="A bullet was blocked!";
        actionPic.src = "img/blocked.png";
    }
    else if((playerVar.move == "block" && aiVar.move == "load") || (playerVar.move == "load" && aiVar.move == "block")){
        resultText.innerHTML="One blocking and one loading!";
        actionPic.src = "img/idle.png";
    }

    //SOMEONE LOSES
    else if(playerVar.move == "load" && aiVar.move == "shot"){
        resultText.innerHTML="Player was killed! Game over!";
        actionPic.src = "img/bang.png";
        playerVar.dead(true);
        playerVar.alive = false;
    }
    else if(playerVar.move == "shot" && aiVar.move == "load"){
        resultText.innerHTML="The AI was killed! You win!";
        actionPic.src = "img/bang.png";
        aiVar.aDead(true);
        aiVar.aAlive = false;
    }

    else if(playerVar.move != "shotgun" && aiVar.move == "shotgun"){
        resultText.innerHTML="Player was killed by shotgun! Game over!";
        actionPic.src = "img/bang.png";
        playerVar.dead(true);
        playerVar.alive = false;
    }

    else if(playerVar.move == "shotgun" && aiVar.move != "shotgun"){
        resultText.innerHTML="The AI was killed by shotgun! You win!";
        actionPic.src = "img/bang.png";
        aiVar.aDead(true);
        aiVar.aAlive = false;
    }
}

//reset elements.
function resetGame(playerVar, aiVar){
    enemyBCount = document.getElementById("enemyBullets");
    document.getElementById("actionImg").src="img/idle.png";
    console.log("Reset was loaded");
    playerVar.nBullets = 0;
    aiVar.aBullets = 0;
    aiVar.aDead(false);
    playerVar.dead(false);
    playerVar.alive = true;
    aiVar.aAlive = true;
    resultText.innerHTML = "Game has restarted!";
    bulletCount.innerHTML = "Bullets: 0";
    enemyBCount.innerHTML = "Enemy bullets: 0";
}











