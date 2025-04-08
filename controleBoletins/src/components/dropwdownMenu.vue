<script setup>
import { ref } from 'vue'

const props = defineProps({
  isOpen: Boolean,
})

const emit = defineEmits(['select', 'toggleDropDown'])

const selectedOption = ref(null)
const options = ref([
  'Buscar por BO',
  'Buscar por periodo',
  'Buscar por placa',
  'Buscar por cidade',
  'Buscar por cor do veiculo',
  'Buscar por tipo de veículo',
])

const selectOption = (option) => {
  emit('select', option)
  selectedOption.value = option
}

const openList = () => {
  emit('toggleDropDown')
}
</script>

<template>
  <div class="dropdown">
    <button @click="openList" class="dropdown-button">
      {{ selectedOption || 'Selecione uma opção de busca' }}
    </button>
    <ul v-if="isOpen" class="dropdown-menu">
      <li v-for="option in options" :key="option" @click="selectOption(option)">{{ option }}</li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown {
  display: flex;
  justify-content: center;
  margin-top: 2em;
  position: relative;
}

.dropdown-button {
  background-color: #3498db;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  width: 30vw;
}

.dropdown-menu {
  color: #b0b0b0;
  position: absolute;
  background-color: #1e1e1e;
  list-style: none;
  padding: 0;
  margin: 40px 0;
  border: 1px solid #ddd;
  width: 20vw;
}

.dropdown-menu li {
  padding: 10px;
  cursor: pointer;
}

.dropdown-menu li:hover {
  background-color: #f0f0f0;
}
</style>
