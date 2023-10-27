const express = require("express")
const multiparty = require("connect-multiparty")
const UserControlller = require ("../controllers/user.controller.js")
const md_auth = require("../middlewares/authenticated.js")

const md_upload = multiparty({ uploadDir: "./uploads/avatar"})
const api = express.Router()

api.get("/user/me", [md_auth.asureAuth], UserControlller.getMe)
api.get("/users", [md_auth.asureAuth], UserControlller.getUsers)
api.post("/user", [md_auth.asureAuth, md_upload], UserControlller.createUser)
api.patch("/user/:id", [md_auth.asureAuth, md_upload], UserControlller.updateUser)
api.delete("/user/:id", [md_auth.asureAuth, md_upload], UserControlller.deleteUser)




module.exports = api