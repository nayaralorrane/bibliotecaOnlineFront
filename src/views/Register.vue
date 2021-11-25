<template>
  <div>
      <label for="nome">Nome</label>
      <input id="nome" v-model="nome" type="text">
      <label for="email">E-mail</label>
      <input id="email" v-model="email" type="text">
      <label for="senha">Senha</label>
      <input id="senha" v-model="senha" type="password">
      <label for="documento">Documento</label>
      <input id="documento" v-model="documento" type="text">
      <button @click="register">Enviar</button>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data: () => {
    return {
      nome: '',
      email: '',
      senha: '',
      documento: ''
    }
  },
  methods: {
    async register () {
      const data = {
        nome: this.nome,
        email: this.email,
        senha: this.senha,
        documento: this.documento,
        permissao: 'ROLE_CLIENTE'
      }
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/usuario/register`, data)
      if (response.status !== 200) {
        alert('Ocorreu um problema ao registrar. Tente novamente.')
        return null
      }
      this.$router.push({ name: 'Login' })
    }
  }
}
</script>

<style>

</style>
