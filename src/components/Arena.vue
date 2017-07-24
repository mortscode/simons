<template>
  <div class="arena">
    <div class="player1"></div>
    <div class="player2" :style="{width: width + '%'}"></div>
    <Simon />
  </div>
</template>

<script>
  import Simon from './Simon/Simon';

  // const main = {
  //   tl: {
  //     x: 50,
  //     y: 0,
  //   },
  //   tr: {
  //     x: 100,
  //     y: 0,
  //   },
  //   br: {
  //     x: 100,
  //     y: 100,
  //   },
  //   bl: {
  //     x: 50,
  //     y: 100,
  //   },
  // };

  // const chomp = {
  //   bot: {
  //     x: 50,
  //     y: 100,
  //   },
  //   mid: {
  //     x: 50,
  //     y: 50,
  //   },
  //   top: {
  //     x: 50,
  //     y: 0,
  //   },
  // };

  export default {
    components: {
      Simon,
    },
    data() {
      return {
        width: 75,
      };
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
    background: $blue;
    z-index: 1;
  }

  .player2 {
    position: absolute;
    // width: 100%;
    top: 0;
    right: 0;
    height: 100%;
    background-color: $yellow;
    z-index: 2;
  }
</style>
