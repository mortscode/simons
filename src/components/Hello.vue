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
    pushButtons(player, buttons) {
      window.console.log(`player ${player}`);
      window.console.log(buttons);
    },
    postBurger() {
      this.$root.$firebaseRefs.burgers.push(
        {
          name: this.burgerName,
          info: 'Posted by Mort',
          created_at: -1 * new Date().getTime(),
        })
        .then(this.$router.push('/'))
        .then(() => {
          // eslint-disable-next-line no-console
          console.table(this.$root.burgers);
        });
    },
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
