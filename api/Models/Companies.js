const connect = require('../connect')
const { DataTypes } = require("sequelize")

const CompaniesModel = connect.define("companies", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    companyName: {
        type: DataTypes.STRING(255),
    },
    companyType: {
        type: DataTypes.STRING(255),
    },
    companyPhone: {
        type: DataTypes.STRING(255),
    },
    companyAddress: {
        type: DataTypes.STRING(500),
    },
    companyEmail: {
        type: DataTypes.STRING(255),
    },
    studentID: {
        type: DataTypes.STRING(50),
        unique: true
    }
})

// CompaniesModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!")
//     }).catch((error) => {
//         console.log("Error creating table:", error)
//     })

module.exports = CompaniesModel;