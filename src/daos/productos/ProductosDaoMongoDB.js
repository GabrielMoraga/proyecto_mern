const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB.js')
const models = require('../../config.js')

class ProductosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(models.productos)
    }
}

module.exports = ProductosDaoMongoDB