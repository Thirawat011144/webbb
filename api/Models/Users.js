const connect = require('../connect')
const { DataTypes } = require("sequelize")

const UsersModel = connect.define("users", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    firstName: {
        type: DataTypes.STRING(50),
    },
    lastName: {
        type: DataTypes.STRING(50),
    },
    userName: {
        type: DataTypes.STRING(50)
    },
    password: {
        type: DataTypes.STRING(255),
    },
    phoneNumber: {
        type: DataTypes.STRING(50),
    },
    gender: {
        type: DataTypes.STRING(50)
    },
    year: {
        type: DataTypes.STRING(50)
    },
    branch: {
        type: DataTypes.STRING(50)
    },
    status: {
        type: DataTypes.STRING(50)
    },
    studentID: {
        type: DataTypes.STRING(50)
    },
    company: {
        type: DataTypes.STRING(255)
    },
    role: {
        type: DataTypes.STRING(50),
        defaultValue: 'user'
    }
})
// UsersModel.sync({ alter: true })
//   .then(() => {
//     console.log("Table created successfully!");
//   })
//   .catch((err) => {
//     console.error("Error creating table:", err);
//   });


module.exports = UsersModel;


