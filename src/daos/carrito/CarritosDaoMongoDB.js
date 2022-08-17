const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB.js')
const models = require('../../config.js')

class CarritosDaoMongoDB extends ContenedorMongoDB {
    constructor() {
        super(models.carritos)
    }
}

module.exports = CarritosDaoMongoDB
