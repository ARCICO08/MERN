const Menu = require("../models/menu.model")

    async function CreateMenu(req, res){
        const menu = new Menu(req.body)

        menu.save((error, menuStored) => {
            if (error) {
                res.status(400).send({msg: "error al crear el menu"})
            } else {
                res.status(200).send(menuStored)
            }
        })
    }


module.exports = {
    CreateMenu,
}