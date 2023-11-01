const express = require ("express")
const multiparty = require ("connect-multiparty")
const PostControlller = require ("../controllers/post.controller")
const md_auth = require ("../middlewares/authenticated")

const md_upload = multiparty({ uploadDir: "./uploads/blog"})
const api = express.Router()

api.post("/post", [md_auth.asureAuth, md_upload], PostControlller.createPost)
api.get("/post", PostControlller.getPosts)
api.patch("/post/:id", [md_auth.asureAuth, md_upload], PostControlller.updatePost)
api.delete("/post/:id", [md_auth.asureAuth], PostControlller.deletePost)




module.exports = api