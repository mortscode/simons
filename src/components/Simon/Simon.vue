<template>
  <div class="simon">
    <SeqButtons />
  </div>
</template>

<script>
  import SeqButtons from './SeqButtons';

  export default {
    components: {
      SeqButtons,
    },
  };
</script>

<style lang="scss" scoped>
  .simon {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: $white;
    border: 2px solid $white;
    border-radius: 25%;
    width: 33vh;
    height: 33vh;
    position: relative;
    padding: 10px;
    z-index: 10;
  }
</style>
