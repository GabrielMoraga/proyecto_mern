const ProductosDaoMongoDB = require('./productos/ProductosDaoMongoDB');
const ProductosDaoFirebase = require('./productos/ProductosDaoFirebase');

const CarritosDaoMongoDB = require('./carrito/CarritosDaoMongoDB');
const CarritosDaoFirebase = require('./carrito/CarritosDaoFirebase');

if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}

const motorDB = process.env.MOTOR_DB
let ProductosApi = ProductosDaoMongoDB
let CarritosApi = CarritosDaoMongoDB

switch(motorDB) {
    case 'mongo':
        ProductosApi = ProductosDaoMongoDB
        CarritosApi = CarritosDaoMongoDB
        console.log('db mongoDB')
        break;
    case 'firebase':
        ProductosApi = ProductosDaoFirebase
        CarritosApi = CarritosDaoFirebase
        console.log('db firebase')
      break;
    default:
        console.log('default db mongoDB')
  }

module.exports = {ProductosApi, CarritosApi}