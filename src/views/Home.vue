<template>
    <div class="d-flex flex-column align-items-center">
        <b-button-group class="w-75 d-flex flex-row justify-content-center text-center" v-if="this.$store.state.permissao === 'ROLE_FUNCIONARIO'">
            <b-button class="m-3 rounded-3" @click="() => this.$router.push({ name: 'CadastroLivro'})">Cadastrar Novo Livro</b-button>
        </b-button-group>
        <b-button-group class="w-75 d-flex flex-row justify-content-center text-center m-1 border-1">
            <b-button class="m-3 rounded-3" @click="() => this.$router.push({ name: 'ConsultarLivro'})">Consultar Livro</b-button>
            <b-button class="m-3 rounded-3" @click="() => this.$router.push({ name: 'ConsultarLivroAutor'})">Consultar Livros por autor</b-button>
            <b-button class="m-3 rounded-3" @click="() => this.$router.push({ name: 'ConsultarLivroCategoria'})">Consultar Livros por categoria</b-button>
        </b-button-group>
        <div class="w-75 tabela-pai">
            <b-table class="tabela" striped hover :items="items"></b-table>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
  mounted () {
    this.fillTable()
  },
  data: () => {
    return {
      items: []
    }
  },
  methods: {
    async fillTable () {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/livro/`).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Não foi possível encontrar livros, tente novamente mais tarde!'
        })
        throw error
      })
      this.items = response.data.map(item => {
        return {
          Título: item.nomeTitulo,
          Preço: item.preco,
          Editora: item.editora
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>

.tabela-pai {
    height: 75vh;
    overflow: auto;
}

</style>
