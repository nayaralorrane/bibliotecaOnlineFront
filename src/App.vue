<template>
  <div id="app">
    <nav class="nav-bar" v-if="this.$store.state.isLogged">
      <button class="buttons" @click="logout">Logout</button>
      <button class="buttons" @click="home">Home</button>
    </nav>
    <router-view style="margin: 5px"></router-view>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  methods: {
    logout () {
      this.setToken({ isLogged: false, token: null })
      this.$router.push({ name: 'Login' })
    },
    home () {
      this.$router.push({ name: 'Home' })
    },
    ...mapMutations([
      'setToken'
    ])
  }
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.nav-bar {
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  border-bottom: solid black 1px;
}

.buttons {
  margin: 10px;
}

</style>
