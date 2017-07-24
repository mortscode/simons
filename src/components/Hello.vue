<template>
  <div class="hello">
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <div class="link">
      <router-link to="/burgers">Checkout the burger list.</router-link>
    </div>
    <form>
      <br>
      <br>
      <div class="mdl-textfield mdl-js-textfield mdl-textfield--floating-label is-upgraded is-dirty">
        <input id="burgerName" v-model="burgerName" type="text" />
        <label for="burgerName">Burger Name</label>
      </div>
      <div class="actions">
        <button @click.prevent="postBurger">Post that burger</button>
      </div>
      <br>
      <br>
    </form>
  </div>
</template>

<script>
import SocketIO from 'socket.io-client';

export default {
  name: 'hello',
  data() {
    return ({
      burgerName: '',
      colors: ['b', 'y', 'r', 'g'],
      masterSequence: [],
      sequenceCount: 2,
      sequenceP1: [],
      sequenceP2: [],
      player1Points: 0,
      player2Points: 0,
      player1PointsRunning: 0,
      player2PointsRunning: 0,
      pointsToWin: 3,
      player1Color: null,
      player2Color: null,
      gameStarted: false,
      player1Done: false,
      player2Done: false,
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
    createNewRound() {
      // TODO: Timer
      // TODO: Display Sequence
      this.masterSequence = this.generateSequence();
      window.console.log(this.masterSequence);
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

      if (buttons[0] === 0 && buttons[1] === 0 && buttons[2] === 0 && buttons[3] === 0) {
        return;
      }

      const playerNum = player === 'one' ? 1 : 2;
      const otherPlayerNum = player === 'one' ? 2 : 1;

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
    postBurger() { },
  },
};
</script>

<style scoped>
  .hello {
    padding: 0 24px;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }

  li {
    display: inline-block;
    margin-right: 10px;
  }

  a {
    color: tomato;
  }
  .link {
    margin-top: 60px;
  }
</style>
