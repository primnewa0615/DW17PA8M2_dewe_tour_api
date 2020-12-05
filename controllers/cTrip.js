const { Trip, Country } = require("../models");
const { Op } = require("sequelize");

exports.getTrip = async (req, res) => {
    try {
        const trip = await Trip.findAll({
            include: {
                model: Country,
                as: "country",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }

        });


        res.status(200).send({
            messege: "trip berhasil respon",
            data: trip
        });
    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Error",
            }
        });
    }
}

exports.getTripFromSearch = async (req, res) => {
    try {
        const trip = await Trip.findAll({
            where: {
                [Op.or]: {
                    title: {
                        [Op.like]: `%${req.params.key}%`,
                    },
                    accomodation: {
                        [Op.like]: `%${req.params.key}%`
                    },
                    transportation: {
                        [Op.like]: `%${req.params.key}%`
                    },
                    accomodation: {
                        [Op.like]: `%${req.params.key}%`
                    },

                }
            },
            include: {
                model: Country,
                as: "country",
                attributes: {
                    exclude: ["createdAt", "updatedAt"],
                }
            },
            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }

        });


        res.status(200).send({
            messege: "trip berhasil respon",
            data: trip
        });
    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Error",
            }
        });
    }
}


exports.getDetailTrip = async (req, res) => {
    try {
        const detailTrip = await Trip.findOne({
            where: {
                id: req.params.id
            },
            include: {
                model: Country,
                as: "country",
                attributes: {
                    exclude: ["createdAt", "updatedAt", "idCountry"],
                }
            },

            attributes: {
                exclude: ["createdAt", "updatedAt"],
            }
        });

        res.status(200).send({
            messege: "Reasponse of Detail Success",
            data: detailTrip
        });
    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Response of detail Gagal",
            }
        })
    }
}

exports.editTrip = async (req, res) => {
    try {
        const trip = await Trip.update(req.body, {
            where: {
                id: req.params.id,
            }
        });

        const findTrip = await Trip.findOne({
            where: {
                id: req.params.id
            },
            attribute: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.status(200).send({
            messege: `data dengan id ${req.params.id} BERHASIL diupdate`,
            data: findTrip
        });
    } catch (error) {
        res.status(500).send({
            messege: `data dengan id ${req.params.id} GAGAL diupdate`,
        });
    }
}

exports.addTrip = async (req, res) => {
    try {
        const trip = await Trip.create(req.body);
        res.status(200).send({
            messege: "Data berhasil ditambahkan",
            data: trip
        });
    } catch (error) {
        res.status(500).send({
            error: {
                messege: error
            }
        })
    }
}

exports.addImageTrip = async (req, res) => {
    console.log(req.files.image1);
    console.log(req.query.id);
    try {
        const tripImg = await Trip.update({ image1: req.files.image1.path }, {
            where: {
                id: req.query.id
            }

        });
        res.status(200).send({
            messege: "Profile berhasil diganti",
            data: { tripImg }
        });
    } catch (error) {
         res.status(500).send({
            error: {
                messege: error
            }
        })
    }
}

exports.deleteTrip = async (req, res) => {
    try {
        const trip = await Trip.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).send({
            messege: "Trip berhasil di hapus"
        })
    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Trip Gagal di hapus"
            }
        })
    }
}

exports.cancelSumCounterQty = async (req, res) => {
    try {

        const total = await Trip.update(req.body, {
            where: {
                id: req.params.idTrip
            }
        });

        const findTrip = await Trip.findOne({
            where: {
                id: req.params.id
            },
            attribute: {
                exclude: ["createdAt", "updatedAt"]
            }
        })

        res.status(200).send({
            messege: "Berhasil",
            data: findTrip
        });


    } catch (error) {
        res.status(500).send({
            error: {
                error
            }
        });
    }
}