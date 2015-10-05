// var player_START_X = 0;
// var player_START_Y = 488;
// // Enemies our player must avoid

var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = this.x + this.speed;
    this.y = 83*this.row;

    if(this.x > 6 * 83){
        this.reset();
    }
 
};
// Enemy.prototype = Object.create(GamePiece.prototype);
// Enemy.prototype.constructor = Enemy;

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function() {
    this.col = -1; 
    this.row = getRandomInt(1,3);
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.speed = getRandomInt(2,6);
};
   // if(Enemy===Player){
   //      player.reset();
   //  }
// Enemy.prototype.handleInput = function() {
//     if(Player.x===this.x && Player.y === this.y){
//         Player.prototype.reset();
//     }
// };

//     for (i = 0; i < allEnemies.length; i += 1) {
//         item = {
//             "left": allEnemies[i].x + 10,
//             "right": allEnemies[i].x + 90,
//             "top": allEnemies[i].y + 110,
//             "bottom": allEnemies[i].y + 130
//         };
//         if (this.itemCollidesWithPlayer(item)) {
//             damage = this.level;
//             player.life -= damage > 99 ? 99 : damage;
//             player.reset();
//         }
//     }
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.reset();
    //this.life = true;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    if(this.life === true){
        if(this.moveable) {
            this.x = 101 * this.col;
            this.y = 83 * this.row;
        }

        if(this.y < 83 && this.moveable) {
            this.moveable = false;
            return true;
        }
    }
    else{
    this.reset();
    }
    return false;
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};


Player.prototype.reset = function() {
    this.col = getRandomInt(0,4); 
    this.row = 5;
    this.x = 101 * this.col;
    this.y = 83 * this.row;
    this.moveable = true;
    this.life = true;
};

// Player.prototype.lost = function() {
//     this.resetPosition();
    
// }


Player.prototype.handleInput = function(key) {
    switch (key){
        case 'left':
            this.col--;
            break;
        case 'up':
            this.row--;
            break;
        case 'right':
            this.col++;
            break;
        case 'down':
            this.row++;
            break;
    }
    if(this.col < 0) this.col = 0;
    if(this.col > 4) this.col = 4;
    if(this.row < 0) this.row = 0;
    if(this.row > 5) this.row = 5;
};

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
for(var i = 0; i < 10; i++){
    allEnemies.push(new Enemy());
}

var player = new Player();



// function createEnemies(number) {
//     for (i = 0; i < number; i++) {
//         var enemy = new enemy();
//         allEnemies.push(enemy);
//     }
// }

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
