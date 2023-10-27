const express = require("express")
const MenuController = require("../controllers/menu.controller")
const md_auth = require("../middlewares/authenticated")

const api = express.Router()

//endpoints
api.post("menu", [md_auth.asureAuth], MenuController.CreateMenu)



module.exports = api 