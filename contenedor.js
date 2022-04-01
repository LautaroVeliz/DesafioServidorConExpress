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
        let objeto = undefined
        this.objetos.forEach(elemento => {
            if (elemento.id === id) {
                objeto = elemento
            }
        });
        if (objeto == undefined) {
            return "ID invalido"
        }
        return objeto
    }
    getAll() {
        return this.objetos;
    }
    deleteById(id) {
        for (let index = 0; index < this.objetos.length; index++) {
            if (this.objetos[index].id == id) {
                this.objetos.splice(index, index + 1)
                break
            }
        }
        fs.writeFileSync('./productos.txt', JSON.stringify(this.objetos, null, 2))
    }

    deleteAll() {
        while (this.objetos.length > 0) this.objetos.pop()
        fs.writeFileSync('./productos.txt', JSON.stringify(this.objetos, null, 2))
    }
}
module.exports = Contenedor