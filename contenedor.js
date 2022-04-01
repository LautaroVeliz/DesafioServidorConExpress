const fs = require('fs')
class Contenedor {
    constructor(archivo) {
        this.objetos = [];
        try {
            let contenido = fs.readFileSync(archivo, 'utf-8')
            this.objetos = JSON.parse(contenido)
        } catch (error) {
            console.log(error)
            console.log("Archivo no encontrado. Se creara uno para su conveniencia.");
            try {
                let contenido = '[]'
                fs.writeFileSync(archivo, contenido)
                console.log("Archivo Creado")
                this.objetos = JSON.parse(contenido)
            } catch (e) {
                console.log(error)
                console.log("Error al intentar crear el archivo: " + e)
            }
        }
    }

    save(objecto) {
        let new_id = (() => {
            let max_id = 0
            this.objetos.forEach(elemento => {
                if (elemento.id > max_id) max_id = elemento.id
            });
            return max_id + 1
        })();
        this.objetos.push({ title: objecto.title, price: objecto.price, thumbnail: objecto.thumbnail, id: new_id })
        fs.writeFileSync('./productos.txt', JSON.stringify(this.objetos))
        return new_id
    }
    getById(id) {
        let objeto = "ID invalido"
        this.objetos.forEach(elemento => {
            if (elemento.id === id) {
                objeto = elemento
            }
        });
        return objeto
    }
    getAll() {
        return this.objetos;
    }
    deleteById(id) {
        let leng_origin = this.objetos.length;
        this.objetos = this.objetos.filter((objeto) => objeto.id !== id)
        if (this.productos.length == leng_origin) return "Objeto no encontrado"
        fs.writeFileSync('./productos.txt', JSON.stringify(this.objetos, null, 2))
        return "Objeto borrado"
    }

    deleteAll() {
        while (this.objetos.length > 0) this.objetos.pop()
        fs.writeFileSync('./productos.txt', JSON.stringify(this.objetos, null, 2))
    }
}
module.exports = Contenedor