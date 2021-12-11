<template>
<div class="d-flex justify-content-center">
  <b-card class="text-center w-75 ">
    <div class="d-flex w-100 flex-row justify-content-center">
      <div class="d-flex flex-column justify-content-center w-100">
        <b-input-group class="text-center d-flex flex-row justify-content-center w-100 col-10 p-3">
          <b-form-group label="Título" class="text-start m-2 col-3">
            <b-form-input v-model="nomeTitulo" class="rounded-3"></b-form-input>
          </b-form-group>
          <b-form-group label="Editora" class="text-start m-2 col-3">
            <b-form-input v-model="editora" class="rounded-3"></b-form-input>
          </b-form-group>
          <b-form-group label="Preço" class="text-start m-2 col-3">
            <b-form-input v-model="preco" type="number" class="rounded-3"></b-form-input>
          </b-form-group>
        </b-input-group>
        <b-input-group class="d-flex flex-row w-100 justify-content-center align-items-center col-10">
          <b-form-group label="Autor" class="text-start m-2 col-3">
            <b-form-input v-model="autor" class="rounded-3"></b-form-input>
          </b-form-group>
          <b-form-group  label="Biblioteca" class="text-start m-2 col-3">
            <v-select
              @input="changeSessao"
              :options="bibliotecaList"
              label="title"
              v-model="biblioteca"
            ></v-select>
          </b-form-group>
          <b-form-group  label="Sessão" class="text-start m-2 col-3">
            <v-select
              :options="sessaoList"
              label="title"
              v-model="sessao"
            ></v-select>
          </b-form-group>
        </b-input-group>
        <b-input-group class="d-flex flex-row w-100 justify-content-center align-items-center col-10">
          <b-form-group label="Categorias" class="text-start m-2 col-3">
            <b-form-input v-model="categoria" class="rounded-3"></b-form-input>
          </b-form-group>
          <b-button class="rounded-3 m-3 mt-5 bg-primary" @click="addCategory">+</b-button>
        </b-input-group>
        <h5 v-if="categories.length > 0">Categorias</h5>
        <div class="d-flex flex-row w-100 justify-content-center align-items-center col-10">
          <ul v-for="category, i in categories" :key="i" class="d-flex flex-row col-6 justify-content-center align-items-center">
            <li class="col-6">
              {{category}}
            </li>
            <b-button class="rounded-3 bg-danger" @click="removeCategory(category)">-</b-button>
          </ul>
        </div>
        <div class="d-flex flex-row justify-content-center">
          <b-button class="rounded-3 m-2 mt-4 w-25" @click="register">Cadastrar</b-button>
        </div>
        <div class="m-4 tabela-pai">
              <b-table class="tabela" striped hover :items="items"></b-table>
          </div>
      </div>
    </div>
  </b-card>
</div>
</template>

<script>
import axios from 'axios'
import { mapGetters } from 'vuex'
export default {
  beforeMount () {
    if (this.getPermissao === 'ROLE_CLIENTE') {
      this.$router.push({ name: 'Home' })
    }
  },
  mounted () {
    this.fillBiblioteca()
    this.fillTable()
  },
  data: () => {
    return {
      nomeTitulo: '',
      editora: '',
      preco: 0,
      autor: '',
      biblioteca: '',
      items: [],
      bibliotecaList: [],
      sessaoList: [],
      sessao: '',
      categoria: '',
      categories: []
    }
  },
  computed: {
    ...mapGetters([
      'getPermissao'
    ])
  },
  methods: {
    async fillBiblioteca () {
      const response = await axios.get(`${process.env.VUE_APP_API_URL}/biblioteca/`).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro ao tentar pesquisar as bibliotecas, cadastre ao menos uma biblioteca!'
        })
        throw error
      })
      if (response.data.length > 0) {
        this.bibliotecaList = response.data.map(item => {
          return {
            value: item.idBiblioteca,
            title: item.nomeBiblioteca,
            sessoes: item.sessoes
          }
        })
      } else {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu um erro ao tentar pesquisar as bibliotecas, cadastre ao menos uma biblioteca!'
        })
      }
    },
    changeSessao () {
      this.sessaoList = this.biblioteca.sessoes.map(item => {
        return {
          value: item.nomeSessao,
          title: item.nomeSessao
        }
      })
    },
    addCategory () {
      this.categories.push(this.categoria)
      this.categoria = ''
    },
    removeCategory (value) {
      this.categories = this.categories.filter(item => item !== value)
    },
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
    },
    async register () {
      if (!this.categories.length || !this.nomeTitulo || !this.editora || !this.preco || !this.autor || !this.sessao) {
        this.$swal.fire({
          icon: 'error',
          title: 'Campos vazios',
          text: 'Algum dos campos estão vazios!'
        })
        return null
      }

      const data = {
        categorias: this.categories,
        livro: {
          nomeTitulo: this.nomeTitulo,
          editora: this.editora,
          preco: this.preco
        },
        autor: {
          autNome: this.autor
        },
        sessao: {
          nomeSessao: this.sessao.value
        }
      }
      await axios.post(`${process.env.VUE_APP_API_URL}/livro/register`, data).catch(error => {
        this.$swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ocorreu algum erro ao criar o livro, tente novamente!'
        })
        throw error
      })
      this.fillTable()
      this.categories = []
      this.nomeTitulo = ''
      this.editora = ''
      this.preco = ''
      this.autor = ''
      this.sessao = {}
    }
  }
}
</script>

<style>
li {
  list-style-type: none;
}
</style>
