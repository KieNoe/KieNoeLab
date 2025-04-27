module.exports = (sequelize, DataTypes) => {
  const VerificationCode = sequelize.define('VerificationCode', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('register', 'password_reset', 'email_change'),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true  // 允许为空，因为非注册类型可能不需要
      // 已移除 isEmail 验证器
    },
    expiresAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    isUsed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return VerificationCode;
};