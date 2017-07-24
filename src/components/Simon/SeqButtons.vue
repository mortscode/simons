<template>
  <div class="button__wrapper">
    <div v-for="btn in this.seqButtons" class="button" v-bind:key="btn.id">
      <div class="button__inner" :data-color="btn.color"></div>
    </div>
  </div>
</template>

<script>
  import data from '../../data';

  export default {
    methods: {
      displayDetails(id) {
        this.$router.push({ name: 'detail', params: { id } });
      },
    },
    data() {
      return {
        seqButtons: data.seqButtons,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 50%;
    padding: 5%;

    &__wrapper {
      display: flex;
      flex-wrap: wrap;
      position: absolute;
      height: 95%;
      width: 95%;
    }

    &__inner {
      border-radius: 50%;
      flex: 0 0 90%;
      height: 90%;
    }

    [data-color=blue] {
      background-color: $blue;
    }

    [data-color=green] {
      background-color: $green;
    }

    [data-color=red] {
      background-color: $red;
    }

    [data-color=yellow] {
      background-color: $yellow;
    }
  }
</style>
