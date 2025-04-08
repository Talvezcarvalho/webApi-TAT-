import server from './server'

export async function getTodos() {
  const response = await server.get('/boletins')
  return response.data
}

export async function getBoletinsbyId(id) {
  console.log('Caiu aqui', id)
  const response = await server.get(`/boletins/${id}`)
  return response.data
}

export async function getBoletinsbyPeriodo(searchParam) {
  const response = await server.get(
    `http://localhost:3000/boletins/busca?periodoOcorrencia=${encodeURIComponent(searchParam)}`,
  )
  return response.data
}

export async function getVeiculosbyPlaca(searchParam) {
  const response = await server.get(
    `http://localhost:3000/veiculos/busca?placa=${encodeURIComponent(searchParam)}`,
  )
  return response.data
}

export async function getVeiculosbyCorVeiculo(searchParam) {
  const response = await server.get(
    `http://localhost:3000/veiculos/busca?cor=${encodeURIComponent(searchParam)}`,
  )
  return response.data
}

export async function getVeiculossbyModeloVeiculo(searchParam) {
  const response = await server.get(
    `http://localhost:3000/veiculos/busca?tipoVeiculo=${encodeURIComponent(searchParam)}`,
  )
  return response.data
}

export async function getBoletinsbyCidade(searchParam) {
  const response = await server.get(
    `http://localhost:3000/boletins/busca?cidade=${encodeURIComponent(searchParam)}`,
  )
  return response.data
}

export async function createBoletim(boletim) {
  const response = await fetch('http://localhost:3000/boletins', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(boletim),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar boletim')
  }
  return await response.json()
}
