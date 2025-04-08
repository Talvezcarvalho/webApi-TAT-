<script setup>
import {
  getBoletinsbyCidade,
  getBoletinsbyId,
  getBoletinsbyPeriodo,
  getTodos,
  getVeiculosbyCorVeiculo,
  getVeiculosbyPlaca,
  getVeiculossbyModeloVeiculo,
} from '@/http'
import DropwdownMenu from './dropwdownMenu.vue'
import SearchBar from './searchBar.vue'

import { ref } from 'vue'
import BoletimCard from './boletimCard.vue'
import CreateBoletimCard from './createBoletimCard.vue'

const selectedOption = ref('')

const boletins = ref([])

const isOpen = ref(false)

const isCreating = ref(false)

const selectOption = (option) => {
  selectedOption.value = option
  isOpen.value = false
}

const toggleDropDown = () => {
  isOpen.value = !isOpen.value
}

const toggleIsCreating = () => {
  console.log('toggle')
  isCreating.value = !isCreating.value
}

const selectAll = async () => {
  if (boletins.value.length) {
    boletins.value = []
  }
  let data = await getTodos()
  selectedOption.value = 'Buscar Todos'
  boletins.value.push(...data)
}

const search = async (searchValue) => {
  console.log(searchValue)
  if (boletins.value.length) {
    console.log('limpando')
    boletins.value = []
  }
  let data = []
  let uniData = ''
  if (selectedOption.value === 'Buscar por BO') {
    uniData = await getBoletinsbyId(searchValue)
  } else if (selectedOption.value === 'Buscar por periodo') {
    try {
      data = await getBoletinsbyPeriodo(searchValue)
    } catch (error) {
      alert(error.response.data.message)
    }
  } else if (selectedOption.value === 'Buscar por placa') {
    try {
      data = await getVeiculosbyPlaca(searchValue)
    } catch (error) {
      alert(error.response.data.message)
    }
  } else if (selectedOption.value === 'Buscar por cidade') {
    try {
      data = await getBoletinsbyCidade(searchValue)
    } catch (error) {
      alert(error.response.data.message)
    }
  } else if (selectedOption.value === 'Buscar por cor do veiculo') {
    try {
      data = await getVeiculosbyCorVeiculo(searchValue)
    } catch (error) {
      alert(error.response.data.message)
    }
  } else if (selectedOption.value === 'Buscar por tipo de veículo') {
    try {
      data = await getVeiculossbyModeloVeiculo(searchValue)
    } catch (error) {
      alert(error.response.data.message)
    }
  }
  if (uniData) {
    boletins.value.push(uniData)
  } else {
    boletins.value.push(...data)
  }
}
</script>

<template>
  <header class="cabecalho">
    <h1>Busca Boletim</h1>
    <h2>Busque boletins de ocorrência de forma rápida e fácil</h2>
  </header>
  <div class="create_boletim_container">
    <button class="create_boletim" @click="toggleIsCreating">Criar boletim</button>
  </div>

  <div class="container">
    <CreateBoletimCard v-if="isCreating" @close="toggleIsCreating" />
    <DropwdownMenu
      v-if="!isCreating"
      :isOpen
      :selected="selectedOption"
      @select="selectOption"
      @toggleDropDown="toggleDropDown"
    />
    <button v-if="!isCreating" class="showAll" @click="selectAll">Buscar Todos</button>
    <SearchBar @search="search" v-if="!isOpen && !isCreating" />
  </div>
  <div class="cards_container" v-if="boletins.length">
    <ul class="cards_list">
      <li v-for="boletim in boletins" :key="boletim.id">
        <BoletimCard :boletim="boletim" />
      </li>
    </ul>
  </div>
</template>
<style scoped>
.cabecalho {
  border-bottom: solid 1px #ddd;
  background-color: #121212;
  color: #ddd;
  text-align: center;
  padding: 20px 0;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  position: relative;
}
.showAll {
  background-color: #121212;
  color: white;
  padding: 3px 5px;
  border: solid 1px white;
  cursor: pointer;
  width: 10em;
}
.cards_container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-top: 20px;
}
.cards_list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.create_boletim_container {
  position: absolute;
  top: 20px;
  right: 20px;
}

.create_boletim {
  background-color: #121212;
  color: white;
  padding: 5px 10px;
  border: solid 1px white;
  cursor: pointer;
}
</style>
