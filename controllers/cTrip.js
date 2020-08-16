const { Trip, Country } = require("../models");

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

exports.getDetailTrip = async (req, res) => {
    try {
        const detailTrip = await Trip.findAll({
            where: {
                id: req.params.id
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
                messege: "Data Trip gagal ditambahkan"
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