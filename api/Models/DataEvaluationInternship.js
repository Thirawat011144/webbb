const connect = require('../connect');
const { DataTypes } = require("sequelize");

const dataEvaluationInternship = connect.define("dataEvaluationInternship", {
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
    criteria: {
        type: DataTypes.STRING,
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
    strength: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    improvement: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    jobOffer: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    other: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    qualityOfWork: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    generalKnowledge: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    specificKnowledge: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    responsibility: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    teamResponsibility: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    conduct: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    problemSolving: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    totalScore: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    averageScore: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
      problemSolving: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    phoneNumber: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
    idCard: {
        type: DataTypes.STRING(255),
        allowNull: false,
    },
},);

// dataEvaluationInternship.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = dataEvaluationInternship;
