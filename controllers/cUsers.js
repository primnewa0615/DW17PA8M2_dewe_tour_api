const { User } = require("../models");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Ajv = require('ajv');
var ajv = new Ajv();

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

exports.getUserByEmail = async (req, res) => {
    try {
        const user = await User.findOne({
            where: { email: req.params.email },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(200).send({
            messege: "Response Success",
            data: {
                user
            }
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
        const schema = {
            "properties": {
                "fullName": { "minimum": 3 },
                "email": { "format": "email" },
                "password": { "minimum": 8 },
            }
        };
        const validate = ajv.compile(schema);
        const valid = validate(req.body)
        if (valid) {
            // email is Exist?

            const findEmail = await User.findOne({
                where: {
                    email
                }
            });

            if (findEmail) {
                return res.status(400).send({
                    error: {
                        message: "email already been existed",
                    },
                });
            }
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




        } else {
            res.send({
                messege: 'Invalid: ' + ajv.errorsText(validate.errors)
            })
        }
    } catch (error) {
        res.status(500).send({
            error: {
                messege: error
            }
        });

    }
}

exports.login = async (req, res) => {
    try {

        const { email, password } = req.body
        const user = await User.findOne({
            where: {
                email
            }
        });

        if (user) {
            const checkPassword = await bcrypt.compare(password, user.password);
            if (checkPassword) {
                const token = jwt.sign({
                    id: user.id
                }, "primakk0615");

                return res.status(200).send({
                    messege: "Login Berhasil",
                    data: {
                        email, token
                    }
                });
            } else {
                return res.status(400).send({

                    messege: "Email atau Password salah",

                });
            }
        } else {
            return res.status(400).send({
                error: {
                    message: "Email atau Password salah",
                },
            });
        }
    } catch (error) {
        res.status(400).send({
            error: {
                messege: "Response gagal"
            }
        })
    }
}

exports.uploadImgProfile = async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                email: req.query.email
            }
        })
        const userImg = await User.update({ img: req.files.fileImage.path }, {
            where: {
                email: user.email
            }

        });
        res.status(200).send({
            messege: "Profile berhasil diganti",
            data: { user }
        });
    } catch (error) {
        res.status(400).send({
            error: {
                messege: error
            }
        })
    }

}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class User extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   User.init({
//     id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true
//     },
//     fullName: DataTypes.STRING,
//     email: DataTypes.STRING,
//     password: DataTypes.STRING,
//     phone: DataTypes.STRING,
//     address: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'User',
//   });
//   return User;
// };

// ///////////////////////////////////////////////////////////////////////////////////////////////////////
// 'use strict';
// module.exports = {
//   up: async (queryInterface, Sequelize) => {
//     await queryInterface.createTable('Users', {
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       id: {
//         allowNull: false,
//         autoIncrement: true,
//         primaryKey: true,
//         type: Sequelize.INTEGER
//       },
//       fullName: {
//         type: Sequelize.STRING
//       },
//       email: {
//         type: Sequelize.STRING
//       },
//       password: {
//         type: Sequelize.STRING
//       },
//       phone: {
//         type: Sequelize.STRING
//       },
//       address: {
//         type: Sequelize.STRING
//       },
//       createdAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       },
//       updatedAt: {
//         allowNull: false,
//         type: Sequelize.DATE
//       }
//     });
//   },
//   down: async (queryInterface, Sequelize) => {
//     await queryInterface.dropTable('Users');
//   }
// };