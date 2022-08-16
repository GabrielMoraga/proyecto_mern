const auth = (req, res, next) => {
        const {admin} = req.headers;
        console.log(typeof(admin),admin)
        if(admin == 'true') {
            
            next();
        } else {
            res.status(404).json({error: 'acceso no autorizado'})
        }
    }

module.exports = auth