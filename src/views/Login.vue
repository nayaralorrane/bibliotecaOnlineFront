<template>
  <div>
      <div>
          <label for="email"></label>
          <input id="email" type="text" v-model="email">
          <label for="senha"></label>
          <input id="senha" type="text" v-model="senha">
          <div>
              <button @click="login">
                  Entrar
              </button>
              <button>
                  Registrar
              </button>
          </div>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => {
    return {
      email: '',
      senha: ''
    }
  },
  methods: {
    login () {
      const response = axios.post(`${process.env.BASE_URL}/usuario/login`, {
        email: this.email,
        senha: this.senha
      })
      console.log(response)
    }
  }
}
</script>

<style>

</style>
