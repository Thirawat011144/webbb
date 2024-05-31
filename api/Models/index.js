const UsersModel = require('./Users');
const CompaniesModel = require('./Companies');

// กำหนดความสัมพันธ์
UsersModel.hasOne(CompaniesModel, { foreignKey: 'studentID', sourceKey: 'studentID', as: 'companyDetails' });
CompaniesModel.belongsTo(UsersModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'userDetails' });

async function syncModels() {
    try {
        await UsersModel.sync({ alter: true });
        await CompaniesModel.sync({ alter: true });
        console.log("Tables created successfully!");
    } catch (error) {
        console.error("Error creating tables:", error);
    }
}

syncModels();

module.exports = { UsersModel, CompaniesModel };
