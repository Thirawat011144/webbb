const connect = require('../connect');
const { DataTypes } = require("sequelize");

const dataEvaluationInternshipForUniversity = connect.define("dataEvaluationInternshipForUniversity", {
    id: {
        type: DataTypes.BIGINT,
        primaryKey: true,
        autoIncrement: true,
    },
    evaluatorName: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    studentId: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    time: {
        type: DataTypes.STRING(50),
        allowNull: false,
    },
    evaluatorStatus: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    criteria: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    hrGuidance: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    employeeSupport: {
        type: DataTypes.STRING,
        allowNull: false,
    },
},);

// dataEvaluationInternshipForUniversity.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = dataEvaluationInternshipForUniversity;
