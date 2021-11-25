<template>
    <div>
        <button @click="logout">
            Logout
        </button>
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
    ...mapMutations([
      'setToken'
    ])
  }
}
</script>

<style lang="css" scoped>

</style>
