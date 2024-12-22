import 'dotenv/config'
import app from './src/app.js'

const port = process.env.PORT || 3000;

// Inicializa o servidor
app.listen(port, () => {
  console.log(`Servidor escutando em http://localhost:${port}`)
})