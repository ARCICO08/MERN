const express = require("express")
const AuthController = require("../controllers/auth.controlller.js")

const api = express.Router()

api.post("/auth/register", AuthController.register)
api.post("/auth/login", AuthController.login)
api.post("/auth/refresh_acess_token", AuthController.refreshAccessToken)



    
module.exports = api