const mongoose = require("mongoose")
const app = require("./app")
const {DB_USER, DB_PASSWORD, DB_HOST, API_VERSION, IP_SERVER} = require("./constanst.js")

const PORT = process.env.PORT || 3000

mongoose.set('strictQuery', false)

mongoose.connect(
`mongodb+srv://admin:0123456789@cluster0.ygh7y4n.mongodb.net/`,
(error) => {
    if (error) throw error

    app.listen(PORT, () => {

        console.log("##########")
        console.log("### API REST MERN ###")
        console.log("##########")
        console.log("##########")
        console.log(`http://${IP_SERVER}:${PORT}/api/${API_VERSION}`)

      })

    }
)