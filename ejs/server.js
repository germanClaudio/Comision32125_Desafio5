const express = require('express');
// const ejs = require('ejs');

const app = express();

app.use(express.json())
app.use(express.urlencoded({extended: true }))

//-------------- Productos ----------------
const Container = require('./Container')
const products = new Container('./productos.txt')

app.set('views', './src/views/pages')
app.set('view engine', 'ejs')
app.use(express.static('src/images'))

app.get('/index', (req, res) =>{
    res.render('index.ejs')
})

app.get('/historial', (req, res) => {
    const showProducts = products.getAll()
    let flag = false
    if (showProducts.length > 0) {
        flag = true //cambiar a flase para probar if de page historial
    }    
    res.render('historial.ejs', { showProducts: showProducts, flag: flag } )
})

app.post("/index", (req, res) => {
    const productoGuardar = {
        title: req.body.title,
        price: parseInt(req.body.price),
        thumbnail: req.body.thumbnail
    }
    
    const addProduct = products.saveProduct(productoGuardar)
    res.render('index.ejs', { addProduct: addProduct } )
})


//------------ SERVER ----------
const PORT = 4000

const server = app.listen(PORT, ()=>{
    console.log(`Escuchando en el puerto ${PORT}`)
})

server.on("error", error => console.log(`Error en servidor ${error}`))