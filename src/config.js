// Configuración de las conexiones a dbs
const mongoose = require('mongoose')

// mongoose.connect('mongodb://localhost:27017/ecommerce')

async function coneccion() {
    try {
        await mongoose.connect('mongodb://localhost:27017/ecommerce')
        console.log('conectado a la base de datos')
      } catch (error) {
        console.log('error en conección: ',error);
      }
}
coneccion()

const productoSchema= new mongoose.Schema(
    {
        id: Number,
        timestamp: Date,
        nombre: {type: String, require: true, max: 100},
        descripcion: {type: String, require: true, max: 100},
        código: {type: String, require: true, max: 100},
        foto: {type: String, require: true, max: 200},
        precio: Number,
        stock: Number
    });


const carritoSchema= new mongoose.Schema(
    {
        id: Number,
        timestamp: Date,
        productos: Array
    });

const modeloProductos = mongoose.model('Productos',productoSchema)
const modeloCarritos = mongoose.model('Carritos',carritoSchema)

const models = {
productos: modeloProductos,
carritos: modeloCarritos
}

module.exports = models