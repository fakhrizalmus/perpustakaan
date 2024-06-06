const express = require("express");
const app = express()
const router = require('./routes/index.route')
const PORT = 4000
const {authenticated} = require('./authenticate')
const swaggerJSON = require('./api-documentation/swagger.json')
const swaggerUI = require('swagger-ui-express')

app.use(express.json())
app.use(express.urlencoded({extended: true}))  

app.use((req,res,next) => {
    if (authenticated) {
        // console.log('berhasil')
        next()
    } else {
        res.status(404).json({
            status: 'error',
            message: 'Anda tidak memiliki akses'
        })
    }
})

app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerJSON))
app.use('/v1', router)

app.get('/', (req, res) => {
    res.send('halo')
    console.log('test');
})

app.listen(PORT, () => {
    console.log(`dengar di ${PORT}`);
})