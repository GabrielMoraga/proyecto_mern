import React, { useState, useEffect } from 'react'
import "./Components.css"
import Formulario from "../components/Formulario";

const ProductosCards = () => {

    const [productos, setProductos] =  useState([])
    
    const url = '/api/productos'

    const fetchProductos = (url) => {
        fetch(url)
        .then((resp) => resp.json())
        .then((data) => setProductos(data))
        .catch((error) => console.log(error))
    }


    useEffect( () => {
        fetchProductos(url);
    }, [])

    const deleteHandeler = (id) => {
        fetch(`/api/productos/${id}`, {method: 'DELETE', headers: {admin: true}})
        .then((resp) => resp.json())
        .then((data) => {
            if (data.error) {
                alert(data.error)
            } else {
                setProductos(data)
            }
        })
        .catch((error) => {console.log(error)
        setProductos(productos)})
    }


    return (
        <>
        <Formulario setProductos={setProductos}/>
        <div className='row'>
            <h1 className='text-center mt-5 mb-5'>Lista de Productos</h1>
            {
                productos.map((item, index) => (

                    <div key={item.id} className='col'>
                        <div className='card mb-3'>
                            <h4 class="text-center">{item.nombre}</h4>
                            <img className='card-img m-2' src={item.foto} alt="foto"/>
                            <div className='card-body'>
                            <p class="card-text">{item.descripcion}</p>
                            <div className='mb-3'>
                                <button className='btn btn-primary'>Actualizar</button>
                                <button onClick={() => deleteHandeler(item.id)} className='btn btn-danger'>Borrar</button>
                            </div>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
        
        </>
        )

}





export default ProductosCards