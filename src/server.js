const express = require('express');
const {Router} = require('express');
//const ManejoArchivo = require('./controllers/ManejoArchivo.js');
const {ProductosApi} = require('./daos/dao.js')
//const CarritosApi = require('./daos/dao.js')
const path = require('path');
const auth = require('./middleware/auth.js')

//--------------------------------------------
// instancio servidor y api

const app = express()
//const productosApi = new ManejoArchivo('productos.json');
//const carritoApi = new ManejoArchivo('carrito.json');
const productosApi = new ProductosApi;

//--------------------------------------------
// agrego middlewares

app.use(express.json());
app.use(express.urlencoded({extended: true}));
//app.use(express.static('public'));
app.use(express.static(path.resolve(__dirname, '../client/build')));

//--------------------------------------------
// Enlazo las rutas con el router
const routerProductos = new Router();
const routerCarrito = new Router();

app.use("/api/productos", routerProductos); // Esto debe ir después de los middlewares sino no los toma
app.use("/api/carrito", routerCarrito);


//--------------------------------------------
// configuro el los endpoint para Productos
let admin = false;

routerProductos.get('/:id?', async (req, res) => {
    const id = req.params.id;
    if(id) {
        const respuesta = await productosApi.listar(id)
        res.json(respuesta)
    } else {
        const respuesta = await productosApi.listarAll()
        res.json(respuesta)
    }
});

routerProductos.post('/', async (req, res) => {
    const prod = req.body;
    const resp = await productosApi.guardar(prod)
    res.json(resp)
});

routerProductos.put('/:id', auth, async (req, res) => {
    const prod = req.body;
    const id = req.params.id;
    const resp = await productosApi.actualizar(prod, id)
    res.json(resp)
});

routerProductos.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    const resp = await productosApi.borrar(id)
    res.json(resp)
});

routerProductos.delete('/', async (req, res) => {
    const id = req.params.id;
    const resp = await productosApi.borrarAll()
    res.json(resp)
});

/*--------------------------------------------
// configuro los endpoint para Carrito

// Crea un carrito y devuelve su id.
routerCarrito.post('/', async (req, res) => {
    const carrito = req.body;
    const resp = await carritoApi.guardar(carrito)
    res.json(resp.id)
});

// Vacía un carrito y lo elimina.
routerCarrito.delete('/:id', async (req, res) => {
    const id = req.params.id;
    const resp = await carritoApi.borrar(id)
    res.json(resp)
});


// Listar todos los productos guardados en el carrito.
routerCarrito.get('/:id/productos', async (req, res) => {
    const id = req.params.id;
    const resp = await carritoApi.listar(id)
    res.json(resp.productos)
});


// Incorporar productos al carrito por su id de producto
routerCarrito.post('/:id/productos', async (req, res) => {
    const id_carr = req.params.id;
    const id_prod = req.body;
    const prod = await productosApi.listar(id_prod)
    const resp = await carritoApi.addPropductoCarrito(id_carr, prod)
    res.json(resp)
});


// Eliminar un producto del carrito por su id de carrito y de producto
routerCarrito.delete('/:id/productos/:id_prod', async (req, res) => {
    const id_carr = req.params.id;
    const id_prod = req.params.id_prod;
    console.log(id_prod)
    const prod = await productosApi.listar(id_prod)
    const resp = await carritoApi.deletePropductoCarrito(id_carr, prod)
    res.json(resp)
});
*/

//--------------------------------------------
// configuro los endpoint para rutas no válidas donde devuelve la React app
/*
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
    });
*/

app.get('*', (req, res) => {
    res.json(
        { error : -2, descripcion: `ruta 'x' método 'y' no implementada`}
    )
});



//--------------------------------------------
// inicio el servidor

const PORT = process.env.PORT || 8080
const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${PORT}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
