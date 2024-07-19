const connect = require('../connect');
const { DataTypes } = require("sequelize");

const DataEvaluation = connect.define("dataevaluation", {
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
    phoneNumber: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    additionalComments: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    innovationAlignment: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    learningPlan: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    innovativeLearningPlan: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    joyfulLearningActivities: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    learnerWellbeingActivities: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    individualStudentDevelopment: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    systematicQualityReporting: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    studentProblemResearch: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    digitalLearningTools: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    collaborativeCreativity: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
    professionalGrowthActivities: {
        type: DataTypes.STRING(255),
        // allowNull: false,
    },
},);

// DataEvaluation.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

module.exports = DataEvaluation;
