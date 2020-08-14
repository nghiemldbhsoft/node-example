require('dotenv').config()
const app = require('express')()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const route = require('./routes/index')


//middleware
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

//api route
app.use(route)

//connect to db
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  },
  err => {
    if (!err) {
      console.log('MONGODB CONNECTED')
    } else {
      console.error(err)
    }
  }
)

app.listen(process.env.PORT || 5000, () => {
  console.log(`App is running on ${process.env.PORT} PORT `)
})
