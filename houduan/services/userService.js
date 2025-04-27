const { User, VerificationCode } = require("../models");
const { generateVerificationCode } = require("../utils/codeGenerator");
const { sendVerificationEmail } = require("../utils/email");
const { generateToken } = require("../utils/jwt");
const { Op } = require("sequelize");

exports.createUser = async (userData) => {
  return await User.create(userData);
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ where: { email } });
};

exports.findUserByUsername = async (username) => {
  return await User.findOne({ where: { username } });
};

exports.findUserById = async (id) => {
  return await User.findByPk(id);
};

exports.updateUser = async (userId, updates) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("用户不存在");
  return await user.update(updates);
};

exports.generateAndSendVerificationCode = async (userId, email, type) => {
  // 生成6位数验证码
  const code = generateVerificationCode(6);

  // 设置过期时间为10分钟后
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  // 保存验证码到数据库
  await VerificationCode.create({
    code,
    type,
    expiresAt,
    UserId: userId,
  });

  // 发送验证码邮件
  await sendVerificationEmail(email, code, type);

  return true;
};

exports.verifyCode = async (userId, code, type, email) => {
  let query = {
    code,
    type,
    isUsed: false,
    expiresAt: { [Op.gt]: new Date() },
  };

  if (type === "register") {
    // 对于注册类型，不使用email字段查询，因为表中可能没有该字段
    // 注册验证码没有关联用户ID
    query.UserId = null;
  } else {
    // 对于其他类型，通过用户ID查找
    query.UserId = userId;
  }

  const verificationCode = await VerificationCode.findOne({
    where: query,
  });

  if (!verificationCode) {
    return false;
  }

  // 标记验证码为已使用
  await verificationCode.update({ isUsed: true });

  return true;
};

exports.loginUser = async (usernameOrEmail, password) => {
  // 查找用户
  const user = await User.findOne({
    where: {
      [Op.or]: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    },
  });

  if (!user) {
    throw new Error("用户不存在");
  }

  // 验证密码
  const isPasswordValid = await user.validatePassword(password);

  if (!isPasswordValid) {
    throw new Error("密码不正确");
  }

  // 生成JWT令牌
  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    token,
  };
};

exports.resetPassword = async (userId, newPassword) => {
  const user = await User.findByPk(userId);
  if (!user) throw new Error("用户不存在");

  await user.update({ password: newPassword });
  return true;
};

exports.generateAndSendVerificationCodeForRegister = async (email) => {
  // 生成6位数验证码
  const code = generateVerificationCode(6);

  // 设置过期时间为10分钟后
  const expiresAt = new Date();
  expiresAt.setMinutes(expiresAt.getMinutes() + 10);

  // 为注册类型创建验证码记录，不关联用户ID
  await VerificationCode.create({
    code,
    type: "register",
    expiresAt,
    // 移除email字段，因为数据库表中可能没有这个字段
    UserId: null, // 明确设置为null
  });

  // 发送验证码邮件
  await sendVerificationEmail(email, code, "register");

  return true;
};
