import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

import techFundings from './data/tech_fundings.json'

const port = process.env.PORT || 8080
const app = express()

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(bodyParser.json())

const users = [
  { id: 1, name: 'Alice', age: 33 },
  { id: 2, name: 'Bob', age: 23 },
  { id: 3, name: 'Chris', age: 3 },
  { id: 4, name: 'Daniela', age: 67 },
]

// This is our first endpoint
app.get('/', (req, res) => {
  res.send('Hello from us!')
})

// get a list of users
app.get('/users', (req, res) => {
  res.json(users)
})

// get a list of the companies with fundings (from json file)
app.get('/fundings', (req, res) => {
  res.json(techFundings)
})

// get a specific company based on id, using param
app.get('/fundings/:id', (req, res) => {
  const { id } = req.params

  const companyId = techFundings.find(company => company.index === +id)

  if (!companyId) {
    res.status(404).send('No company found with that id')
  } else {
    res.json(companyId)
  }
})

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port} YAY YAY`)
})
