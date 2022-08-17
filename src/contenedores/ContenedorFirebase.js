const admin = require('firebase-admin');
const {serviceAccount} = require('../config.js');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = admin.firestore()

class ContenedorFirebase {
    constructor(nombreColeccion) {
        this.coleccion = db.collection(nombreColeccion)
    }

    async listar(id) {
        try {
            const doc = await this.coleccion.doc(id).get();
            if(!doc.exists) {
                throw new Error('Error al encontrar el documento')
            } else {
                const data = doc.data()
                return data
            }
        } catch (error) {
            return error
        }
    }

    async listarAll() {
        const result = []
        try {
            const snapshot = await this.coleccion.get();
            snapshot.forEach(doc => {
                result.push({id: doc.id, ...doc.data()})
                });
            return result;
        } catch (error) {
            return error
        }
    }

    async guardar(obj) {
        try {
            const newObj = {timestamp: Date.now(), ...obj }
            const objectSaved = await this.coleccion.add(newObj);
            console.log(error)
            return objectSaved;
        } catch (error) {
            return error
        }
    }

    async actualizar(obj) {
        try {
            const updatedObj = await this.coleccion.doc(obj.id).set(obj);
            return updatedObj;
        } catch (error) {
            return error
        }
    }

    async delete(id) {
        try {
            const resp = await this.coleccion.doc(id).delete();
            return resp;
        } catch (error) {
            return error
        }
    }
}

module.exports = ContenedorFirebase
