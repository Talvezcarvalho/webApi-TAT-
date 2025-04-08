<script setup>
import { createBoletim } from '@/http'
import { ref } from 'vue'

const emit = defineEmits(['close'])

const formData = ref({
  dataOcorrencia: '',
  periodoOcorrencia: '',
  localOcorrencia: {
    rua: '',
    numero: '',
    bairro: '',
    cidade: '',
    uf: '',
    latitude: '',
    longitude: '',
    descricaoLocal: '',
  },
  veiculoFurtado: {
    placa: '',
    ufVeiculo: '',
    cidadeVeiculo: '',
    corVeiculo: '',
    marcaVeiculo: '',
    anoFabricacao: null,
    anoModelo: null,
    tipoVeiculo: '',
  },
  tipoCrime: '',
  descricaoCrime: '',
})

const callClose = () => {
  emit('close')
}

const submitForm = async () => {
  try {
    const response = await createBoletim(formData.value)

    alert('Boletim criado com sucesso!')
    console.log(response)

    formData.value = {
      dataOcorrencia: '',
      periodoOcorrencia: '',
      localOcorrencia: {
        rua: '',
        numero: '',
        bairro: '',
        cidade: '',
        uf: '',
        latitude: '',
        longitude: '',
        descricaoLocal: '',
      },
      veiculoFurtado: {
        placa: '',
        ufVeiculo: '',
        cidadeVeiculo: '',
        corVeiculo: '',
        marcaVeiculo: '',
        anoFabricacao: null,
        anoModelo: null,
        tipoVeiculo: '',
      },
      tipoCrime: '',
      descricaoCrime: '',
    }
  } catch (error) {
    alert('Erro ao criar boletim')
    console.error(error)
  }
}
</script>

<template>
  <div class="form_container">
    <h2>Criar Novo Boletim</h2>
    <form @submit.prevent="submitForm">
      <!-- Data da Ocorrência -->
      <div class="form_group">
        <label for="dataOcorrencia">Data da Ocorrência:</label>
        <input type="date" id="dataOcorrencia" v-model="formData.dataOcorrencia" />
      </div>

      <!-- Período da Ocorrência -->
      <div class="form_group">
        <label for="periodoOcorrencia">Período da Ocorrência:</label>
        <select id="periodoOcorrencia" v-model="formData.periodoOcorrencia">
          <option value="DE MADRUGADA">DE MADRUGADA</option>
          <option value="PELA MANHÃ">PELA MANHÃ</option>
          <option value="A TARDE">A TARDE</option>
          <option value="A NOITE">A NOITE</option>
        </select>
      </div>

      <!-- Local da Ocorrência -->
      <div class="form_group">
        <h3>Local da Ocorrência</h3>

        <label for="rua">Rua:</label>
        <input type="text" id="rua" v-model="formData.localOcorrencia.rua" />

        <label for="numero">Número:</label>
        <input type="text" id="numero" v-model="formData.localOcorrencia.numero" />

        <label for="bairro">Bairro:</label>
        <input type="text" id="bairro" v-model="formData.localOcorrencia.bairro" />

        <label for="cidade">Cidade:</label>
        <input type="text" id="cidade" v-model="formData.localOcorrencia.cidade" />

        <label for="uf">UF:</label>
        <input type="text" id="uf" v-model="formData.localOcorrencia.uf" />

        <label for="latitude">Latitude:</label>
        <input type="text" id="latitude" v-model="formData.localOcorrencia.latitude" />

        <label for="longitude">Longitude:</label>
        <input type="text" id="longitude" v-model="formData.localOcorrencia.longitude" />

        <label for="descricaoLocal">Descrição do Local:</label>
        <input type="text" id="descricaoLocal" v-model="formData.localOcorrencia.descricaoLocal" />
      </div>

      <!-- Veículo Furtado -->
      <div class="form_group">
        <h3>Veículo Furtado</h3>
        <label for="placa">Placa:</label>
        <input type="text" id="placa" v-model="formData.veiculoFurtado.placa" />

        <label for="ufVeiculo">UF do Veículo:</label>
        <input type="text" id="ufVeiculo" v-model="formData.veiculoFurtado.ufVeiculo" />

        <label for="cidadeVeiculo">Cidade do Veículo:</label>
        <input type="text" id="cidadeVeiculo" v-model="formData.veiculoFurtado.cidadeVeiculo" />

        <label for="corVeiculo">Cor do Veículo:</label>
        <input type="text" id="corVeiculo" v-model="formData.veiculoFurtado.corVeiculo" />

        <label for="marcaVeiculo">Marca do Veículo:</label>
        <input type="text" id="marcaVeiculo" v-model="formData.veiculoFurtado.marcaVeiculo" />

        <label for="anoFabricacao">Ano de Fabricação:</label>
        <input type="number" id="anoFabricacao" v-model="formData.veiculoFurtado.anoFabricacao" />

        <label for="anoModelo">Ano do Modelo:</label>
        <input type="number" id="anoModelo" v-model="formData.veiculoFurtado.anoModelo" />

        <label for="tipoVeiculo">Tipo de Veículo:</label>
        <input type="text" id="tipoVeiculo" v-model="formData.veiculoFurtado.tipoVeiculo" />
      </div>

      <!-- Detalhes do Crime -->
      <div class="form_group">
        <h3>Detalhes do Crime</h3>
        <label for="tipoCrime">Tipo de Crime:</label>
        <input type="text" id="tipoCrime" v-model="formData.tipoCrime" />

        <label for="descricaoCrime">Descrição do Crime:</label>
        <textarea id="descricaoCrime" v-model="formData.descricaoCrime"></textarea>
      </div>

      <button type="submit" @click="submitForm">Criar Boletim</button>
    </form>
    <button class="close_button" @click="callClose">Fechar</button>
  </div>
</template>

<style scoped>
.form_container {
  margin-top: 20px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 40vw;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.form_group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input,
select {
  width: 90%;
  padding: 8px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #121212;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}
.close_button {
  margin-top: 10px;
}
</style>
