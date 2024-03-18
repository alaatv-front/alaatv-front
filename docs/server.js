const express = require('express')
const path = require('path')

const app = express()
const PORT = process.env.DOCPORT || 3000

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, './')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './', 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
