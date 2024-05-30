// const connect = require('../connect')
// const UsersModel = require("./Users")
// const CompaniesModel = require("./Companies")

// UsersModel.belongsTo(CompaniesModel, {
//     foreignKey: 'companyId'
// })

// CompaniesModel.hasMany(UsersModel, {
//     foreignKey: 'companyId'
// })

// ซิงโครไนซ์ทั้งสอง model
// connect.sync({ alter: true })
//   .then(() => {
//     console.log("Tables created successfully!");
//   })
//   .catch((err) => {
//     console.error("Error creating tables:", err);
//   });

// module.exports = {
//     UsersModel,
//     CompaniesModel
// }
const UsersModel = require('./Users');
const CompaniesModel = require('./Companies');

UsersModel.belongsTo(CompaniesModel, { foreignKey: 'studentID', targetKey: 'studentID', as: 'companyDetails' });

module.exports = { UsersModel, CompaniesModel };