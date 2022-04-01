const Contenedor = require('./contenedor.js')
const express = require('express')
const app = express()
const PORT = 8080

let contenedor = new Contenedor('./productos.txt')

const server = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))

app.get('/productos', (req, res) => {
    res.send(contenedor.getAll())
})

app.get('/productoRandom', (req, res) => {
    let ids = (() => {
        let ret_ids = []
        contenedor.getAll().forEach(producto => {
            ret_ids.push(producto.id)
        });
        return ret_ids
    })();
    res.send(contenedor.getById(ids[Math.floor(Math.random() * ids.length)]))
})