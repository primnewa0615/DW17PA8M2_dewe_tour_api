'use strict';
module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.createTable('Trips', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            title: {
                type: Sequelize.STRING
            },
            idCountry: {
                allowNull: false,
                references: {
                    model: "Countries",
                    key: "id"
                },
                onDelete: "cascade",
                onDelete: "cascade",
                type: Sequelize.INTEGER
            },
            accomodation: {
                type: Sequelize.STRING
            },
            transportation: {
                type: Sequelize.STRING
            },
            eat: {
                type: Sequelize.STRING
            },
            day: {
                type: Sequelize.INTEGER
            },
            night: {
                type: Sequelize.INTEGER
            },
            dateTrip: {
                type: Sequelize.DATE
            },
            price: {
                type: Sequelize.INTEGER
            },
            quota: {
                type: Sequelize.INTEGER
            },
            description: {
                type: Sequelize.STRING
            },
            image1: {
                type: Sequelize.STRING
            },
            image2: {
                type: Sequelize.STRING
            },
            image3: {
                type: Sequelize.STRING
            },
            image4: {
                type: Sequelize.STRING
            },
            totalCounterQty: {
                type: Sequelize.INTEGER
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    down: async (queryInterface, Sequelize) => {
        await queryInterface.dropTable('Trips');
    }
};

