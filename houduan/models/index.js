const { Sequelize } = require('sequelize');
const config = require('../config/config').development;

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false
  }
);

const db = {
  sequelize,
  Sequelize,
  User: require('./user')(sequelize, Sequelize),
  VerificationCode: require('./verificationCode')(sequelize, Sequelize)
};

// 设置模型关联
db.User.hasMany(db.VerificationCode);
db.VerificationCode.belongsTo(db.User);

module.exports = db;