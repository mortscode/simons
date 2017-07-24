<template>
  <div class="arena">
    <div id="Player1" class="player1"></div>
    <div id="Player2" class="player2"></div>
    <Simon />
  </div>
</template>

<script>
import SocketIO from 'socket.io-client';
import { TimelineLite } from 'gsap';
import Simon from './Simon/Simon';

export default {
  name: 'hello',
  components: {
    Simon,
  },
  data() {
    return ({
      pointsToWin: 3,
      buttonTimeout: 3000,
      //
      colors: ['b', 'y', 'r', 'g'],
      masterSequence: [],
      sequenceCount: 2,
      sequenceP1: [],
      sequenceP2: [],
      player1Points: 0,
      player2Points: 0,
      player1PointsRunning: 0,
      player2PointsRunning: 0,
      player1Color: null,
      player2Color: null,
      gameStarted: false,
      player1Done: false,
      player2Done: false,
      player1Timeout: null,
      player2Timeout: null,
    });
  },
  mounted() {
    const socket = SocketIO('10.0.0.145:3000');
    socket.on('buttonUpdate', (data) => {
      if (data.id === 7 || data.id === 8) {
        const buttons = [data.b0, data.b1, data.b2, data.b3];
        const player = data.id === 7 ? 'one' : 'two';
        this.pushButtons(player, buttons);
      }
    });
  },
  methods: {
    playSequene() {
      const blueButton = document.getElementById('blueButton');
      const yellowButton = document.getElementById('yellowButton');
      const redButton = document.getElementById('redButton');
      const greenButton = document.getElementById('greenButton');

      const tl = new TimelineLite();

      for (let i = 0; i < this.masterSequence.length; i += 1) {
        const color = this.masterSequence[i];
        window.console.log('color', color);
        let buttonTarget;
        if (color === 'b') {
          buttonTarget = blueButton;
        } else if (color === 'y') {
          buttonTarget = yellowButton;
        } else if (color === 'r') {
          buttonTarget = redButton;
        } else if (color === 'g') {
          buttonTarget = greenButton;
        }
        tl.from(buttonTarget, 0.8, {
          delay: 0.1,
          onStart: () => {
            buttonTarget.classList.add('active');
          },
          onComplete: () => {
            buttonTarget.classList.remove('active');
          },
        });
      }
    },
    createNewRound() {
      this.masterSequence = this.generateSequence();
      setTimeout(this.playSequene, 1000);
    },
    generateSequence() {
      const sequence = [];
      for (let i = 0; i < this.sequenceCount; i += 1) {
        sequence.push(this.getRandomColor());
      }
      this.sequenceP1 = [];
      this.sequenceP2 = [];
      return sequence;
    },
    getRandomColor() {
      return this.colors[Math.round(Math.random() * (this.colors.length - 1))];
    },
    compareSequence(playerSequence) {
      let points = 0;

      for (let i = 0; i < playerSequence.length; i += 1) {
        if (this.masterSequence[i] === playerSequence[i]) {
          points += 1;
        }
      }

      return points;
    },
    roundFinished() {
      window.console.log('roundFinished!!');
      if (this.player1Points > this.player2Points) {
        window.console.log('player 1 wins');
        this.player1PointsRunning += this.player1Points - this.player2Points;
      } else if (this.player2Points > this.player1Points) {
        window.console.log('player 2 wins');
        this.player2PointsRunning += this.player2Points - this.player1Points;
      } else {
        window.console.log('tie');
      }

      this.sequenceCount += 1;
      this.sequenceP1 = [];
      this.sequenceP2 = [];
      this.player1Points = 0;
      this.player2Points = 0;
      this.player1Done = false;
      this.player2Done = false;
      clearTimeout(this.player1Timeout);
      clearTimeout(this.player2Timeout);

      if (this.player1PointsRunning >= this.pointsToWin) {
        window.console.log('PLAYER 1 HAS WON THE GAME!');
      } else if (this.player2PointsRunning >= this.pointsToWin) {
        window.console.log('PLAYER 2 HAS WON THE GAME!');
      } else {
        this.createNewRound();
      }
    },
    pushButtons(player, buttons) {
      if (!this.gameStarted) {
        if (player === 'one') {
          for (let j = 0; j < 4; j += 1) {
            if (buttons[j] === 1) {
              if (this.player2Color !== this.colors[j]) {
                this.player1Color = this.colors[j];
                window.console.log('player 1 color', this.player1Color);
                document.getElementById('Player1').classList.add(this.player1Color);
              } else {
                window.console.log('player 1 select different color');
              }
            }
          }
        } else {
          for (let j = 0; j < 4; j += 1) {
            if (buttons[j] === 1) {
              if (this.player1Color !== this.colors[j]) {
                this.player2Color = this.colors[j];
                window.console.log('player 2 color', this.player2Color);
                document.getElementById('Player2').classList.add(this.player2Color);
              } else {
                window.console.log('player 2 select different color');
              }
            }
          }
        }

        if (this.player1Color && this.player2Color) {
          this.gameStarted = true;
          this.createNewRound();
        }

        return;
      }

      const playerNum = player === 'one' ? 1 : 2;
      const otherPlayerNum = player === 'one' ? 2 : 1;

      if (buttons[0] === 0 && buttons[1] === 0 && buttons[2] === 0 && buttons[3] === 0) {
        return;
      } else if (this[`player${playerNum}Done`]) {
        return;
      }

      clearTimeout(this[`player${playerNum}Timeout`]);
      if (!this[`player${playerNum}Done`]) {
        this[`player${playerNum}Timeout`] = setTimeout(() => {
          if (!this[`player${playerNum}Done`]) {
            window.console.log(`Player ${playerNum} wasn't fast enough...`);
            this[`player${playerNum}Done`] = true;
            this[`player${playerNum}Points`] = this.compareSequence(this[`sequenceP${playerNum}`]);
            if (this[`player${otherPlayerNum}Done`]) {
              this.roundFinished();
            }
          }
        }, this.buttonTimeout);
      }

      if (this[`sequenceP${playerNum}`].length < this.sequenceCount) {
        let buttonPushed;
        for (let j = 0; j < 4; j += 1) {
          if (buttons[j] === 1) {
            buttonPushed = this.colors[j];
            this[`sequenceP${playerNum}`].push(buttonPushed);
          }
        }

        if (this.masterSequence[this[`sequenceP${playerNum}`].length - 1] !== buttonPushed) {
          this[`player${playerNum}Done`] = true;
          window.console.log(`player ${playerNum} fucked up...`);
          this[`player${playerNum}Points`] = this.compareSequence(this[`sequenceP${playerNum}`]);
          if (this[`player${otherPlayerNum}Done`]) {
            this.roundFinished();
          }
        }

        if (this.sequenceCount === this[`sequenceP${playerNum}`].length) {
          this[`player${playerNum}Done`] = true;
          window.console.log(`player ${playerNum} finished round`);
          this[`player${playerNum}Points`] = this.compareSequence(this[`sequenceP${playerNum}`]);
          if (this[`player${otherPlayerNum}Done`]) {
            this.roundFinished();
          }
        }
      }
    },
  },
};
</script>

<style scoped lang="scss">
  .arena {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100vw;
    height: 100vh;
    position: relative;
  }

  .player1 {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 1;
    background-color: white;
  }

  .player2 {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: polygon(70% 0%, 100% 0%, 100% 100%, 70% 100%, 50% 50%);
    z-index: 2;
    background-color: white;
  }

  .b {
    background-color: $blue;
  }

  .y {
    background-color: $yellow;
  }

  .r {
    background-color: $red;
  }

  .g {
    background-color: $green;
  }
</style>
