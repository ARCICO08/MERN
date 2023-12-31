const User = require("../models/user.model")
const bcrypt = require("bcryptjs")
const jwt = require("../utils/jwt")

function register(req, res){
   const { firstname, lastname, email, password } = req.body
   console.log(req.body)
   

   if(!email) res.status(400).send({smg: "El email es obligatorio"})
   if(!password) res.status(400).send({smg: "La contraseña es obligatoria"})

    const user = new User({
        firstname,
        lastname,
        email: email.toLowerCase(),
        role: "user",
        active: false,
    })

    const salt = bcrypt.genSaltSync(10)
    const hashpassword = bcrypt.hashSync(password, salt)

    console.log(password);
    console.log(hashpassword);

    user.password = hashpassword

    console.log(user)

    user.save((error, userStorage) => {
        if (error) {
            res.status(400).send({msg: "error al crear el usuario"})
        } else {
            res.status(200).send(userStorage) 
        }
    })
}

module.exports = {
    register,
}

function login(req, res) {
    const { email, password} = req.body
    if(!email) res.status(400).send({msg: "El email es obligatorio"})
    if(!password) res.status(400).send({msg: "La contraseña es obligatoria"})

    const emailLowerCase = email.toLowerCase()

    User.findOne({ email: emailLowerCase}, (error, userStore) => {
        if (error){
            res.status(500).send({msg: "error del servidor"})
        } else {
            bcrypt.compare(password, userStore.password, (bcryptError, check) => {
                if (bcryptError) {
                    res.status(500).send({msg: "error del servidor"})
                }   else if (!check) {
                    res.status(400).send({msg: "usuario o contraseña incorrecta"})
                }   else if (!userStore.active) {
                    res.status(401).send({msg: "usuario no autorizado  o no activo"})
                }  else {
                    res.status(200).send({
                        acces: jwt.createAccesToken(userStore),
                        refresh: jwt.createRefreshToken(userStore)
                    })
                }
            })
        }
    })    

}

function refreshAccessToken(req, res){
    const { token } = req.body

    if(!token) res.status(400).send({msg: "error token requerido"})

    const { user_id } = jwt.decoded(token)
  User.findOne({ _id: user_id }, (error, userStorage) => {

    if (error){
        res.status(500).send({msg: "error del servidor"})    
    }  else {
        res.status(200).send({
            accessToken: jwt.createAccesToken(userStorage)
        })
    }

})  
}


module.exports = {
    register,
    login,
    refreshAccessToken
}


//console.log("Password: ", password)
//console.log(userStore)

