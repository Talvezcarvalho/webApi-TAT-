<script setup>
// eslint-disable-next-line no-unused-vars
const props = defineProps({
  boletim: Object,
})

const isBoletimcompleted = (obj) => {
  return obj && obj.dataOcorrencia && obj.localOcorrencia && obj.tipoCrime
}

const isOnlyVehicle = (obj) => {
  return obj && obj.placa && obj.marcaVeiculo && obj.corVeiculo
}
</script>

<template>
  <div class="card">
    <template v-if="isBoletimcompleted(boletim)">
      <BoletimCompleto :boletim="boletim" />
      <h2>Boletim de Ocorrência</h2>
      <p><strong>Número do BO:</strong> {{ boletim?._id }}</p>
      <p><strong>Data da Ocorrência:</strong> {{ boletim?.dataOcorrencia }}</p>
      <p><strong>Período:</strong> {{ boletim?.periodoOcorrencia }}</p>

      <h3>Local da Ocorrência</h3>
      <p>
        <strong>Endereço:</strong> {{ boletim?.localOcorrencia?.rua }},
        {{ boletim?.localOcorrencia?.numero }}
      </p>
      <p><strong>Bairro:</strong> {{ boletim?.localOcorrencia?.bairro }}</p>
      <p>
        <strong>Cidade:</strong> {{ boletim?.localOcorrencia?.cidade }} -
        {{ boletim?.localOcorrencia?.uf }}
      </p>
      <p><strong>Descrição:</strong> {{ boletim?.localOcorrencia?.descricaoLocal }}</p>

      <h3>Veículo Envolvido</h3>
      <p><strong>Placa:</strong> {{ boletim?.veiculoFurtado?.placa || 'Não informado' }}</p>
      <p><strong>Marca:</strong> {{ boletim?.veiculoFurtado?.marcaVeiculo || 'Não informado' }}</p>
      <p><strong>Cor:</strong> {{ boletim?.veiculoFurtado?.corVeiculo || 'Não informado' }}</p>
      <p>
        <strong>Tipo do veiculo:</strong>
        {{ boletim?.veiculoFurtado?.tipoVeiculo || 'Não informado' }}
      </p>

      <p>
        <strong>Ano:</strong> {{ boletim?.veiculoFurtado?.anoFabricacao || 'Não informado' }} /
        {{ boletim?.veiculoFurtado?.anoModelo || 'Não informado' }}
      </p>

      <h3>Detalhes do Crime</h3>
      <p><strong>Tipo:</strong> {{ boletim?.tipoCrime }}</p>
      <p><strong>Descrição:</strong> {{ boletim?.descricaoCrime }}</p>
    </template>
    <template v-else-if="isOnlyVehicle(boletim)">
      <h2>Veículo Envolvido</h2>
      <p><strong>Placa:</strong> {{ boletim.placa }}</p>
      <p><strong>Marca:</strong> {{ boletim.marcaVeiculo }}</p>
      <p><strong>Cor:</strong> {{ boletim.corVeiculo }}</p>
      <p><strong>Ano de Fabricação:</strong> {{ boletim.anoFabricacao }}</p>
      <p><strong>Ano do Modelo:</strong> {{ boletim.anoModelo }}</p>
      <p><strong>Tipo de Veículo:</strong> {{ boletim.tipoVeiculo }}</p>
    </template>
  </div>
</template>
<style scoped>
.card {
  background: #fff;
  padding: 15px;
  margin: 10px 10px;
  border-radius: 10px;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
}
h2,
h3 {
  color: #333;
}
p {
  margin: 5px 0;
  color: #555;
}
</style>
