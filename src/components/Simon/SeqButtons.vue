<template>
  <div class="button__wrapper">
    <div v-for="btn in this.seqButtons" class="button" v-bind:key="btn.id">
      <button class="button__inner"
        :class="[{active: isActive === btn.color}, btn.color]"
        :data-clicked="btn.clicked"
        :data-color="btn.color"
        @click="activate(btn.color)">
      </button>
    </div>
  </div>
</template>

<script>
  import data from '../../data';

  export default {
    methods: {
      activate(btn) {
        this.isActive = btn;

        setTimeout(() => {
          this.isActive = '';
        }, 300);
      },
    },
    data() {
      return {
        isActive: '',
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
      position: relative;
      outline: 0;
      border: 0;
      border-radius: 50%;
      flex: 0 0 90%;
      height: 90%;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        transform: scale(0.5) translate(-50%, -50%);
        transform-origin: 0 0;
        transition: transform 150ms ease-out, border 150ms ease-out;
      }

      &.blue {
        background-color: $blue;

        &::before {
          border: 0px solid $blue;
        }
      }

      &.green {
        background-color: $green;

        &::before {
          border: 0px solid $green;
        }
      }

      &.red {
        background-color: $red;

        &::before {
          border: 0px solid $red;
        }
      }

      &.yellow {
        background-color: $yellow;

        &::before {
          border: 0px solid $yellow;
        }
      }

      &.active::before {
        animation: activeButton 300ms;
      }
    }
  }
</style>
