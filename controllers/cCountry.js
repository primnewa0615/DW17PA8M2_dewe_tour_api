const { Country } = require("../models");

exports.getCountry = async (req, res) => {
    try {
        const countries = await Country.findAll();
        res.status(200).send({
            messege: "Response success",
            data: { countries }
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            messege: "response error"
        });
    }
}


exports.getDetailCountry = async (req, res) => {
    try {
        const country = await Country.findAll({
            where: {
                id: req.params.id,
            },

            attributes: {
                exclude: ["createdAt", "updatedAt"],
            },
        });

        res.status(200).send({
            messege: "Response Seuccess",
            data: {
                countries,
            },
        });


    } catch (error) {
        res.status(500).send({
            error: {
                messege: "Error",
            },
        });
    }
}


exports.addCountry = async (req, res) => {
    try {
        const country = await Country.create(req.body);
        res.status(200).send({
            messege: "Country berhasil ditambahkan",
            data: {
                id: country.id,
                name: country.name,
            },
        });
    } catch (error) {
        res.status(500).send({
            error: {
                messege: "data Country gagal ditambahkan",
            },
        });
    }
}

exports.editCountry = async (req, res) => {
    try {
        const country = await Country.update(req.body, {
            where: {
                id: req.params.id,
            }
        });

        res.status(200).send({
            messege: `data dengan id ${req.params.id} BERHASIL diupdate`,
            data: {
                id: req.params.id,
                name: req.body.name,
            }
        });
    } catch (error) {
        res.status(500).send({
            messege: `data dengan id ${req.params.id} GAGAL diupdate`,
        });
    }
}
