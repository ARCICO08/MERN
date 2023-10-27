const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const {API_VERSION } = require("./constanst")
const bodyParser = require("body-parser")

const app = express()

/////importacion de rutas 

const authRoutes = require("./router/auth.router")
const userRoutes = require("./router/user.router")
const menuRoutes = require("./router/menu.router")


/////Configurar Body Parse 
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

//configrar rutas
app.use(`/api/${API_VERSION}`, authRoutes)
app.use(`/api/${API_VERSION}`, userRoutes)
app.use(`/api/${API_VERSION}`, menuRoutes)



/////Configurar carpeta static
app.use(express.static("uploads"))




/////Configurar Header HTTP - CORS
app.use(cors())





/////Importar Rutas





/////Configurar estas Rutas

app.use(`/api/${API_VERSION}`, authRoutes)


module.exports = app