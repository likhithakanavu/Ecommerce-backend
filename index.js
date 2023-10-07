require('dotenv').config();
const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')

const app = express();
app.use(express.json())
app.use(cors())


 app.use('/api/auth', require('./router/auth'))
 app.use('/api/category',require('./router/category'))
app.use('/api/product',require('./router/product'))

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('market backend  $ listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

