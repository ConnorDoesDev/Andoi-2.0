const Discord = require("discord.js");
const WIDTH = 15;
const HEIGHT = 10;
const gameBoard = [];
const apple = { x: 1, y: 1 };
const AndoiEmbed = require("../AndoiEmbed");
const { MessageButton } = require("discord.js");
function getRandomString(length) {
  var randomChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  var result = "";
  for (var i = 0; i < length; i++) {
    result += randomChars.charAt(
      Math.floor(Math.random() * randomChars.length)
    );
  }
  return result;
}
let w1 =
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4);
let a1 =
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4);
let s1 =
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4);
let d1 =
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4);
let stop1 =
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4) +
  "-" +
  getRandomString(4);

class Snake {
  constructor(options = {}) {
    this.snake = [{ x: 5, y: 5 }];
    this.snakeLength = 1;
    this.score = 0;
    this.gameEmbed = null;
    this.inGame = false;
    this.emojis = options.emojis;
    this.options = options;
    this.message = options.message;
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        gameBoard[y * WIDTH + x] = this.emojis.empty;
      }
    }
  }
  gameBoardToString() {
    let str = "";
    for (let y = 0; y < HEIGHT; y++) {
      for (let x = 0; x < WIDTH; x++) {
        if (x == apple.x && y == apple.y) {
          str += this.emojis.food;
          continue;
        }

        let flag = true;
        for (let s = 0; s < this.snake.length; s++) {
          if (x == this.snake[s].x && y == this.snake[s].y) {
            str += this.emojis.snakeBody;

            flag = false;
          }
        }
        if (flag) {
          str += gameBoard[y * WIDTH + x];
        }
      }
      str += "\n";
    }
    return str;
  }

  isLocInSnake(pos) {
    return this.snake.find((sPos) => sPos.x == pos.x && sPos.y == pos.y);
  }

  newAppleLoc() {
    let newApplePos = { x: 0, y: 0 };
    do {
      newApplePos = {
        x: parseInt(Math.random() * WIDTH),
        y: parseInt(Math.random() * HEIGHT),
      };
    } while (this.isLocInSnake(newApplePos));

    apple.x = newApplePos.x;
    apple.y = newApplePos.y;
  }

  start() {
    if (this.inGame) return;

    this.inGame = true;
    this.score = 0;
    this.snakeLength = 1;
    this.snake = [{ x: 5, y: 5 }];
    this.newAppleLoc();
    const embed = new AndoiEmbed()
      .setColor(this.options.embed.color || "RANDOM")
      .setTitle(this.options.embed.title || "Snake Game")
      .setDescription(this.gameBoardToString());

    if (this.options.timestamp) embed.setTimestamp();
    let lock1 = new MessageButton()
      .setLabel("\u200b")
      .setStyle("SECONDARY")
      .setCustomID("saybye")
      .setDisabled(true);

    let w = new MessageButton()
      .setEmoji(this.options.emojis.up)
      .setStyle("PRIMARY")
      .setCustomID(w1);

    let lock2 = new MessageButton()
      .setLabel("\u200b")
      .setStyle("SECONDARY")
      .setCustomID("h")
      .setDisabled(true);

    let a = new MessageButton()
      .setEmoji(this.options.emojis.right)
      .setStyle("PRIMARY")
      .setCustomID(a1);

    let s = new MessageButton()
      .setEmoji(this.options.emojis.down)
      .setStyle("PRIMARY")
      .setCustomID(s1);

    let d = new MessageButton()
      .setEmoji(this.options.emojis.left)
      .setStyle("PRIMARY")
      .setCustomID(d1);
    let stopy = new MessageButton()
      .setLabel("Stop")
      .setStyle("DANGER")
      .setCustomID(stop1);
    this.message.channel
      .send({
        embeds: [embed],
        components: [
          {
            type: 1,
            components: [lock1, w, lock2, stopy],
          },
          {
            type: 1,
            components: [a, s, d],
          },
        ],
      })
      .then(async (m) => {
        const filter = (m) => m.user.id == this.options.message.author.id;
        const collector = m.createMessageComponentCollector({ filter });
        collector.on("collect", async (btn) => {
          const snakeHead = this.snake[0];
          const nextPos = { x: snakeHead.x, y: snakeHead.y };
          if (btn.customID === a1) {
            let nextX = snakeHead.x - 1;
            if (nextX < 0) {
              nextX = WIDTH - 1;
            }
            nextPos.x = nextX;
          } else if (btn.customID === w1) {
            let nextY = snakeHead.y - 1;
            if (nextY < 0) {
              nextY = HEIGHT - 1;
            }
            nextPos.y = nextY;
          } else if (btn.customID === s1) {
            let nextY = snakeHead.y + 1;
            if (nextY >= HEIGHT) {
              nextY = 0;
            }
            nextPos.y = nextY;
          } else if (btn.customID === d1) {
            let nextX = snakeHead.x + 1;
            if (nextX >= WIDTH) {
              nextX = 0;
            }
            nextPos.x = nextX;
          } else if (btn.customID === stop1) {
            this.gameOver(m, btn);
            collector.stop();
          }

          if (this.isLocInSnake(nextPos)) {
            this.gameOver(m, btn);
          } else {
            this.snake.unshift(nextPos);
            if (this.snake.length > this.snakeLength) {
              this.snake.pop();
            }
            this.step(m, btn);
          }
        });
      });
  }

  step(msg, btn) {
    if (apple.x == this.snake[0].x && apple.y == this.snake[0].y) {
      this.score += 1;
      this.snakeLength++;
      this.newAppleLoc();
    }

    const editEmbed = new AndoiEmbed()
      .setColor(this.options.embed.color || "RANDOM")
      .setTitle(this.options.embed.title || "Snake Game")
      .setDescription(this.gameBoardToString())
      .setTimestamp();
    let lock1 = new MessageButton()
      .setLabel("\u200b")
      .setStyle("SECONDARY")
      .setCustomID("saybye")
      .setDisabled(true);

    let w = new MessageButton()
      .setEmoji(this.options.emojis.up)
      .setStyle("PRIMARY")
      .setCustomID(w1);

    let lock2 = new MessageButton()
      .setLabel("\u200b")
      .setStyle("SECONDARY")
      .setCustomID("h")
      .setDisabled(true);

    let a = new MessageButton()
      .setEmoji(this.options.emojis.right)
      .setStyle("PRIMARY")
      .setCustomID(a1);

    let s = new MessageButton()
      .setEmoji(this.options.emojis.down)
      .setStyle("PRIMARY")
      .setCustomID(s1);

    let d = new MessageButton()
      .setEmoji(this.options.emojis.left)
      .setStyle("PRIMARY")
      .setCustomID(d1);
    let stopy = new MessageButton()
      .setLabel("Stop")
      .setStyle("DANGER")
      .setCustomID(stop1);
    btn.update({
      embeds: [editEmbed],
      components: [
        {
          type: 1,
          components: [lock1, w, lock2, stopy],
        },
        {
          type: 1,
          components: [a, s, d],
        },
      ],
    });
  }

  gameOver(m, btn) {
    let lock1 = new MessageButton()
      .setLabel("\u200b")
      .setStyle("SECONDARY")
      .setCustomID("saybye")
      .setDisabled(true);

    let lock2 = new MessageButton()
      .setLabel("\u200b")
      .setStyle("SECONDARY")
      .setCustomID("h")
      .setDisabled(true);
    let w = new MessageButton()
      .setEmoji(this.options.emojis.up)
      .setStyle("PRIMARY")
      .setCustomID(w1)
      .setDisabled(true);

    let a = new MessageButton()
      .setEmoji(this.options.emojis.right)
      .setStyle("PRIMARY")
      .setCustomID(a1)
      .setDisabled(true);

    let s = new MessageButton()
      .setEmoji(this.options.emojis.down)
      .setStyle("PRIMARY")
      .setCustomID(s1)
      .setDisabled(true);

    let d = new MessageButton()
      .setEmoji(this.options.emojis.left)
      .setStyle("PRIMARY")
      .setCustomID(d1)
      .setDisabled(true);

    let stopy = new MessageButton()
      .setLabel("Stop")
      .setStyle("DANGER")
      .setCustomID(stop1)
      .setDisabled(true);

    this.inGame = false;
    const editEmbed = new AndoiEmbed()
      .setColor(this.options.embed.gameOverTitle || "RANDOM")
      .setTitle(this.options.embed.gameOverTitle || "Game Over")
      .setDescription(this.options.embed.score + this.score)
      .setTimestamp();

    btn.update({
      embeds: [editEmbed],
      components: [
        {
          type: 1,
          components: [lock1, w, lock2, stopy],
        },
        {
          type: 1,
          components: [a, s, d],
        },
      ],
    });
  }
}

module.exports = Snake;
