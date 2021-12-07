<template>
  <div>
      <div>
          <label for="email"></label>
          <input id="email" type="text" v-model="email">
          <label for="senha"></label>
          <input id="senha" type="password" v-model="senha">
          <div>
              <button @click="login">
                  Entrar
              </button>
              <button @click="register">
                  Registrar
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
import { config } from 'dotenv'
import { mapMutations } from 'vuex'
config()
export default {
  data: () => {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    register () {
      this.$router.push({ name: 'Register' })
    },
    async login () {
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/usuario/login`, {
        email: this.email,
        senha: this.senha
      }).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Email ou senha incorretos, tente novamente!'
        })
        throw error
      })
      this.setToken({ isLogged: true, token: response.data.token })
      this.setPermissao(response.data.permissao)
      this.$router.push({ name: 'Home' })
    },
    ...mapMutations([
      'setToken', 'setPermissao'
    ])
  }
}
</script>

<style>

</style>
