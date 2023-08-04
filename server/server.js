const app = require('./app')
const PORT = process.env.PORT || 3004

app.listen(PORT, function () {
    console.log(`REST API running on port ${PORT}`)
  })