const { Transaction, Trip, Country, User } = require('../models');


exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({

            include: [{
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"],
                },
                include: {
                    model: Country,
                    as: "country",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    }
                }
            }, {
                model: User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"]
                }
            }],


            attributes: {
                exclude: ["idTrip", "idUser"],
            }

        });


        res.status(200).send({
            messege: "transaction berhasil respon",
            data: transaction
        });
    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Error",
            }
        })
    }
}

exports.addTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.create(req.body);
        const findTransaction = await Transaction.findAll({
            include: [{
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"],
                },
                include: {
                    model: Country,
                    as: "country",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    }
                }

            },
            {
                model: User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"],
                }
            }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idTrip", "idUser"],
            },
        });
        res.status(200).send({
            messege: "Berhasil",
            data: findTransaction
        });


    } catch (error) {
        res.status(500).send({
            error: {
                error
            }
        });
    }
}

exports.editTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        const findTransaction = await Transaction.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"],
                },
                include: {
                    model: Country,
                    as: "country",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    }
                }
            }, {
                model: User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            }],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idTrip", "idUser"],
            },
        });
        res.status(200).send({
            messege: "Berhasil Patch Transaction",
            data: findTransaction
        });


    } catch (error) {
        res.status(500).send({
            error: {
                error
            }
        });
    }
}



exports.sumCounterQty = async (req, res) => {
    try {

        const total = await Transaction.sum('counterQty', {
            where: {
                idTrip: req.params.idTrip,
                status: "approve"
            }
        });

        res.status(200).send({
            messege: "Berhasil",
            data: total
        });


    } catch (error) {
        res.status(500).send({
            error: {
                error
            }
        });
    }
}

exports.getDetailTransaction = async (req, res) => {
    try {

        const findTransaction = await Transaction.findAll({
            where: {
                idUser: req.params.idUser
            },
            order: [['createdAt', 'DESC']],
            include: [{
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"],
                },
                include: {
                    model: Country,
                    as: "country",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    }
                }
            }, {
                model: User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            }
            ],
            attributes: {
                exclude: ["createdAt", "updatedAt", "idTrip", "idUser"],
            },
        });
        res.status(200).send({
            messege: "Berhasil",
            data: findTransaction
        });


    } catch (error) {
        res.status(500).send({
            error: {
                error
            }
        });
    }
}

exports.getDetailTrans = async (req, res) => {
    try {

        const findTransaction = await Transaction.findOne({
            where: {
                id: req.params.id
            },
            include: [{
                model: Trip,
                as: "trip",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"],
                },
                include: {
                    model: Country,
                    as: "country",
                    attributes: {
                        exclude: ["createdAt", "updatedAt"],
                    }
                }
            }, {
                model: User,
                as: "user",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            }
            ],
            attributes: {
                exclude: ["updatedAt", "idTrip", "idUser"],
            },
            order: [['createdAt', 'DESC']]
        });
        res.status(200).send({
            messege: "Berhasil",
            data: findTransaction
        });


    } catch (error) {
        res.status(500).send({
            error: {
                error
            }
        });
    }
}

exports.uploadImgStruct = async (req, res) => {
    try {

        const transaction = await Transaction.findOne({
            where: {
                id: req.query.id
            }
        })
        const structTRansaction = await Transaction.update({ struct: req.files.fileImage.path }, {
            where: {
                id: transaction.id
            }

        });
        res.status(200).send({
            messege: "struct berhasil diupload",
            data: transaction
        });
    } catch (error) {
        res.status(400).send({
            error: {
                messege: error
            }
        })
    }
}