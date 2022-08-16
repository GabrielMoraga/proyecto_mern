const {promises: fs} = require('fs');

class ManejoArchivos {
    constructor(ruta) {
        this.ruta = ruta;
    }

    async listarAll() {
        try {
            const objs = await fs.readFile(this.ruta, 'utf-8')
            return JSON.parse(objs)
        } catch (error) {
            return []
        }
    }

    async listar(id) {
        try {
            const objs = await this.listarAll()
            const obj = objs.find(prod => prod.id == id)
            return obj
            
        } catch (error) {
            console.log(error)
        }
    }

    async guardar(obj) {
        const objs = await this.listarAll()
        let newId
        if(objs.length == 0) {
            newId = 1;
        } else {
            const ids = objs.map(o => o.id)
            const max = Math.max(...ids)
            newId = Number(max) + 1
        }

       const newObj = {id: newId, timestamp: Date.now(), ...obj }
        
        objs.push(newObj)
        
        try {
            await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2),'utf-8')
            return objs
        } catch (error) {
            throw new Error(`Error al guardar: ${error}`)
        }
    }


    async actualizar(obj, id) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == id)
        const oldProd = objs[index];
        if (oldProd) {
            obj.id = Number(id)
            objs[index] = obj
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
                return { mensaje: `objeto id: ${id} actualizado` }
            } catch (error) {
                throw new Error(`Error al actualizar: ${error}`)
            }
        } else {
            return { error: `objeto id: ${id} no encontrado` }
        }
    }

    async borrar(id) {
        const objs = await this.listarAll()
        const index = objs.findIndex((o) => o.id == id);
        let obj = objs[index]
        if (obj) {
            objs.splice(index,1)
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
                return objs
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        } else {
            return {error: `Error al borrar: no se encontró id: ${id}`};
        }
    };

    async borrarAll() {
        try {
            await fs.writeFile(this.ruta, JSON.stringify([], null, 2))
        } catch (error) {
            throw new Error(`Error al borrar todo: ${error}`)
        }
    }

    /*---------------------------------------------------*/
    // Especiales para carrito

    // Incorporar productos al carrito por su id de producto
    async addPropductoCarrito(id_carr, obj) {
        const objs = await this.listarAll()
        console.log(objs)
        console.log(obj)
        const index = objs.findIndex(o => o.id == id_carr)
        if (index && obj) {
            try {
                objs[index].productos.push(obj)
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2),'utf-8')
                return objs[index]
            } catch (error) {
                throw new Error(`Error al agregar objeto: ${error}`)
            }
        } else {
            return {error: `Error al agregar: no se encontraron los id del carrito o producto`};
        }
    }

    // Eliminar un producto del carrito por su id de carrito y de producto
    async deletePropductoCarrito(id_carr, obj) {
        const objs = await this.listarAll()
        const index = objs.findIndex(o => o.id == id_carr) // identifico el index asociado al id del carrito
        if (index && obj) {
            const id_prod = obj.id
            objs[index].productos.splice(id_prod,1) // Elimino id_prod del carrito
            try {
                await fs.writeFile(this.ruta, JSON.stringify(objs, null, 2))
                return { mensaje: `objeto id: ${id_prod} eliminado` }
            } catch (error) {
                throw new Error(`Error al borrar: ${error}`)
            }
        } else {
            return {error: `Error al borrar: no se encontraron los id del carrito o producto`};
        }
    }

}

module.exports = ManejoArchivos