const db = require('./src/config/db')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const cors = require('cors')
const registrationsRouter = require('./src/routes/registrations.routes')
require('dotenv').config()
app.use(cors())
app.use(express.json())

app.use('/api/registrations', registrationsRouter)
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});