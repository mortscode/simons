<template>
  <ul class="list">
    <li v-for="burger in this.$root.burgers" class="list__item" :key="burger['.key']">
      <h2 class="list__burger">{{burger.name}}</h2>
      <span class="list__key">// key:{{burger['.key']}}</span>
    </li>
  </ul>
</template>
<style scoped lang="scss">
  .list {
    width: 100%;
    padding: 0;

    &__item {
      padding: 6px 0;
    }

    &__burger {
      color: #333;
      font-weight: 800;
      margin: 0;
    }

    &__key {
      color: #bbb;
    }
  }
</style>
