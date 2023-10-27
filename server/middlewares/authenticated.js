const jwt = require("jsonwebtoken")

function asureAuth(req, res, next) {
    if(!req.headers.authorization){
        return res.status(403).send({msg: "la peticion no tiene la cabezera de autenticacion"})
    } 

    const token = req.headers.authorization.replace("Bearer", "").trim()
    
    try  {
        const  payload = jwt.decode(token)

        const { exp } = payload
        const currentData = new Date().getTime()

        console.log(exp)
        console.log(currentData)

        if(exp <= currentData){
            return res.status(400).send({msg: "el token ha expirado"})
        }

        req.user = payload
        next()

    } catch (error) {
        return res.status(400).send({msg: "token invalido"})
    }
}

module.exports = {
    asureAuth
}