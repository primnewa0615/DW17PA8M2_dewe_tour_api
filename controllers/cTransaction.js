const { Transaction, Trip, Country } = require('../models');


exports.getTransaction = async (req, res) => {
    try {
        const transaction = await Transaction.findAll({
            include: {
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
            attributes: {
                exclude: ["createdAt", "updatedAt", "idTrip"],
            },
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
            include: {
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
            attributes: {
                exclude: ["createdAt", "updatedAt", "idTrip"],
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
            include: {
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
            attributes: {
                exclude: ["createdAt", "updatedAt", "idTrip"],
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

exports.getDetailTransaction = async (req, res) => {
    try {

        const findTransaction = await Transaction.findOne({
            where: {
                id: req.params.id
            },
            include: {
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
            attributes: {
                exclude: ["createdAt", "updatedAt", "idTrip"],
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