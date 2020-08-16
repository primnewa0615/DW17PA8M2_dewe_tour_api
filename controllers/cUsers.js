const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.getUsers = async (req, res) => {
    try {
        const users = await User.findAll({
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


        const users = await User.destroy({
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

exports.register = async (req, res) => {
    try {
        const { fullName, email, password, phone, address } = req.body;
        const saltRound = 10;
        const hashPassword = await bcrypt.hash(password, saltRound);

        const user = await User.create({ fullName, email, password: hashPassword, phone, address });
        const token = jwt.sign({
            id: user.id
        }, "primakk0615");

        res.status(200).send({
            messege: "Response Success",
            data: {
                email, token
            }
        })

    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Response Gagal"
            }
        });

    }
}