<template>
  <div>
    <h1 class="title">Burger List</h1>
    <List />
    <div class="link">
      <router-link to="/">Back</router-link>
    </div>
  </div>
</template>

<script>
import List from './BurgerList/List';

export default {
  components: {
    List,
  },
};
</script>

<style scoped lang="scss">

  .title {
    @include bp($md) {
      color: tomato;
    }
  }

  .link {
    margin-top: 60px;
  }
</style>
