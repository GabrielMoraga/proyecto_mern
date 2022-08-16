import React from 'react';

function FormProductos({setProductos, productos}) {

const [values, setValues] = React.useState({
    nombre: 'Mochila',
    descripcion: 'Esta es otra mochila',
    codigo: '11111',
    foto: 'https://cdn3.iconfinder.com/data/icons/education-209/64/bag-pack-container-school-512.png',
    precio: '200',
    stock: '10',
    });

const handleChange = (e) => {
    const { name, value } = e.target
    setValues({ ...values, [name]: value })
    }

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        let config = {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(values)
        }

        let res = await fetch('/api/productos', config) 
        let json = await res.json()
        setProductos(json)
        console.log(json) 

    } catch (error) {
        
    }
}

const {nombre, descripcion, codigo, foto, precio, stock} = values

return (
    <form className='mx-auto' id='form-productos' onSubmit={handleSubmit}>
    <h1 className='text-center mb-2'>Ingresar Productos</h1>
    <label className='form-label mt-2'>Nombre</label>
    <input className='form-control' name='nombre' type='text' value={nombre} onChange={handleChange}/>
    <label className='form-label mt-2'>Descripción</label>
    <input className='form-control' name='descripcion' type='text' value={descripcion} onChange={handleChange}/>
    <label className='form-label mt-2'>Código</label>
    <input className='form-control' name='codigo' type='number' value={codigo} onChange={handleChange}/>
    <label className='form-label mt-2'>Foto (url)</label>
    <input className='form-control' name='foto' type='url' value={foto} onChange={handleChange}/>
    <label className='form-label mt-2'>Precio</label>
    <input className='form-control' name='precio' type='number' value={precio} onChange={handleChange}/>
    <label className='form-label mt-2'>Stock</label>
    <input className='form-control' name='stock' type='number' value={stock} onChange={handleChange}/>
    <br/>
    <input className='btn btn-primary' type='submit' value='Enviar'/>
    </form>
)
}

export default FormProductos