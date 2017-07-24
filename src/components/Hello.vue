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

    // Before round starts, players select color for themself
    this.createNewRound();
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
      const compareSequence = [];
      for (let i = 0; i < this.sequenceCount; i += 1) {
        for (let j = 0; j < 4; j += 1) {
          if (playerSequence[i][j] === 1) {
            compareSequence.push(this.colors[j]);
          }
        }
      }

      let points = 0;

      for (let i = 0; i < this.sequenceCount; i += 1) {
        if (compareSequence[i] === this.masterSequence[i]) {
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
      this.createNewRound();
      if (this.player1PointsRunning >= this.pointsToWin) {
        window.console.log('PLAYER 1 HAS WON THE GAME!');
      } else if (this.player2PointsRunning >= this.pointsToWin) {
        window.console.log('PLAYER 2 HAS WON THE GAME!');
      }
      // TODO: Reset the game
    },
    pushButtons(player, buttons) {
      if (buttons[0] === 0 && buttons[1] === 0 && buttons[2] === 0 && buttons[3] === 0) {
        return;
      }
      if (player === 'one') {
        if (this.sequenceP1.length < this.sequenceCount) {
          this.sequenceP1.push(buttons);
          // TODO: This needs to stop the player if they hit the wrong button
          if (this.sequenceCount === this.sequenceP1.length) {
            this.player1Points = this.compareSequence(this.sequenceP1);
            if (this.sequenceCount === this.sequenceP2.length) {
              this.roundFinished();
            }
          }
        }
      } else if (player === 'two') {
        if (this.sequenceP2.length < this.sequenceCount) {
          this.sequenceP2.push(buttons);
          // TODO: This needs to stop the player if they hit the wrong button
          if (this.sequenceCount === this.sequenceP2.length) {
            this.player2Points = this.compareSequence(this.sequenceP2);
            if (this.sequenceCount === this.sequenceP1.length) {
              this.roundFinished();
            }
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
