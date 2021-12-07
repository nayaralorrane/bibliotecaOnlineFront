<template>
  <b-card class="text-center">
    <div class="d-flex w-100 flex-row justify-content-center">
      <div class="w-75 d-flex flex-column justify-items-center">
        <b-input-group class="text-center d-flex col-12 flex-row p-3">
          <b-form-input v-model="nome" class="col-6 rounded-3 m-2"></b-form-input>
          <b-button class="rounded-3 m-2" @click="search">Pesquisar</b-button>
        </b-input-group>
        <div class="m-4 tabela-pai">
              <b-table class="tabela" striped hover :items="items"></b-table>
          </div>
      </div>
    </div>
  </b-card>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    this.search()
  },
  data: () => {
    return {
      nome: '',
      items: []
    }
  },
  methods: {
    async search () {
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/livro/search`, {
        search: this.nome
      }).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro ao tentar pesquisar livros, tente novamente!'
        })
        throw error
      })
      if (response.data.length > 0) {
        this.items = response.data.map(item => {
          return {
            Título: item.nomeTitulo,
            Editora: item.editora,
            Preço: item.preco,
            Estante: item.sessao.estante,
            Sessão: item.sessao.nomeSessao,
            Biblioteca: item.sessao.biblioteca.nomeBiblioteca
          }
        })
      } else {
        this.$swal.fire({
          icon: 'info',
          title: 'Nenhum livro encontrado'
        })
      }
    }
  }
}
</script>

<style>
.tabela-pai {
    height: 75vh;
    overflow: auto;
}
</style>
