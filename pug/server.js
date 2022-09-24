const express = require('express');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//-------------- Productos ----------------
const Container = require('./Container')
const products = new Container('./productos.txt')

app.set('views', './src/views')
app.set('view engine', 'pug')

app.get('/index', (req, res) =>{
    res.render('index.pug')
})

app.get('/historial', (req, res) => {
    const showProducts = products.getAll()
    let flag = true
    if (showProducts.length > 0) {
        flag = true
    } else {
        flag = false
    }
    
    res.render('historial.pug', { showProducts: showProducts, flag: flag } )
})

app.post("/index", (req, res) => {
    console.log('Post: ' + JSON.stringify(req.body)) 
    const productoGuardar = {
        title: req.body.title,
        price: parseInt(req.body.price),
        thumbnail: req.body.thumbnail
    }
    console.log('Datos post: ' + req.body)

    const addProduct = products.saveProduct(productoGuardar)
    res.render('index.pug', { addProduct: addProduct } )
})


//------------ SERVER ----------
const PORT = 8080

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))