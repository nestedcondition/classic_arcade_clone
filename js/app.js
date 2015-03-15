// generic character  superclass
var Character = function (location) {
    this.loc = location;
};
Character.prototype.getLocation = function() {
    return [this.loc.x, this.loc.y];
};
Character.prototype.randN = function(n) {
    // return a random integer between zero and n
    // to be used by enemy to chose random starting point and by player to choose random sprite
    n = parseInt(n);
    var num;
    do {
        num = parseInt(Math.random() * 10 * (n/10));
    } while (num >= n);
    return num;
};
Character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.loc.x, this.loc.y);
};


// Enemies our player must avoid
// inherits from Character
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    var enemyRangeX = [-90, -60, -30, 0];
    var enemyRangeY = [60, 145, 225];
    var x = enemyRangeX[this.randN( enemyRangeX.length )];
    var y = enemyRangeY[this.randN(3)];
    var location = {x: x, y: y};
    Character.call(this, location);
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.constructor = Enemy;

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    var newX = this.loc.x;
    newX += (200 * dt);
    if (newX > 814){ // if enemy has cycled well off the screen on right hand side
        newX =  -98; // move enemy to just off the screen on the left hand side
    }
    this.loc.x = newX;
};

// Draw the enemy on the screen, required method for game
// Enemy.prototype.render = function() {
//     ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
// }
// subsumed by Character.prototype.render above

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.yRange = [ 390, 305, 220, 135, 50]; // defines possible loc.y values for player
    this.xRange = [ -1, 101, 202, 303, 404 ]; // defines possible loc.x values for player
    // allows changing xIndex and yIndex to move player to new location in handleInput below
    this.yIndex = 0; // player starting yIndex
    this.xIndex = 2; // player starting xIndex
    var location = {x : this.xRange[this.xIndex], y : this.yRange[this.yIndex]};
    Character.call(this, location);
    this.sprite = 'images/char-boy.png';

    // figure out why other sprites are not displaying so that random sprite can be chosen from sprites array
    // erro msg: TypeError: Argument 1 of CanvasRenderingContext2D.drawImage could not be converted to any of: HTMLImageElement, HTMLCanvasElement, HTMLVideoElement.
    // var sprites = ['images/char-boy.png', 'images/char-horn-girl.png', 'images/char-princess-girl.png', 'images/char-cat-girl.png', 'images/char-pink-girl.png'];
    // this.sprite = sprites[this.randN(sprites.length)];
};
Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;
Player.prototype.update = function() {
    this.loc = {x : this.xRange[this.xIndex], y : this.yRange[this.yIndex]};
};
Player.prototype.handleInput = function(key) {
    if (key) {
        console.log ( this.yIndex );
        switch (key) {
            case 'left':
                if (this.xIndex > 0) {
                    this.xIndex -= 1;
                }
                break;
            case 'right':
                if (this.xIndex < 4) {
                    this.xIndex += 1;
                }
                break;
            case 'up':
                if (this.yIndex < 5) {
                    this.yIndex += 1;
                }
                break;
            case 'down':
                if (this.yIndex > 0) {
                    this.yIndex -= 1;
                }
                break;
            default:
        }
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies =[];
for (var i = 0; i < 3; i++){
    allEnemies.push( new Enemy() );
}

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    console.log(allowedKeys[e.keyCode]);
    player.handleInput(allowedKeys[e.keyCode]);
});

var engine = Engine;
