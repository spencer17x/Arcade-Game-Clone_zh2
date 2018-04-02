
const width = 100;
const height = 100;
//通用的父类
class Actor {
    constructor(x,y) {
        this.x = x;
        this.y = y;
        this.speed = 200;

    }

    update(dt) {
        this.x = this.x + this.speed*dt;
    }


}

// 这是我们的玩家要躲避的敌人 
class Enemy extends Actor {
    constructor(x,y) {
        super(x,y);
        this.sprite = 'images/enemy-bug.png';
    }

    // 此为游戏必须的函数，用来更新敌人的位置
    update(dt) {
        super.update(dt);
        if (this.x > 5*width) {
            this.x = 0;
        }
    }

    // 此为游戏必须的函数，用来在屏幕上画出敌人
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// 现在实现你自己的玩家类
// 这个类需要一个 update() 函数， render() 函数和一个 handleInput()函数
class Player extends Actor {
    constructor(x,y) {
        super(x,y);
        this.sprite = 'images/char-boy.png';
    }

    update() {
        if (this.x > 4*width) {
            this.x = 4*width;
        }
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.y < 0) {
            this.y = 0;
        }
        if (this.y > 4*height) {
            this.y = 4*height;
        }
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(d) {
        switch(d) {
            case 'up':
                this.y = this.y - height;
                break;
            case 'down':
                this.y = this.y + height;
                break;
            case 'left':
                this.x = this.x - width;
                break;
            case 'right':
                this.x = this.x + width;
                break;
        }
    }

    //碰撞检测
    reset() {
        this.x = 200;
        this.y = 300;
    }
}


// 现在实例化你的所有对象
// 把所有敌人的对象都放进一个叫 allEnemies 的数组里面
// 把玩家对象放进一个叫 player 的变量里面
const allEnemies = [new Enemy(0,100),new Enemy(100,200),new Enemy(200,100)];
const player = new Player(200,300);
// 这段代码监听游戏玩家的键盘点击事件并且代表将按键的关键数字送到 Player.handleInput()
// 方法里面。你不需要再更改这段代码了。
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
