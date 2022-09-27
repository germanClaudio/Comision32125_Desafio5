const express = require('express')
const { engine } = require("express-handlebars")
const app = express()
const path = require('path')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//-------------- Productos ----------------
const Container = require('./Container')
const products = new Container('./productos.txt')

app.engine(
    'hbs',
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
        layoutDir: __dirname + "/views/layouts",
        partialsDir: __dirname + '/views/partials/'
    })
);
// app.engine('handlebars', engine())

app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, '/views'))
app.use(express.static("images"))

app.get('/index', (req, res) => {
    let message = "Carga de Productos - HBS"
    res.render('main', { message: message })
})

app.get('/historial', (req, res) => {
    const showProducts = products.getAll()
    
    let flag = true
    if (showProducts.length > 0) {
        flag = false   // cambiar a true para probar el if de page historial
    }

    let message = "Historial - HBS"
    
    res.render('dataTable', { showProducts: showProducts, flag: flag, message: message })
})

app.post("/index", (req, res) => {
    const productoGuardar = {
        title: req.body.title,
        price: parseInt(req.body.price),
        thumbnail: req.body.thumbnail
    }
    
    const addProduct = products.saveProduct(productoGuardar)
    res.render('main', { addProduct: addProduct })
})


//------------ SERVER ----------
const PORT = 5050

const server = app.listen(PORT, () => {
    console.log(`Escuchando en el puerto ${PORT}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))