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
        type: DataTypes.STRING(50),
        unique: true
    },
    // company: {
    //     type: DataTypes.STRING(255)
    // },
    role: {
        type: DataTypes.STRING(50),
        defaultValue: 'user'
    }
})
// UsersModel.sync({ alter: true })
//     .then(() => {
//         console.log("Table created successfully!");
//     })
//     .catch((err) => {
//         console.error("Error creating table:", err);
//     });

// async function removeForeignKeyConstraint() {
//     const queryInterface = connect.getQueryInterface();
//     try {
//         // ลบ foreign key constraint
//         await queryInterface.removeConstraint('users', 'users_studentID_fkey');
//         console.log("ลบ foreign key constraint เรียบร้อยแล้ว");
//     } catch (err) {
//         console.error("Error removing foreign key constraint:", err);
//     }
// }

// async function updateUsersTable() {
//     try {
//         // อัพเดตตาราง
//         await UsersModel.sync({ alter: true });
//         console.log("อัพเดตตาราง users เรียบร้อยแล้ว");
//     } catch (err) {
//         console.error("Error updating table:", err);
//     }
// }

// // เรียกใช้ฟังก์ชันตามลำดับ
// (async () => {
//     await removeForeignKeyConstraint();
//     await updateUsersTable();
// })();


module.exports = UsersModel;


