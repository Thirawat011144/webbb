const connect = require('../connect')
const { DataTypes } = require("sequelize")

const NewsModel = connect.define("news", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    title: {
        type: DataTypes.STRING(255),
    },
    detail: {
        type: DataTypes.STRING(255)
    }
})

// NewsModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = NewsModel;