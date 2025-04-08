<script setup>
import { ref } from 'vue'

const emit = defineEmits(['search'])

const searchString = ref('')

const sendSearch = () => {
  emit('search', searchString.value)
}
</script>

<template>
  <div class="container">
    <input class="search_input" type="text" v-model="searchString" placeholder="Digite aqui" />

    <button class="search_button" @click="sendSearch">Buscar</button>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  justify-content: center;
  position: relative;
}

.search_input {
  box-shadow: -2px 2px 1px #3498db;
  background-image: url('../assets/icons/searchIcon.svg');
  background-repeat: no-repeat;
  background-size: 25px;
  background-position: right 10px center;
  width: 30vw;
  padding: 10px 10px;
  border: none;
  cursor: pointer;
}

.search_button {
  background-color: white;
  color: black;
  padding: 10px 15px;
  border: solid 2px #3498db;
  box-shadow: -2px 2px 1px #3498db;
  cursor: pointer;
  width: 20vw;
}
</style>
