<template>
  <div class="arena">
    <div class="player1"></div>
    <div class="player2"></div>
    <Simon />
  </div>
</template>

<script>
  import Simon from './Simon/Simon';

  export default {
    components: {
      Simon,
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
    background-color: $blue;
    z-index: 1;
  }

  .player2 {
    position: absolute;
    width: 100%;
    height: 100%;
    clip-path: polygon(70% 0%, 100% 0%, 100% 100%, 70% 100%, 50% 50%);
    background-color: $yellow;
    z-index: 2;
  }
</style>
