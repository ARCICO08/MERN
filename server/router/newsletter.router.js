const express = require("express")
const NewsletterController = require("../controllers/newsletter.controller")

const md_auth = require("../middlewares/authenticated")
const newsletterModel = require("../models/newsletter.model")

const api = express.Router()

api.post("/newsletter", NewsletterController.suscribeEmail)
api.get("/newsletter", [ md_auth.asureAuth ], NewsletterController.getEmails)
api.delete("/newsletter/:id", [ md_auth.asureAuth ], NewsletterController.deleteEmail)


module.exports = api