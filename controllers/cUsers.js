const { Users } = require("../models");

exports.getUsers = async (req, res) => {
    try {
        const users = await Users.findAll({
            where: {
                id: req.params.id
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(200).send({
            messege: "Response Success",
            data: {
                users,
            },
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: {
                messege: "Error",
            },
        });
    }
};

exports.deleteUsers = async (req, res,) => {
    try {


        const users = await Users.destroy({
            where: {
                id: req.params.id
            },
        });

        res.status(200).send({
            messege: "data Success deleted",
            data: users,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            error: {
                messege: "Error",
            },
        });

    }
};