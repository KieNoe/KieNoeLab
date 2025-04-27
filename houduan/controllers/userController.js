const { Op } = require('sequelize');
const userService = require('../services/userService');

exports.register = async (req, res) => {
  try {
    const { username, email, password, verificationCode } = req.body;
    
    // 检查用户名和邮箱是否已存在
    const existingUser = await userService.findUserByUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: '用户名已存在' });
    }
    
    const existingEmail = await userService.findUserByEmail(email);
    if (existingEmail) {
      return res.status(400).json({ message: '邮箱已被注册' });
    }
    
    // 创建新用户
    const user = await userService.createUser({ username, email, password });
    
    // 生成JWT令牌
    const { token } = await userService.loginUser(email, password);
    
    res.status(201).json({
      message: '注册成功',
      user: {
        id: user.id,
        username: user.username,
        email: user.email
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: '注册失败', error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    
    const result = await userService.loginUser(usernameOrEmail, password);
    
    res.status(200).json({
      message: '登录成功',
      user: result.user,
      token: result.token
    });
  } catch (error) {
    res.status(401).json({ message: '登录失败', error: error.message });
  }
};

exports.sendVerificationCode = async (req, res) => {
  try {
    const { email, type } = req.body;
    
    // 根据验证码类型处理
    switch (type) {
      case 'register':
        // 检查邮箱是否已被注册
        const existingUser = await userService.findUserByEmail(email);
        if (existingUser) {
          return res.status(400).json({ message: '邮箱已被注册' });
        }
        
        // 对于注册类型，不需要关联用户ID
        await userService.generateAndSendVerificationCodeForRegister(email);
        break;
        
      case 'password_reset':
        // 检查邮箱是否存在
        const user = await userService.findUserByEmail(email);
        if (!user) {
          return res.status(404).json({ message: '邮箱未注册' });
        }
        
        // 发送重置密码验证码
        await userService.generateAndSendVerificationCode(user.id, email, type);
        break;
        
      case 'email_change':
        // 需要用户已登录
        if (!req.user) {
          return res.status(401).json({ message: '需要登录' });
        }
        
        // 发送修改邮箱验证码
        await userService.generateAndSendVerificationCode(req.user.id, email, type);
        break;
        
      default:
        return res.status(400).json({ message: '无效的验证码类型' });
    }
    
    res.status(200).json({ message: '验证码已发送' });
  } catch (error) {
    console.error('发送验证码失败:', error);
    res.status(500).json({ message: '发送验证码失败', error: error.message });
  }
};

exports.verifyCode = async (req, res) => {
  try {
    const { email, code, type } = req.body;
    
    let user;
    
    // 根据验证码类型处理
    switch (type) {
      case 'register':
      case 'password_reset':
        user = await userService.findUserByEmail(email);
        if (!user) {
          return res.status(404).json({ message: '邮箱未注册' });
        }
        break;
        
      case 'email_change':
        if (!req.user) {
          return res.status(401).json({ message: '需要登录' });
        }
        user = req.user;
        break;
        
      default:
        return res.status(400).json({ message: '无效的验证码类型' });
    }
    
    // 验证验证码
    const isValid = await userService.verifyCode(user.id, code, type);
    
    if (!isValid) {
      return res.status(400).json({ message: '验证码无效或已过期' });
    }
    
    res.status(200).json({ message: '验证成功' });
  } catch (error) {
    res.status(500).json({ message: '验证失败', error: error.message });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;
    
    // 查找用户
    const user = await userService.findUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: '邮箱未注册' });
    }
    
    // 验证验证码
    const isValid = await userService.verifyCode(user.id, code, 'password_reset');
    
    if (!isValid) {
      return res.status(400).json({ message: '验证码无效或已过期' });
    }
    
    // 重置密码
    await userService.resetPassword(user.id, newPassword);
    
    res.status(200).json({ message: '密码重置成功' });
  } catch (error) {
    res.status(500).json({ message: '密码重置失败', error: error.message });
  }
};

exports.changeEmail = async (req, res) => {
  try {
    const { newEmail, code } = req.body;
    
    // 检查用户是否已登录
    if (!req.user) {
      return res.status(401).json({ message: '需要登录' });
    }
    
    // 检查新邮箱是否已被注册
    const existingEmail = await userService.findUserByEmail(newEmail);
    if (existingEmail) {
      return res.status(400).json({ message: '邮箱已被注册' });
    }
    
    // 验证验证码
    const isValid = await userService.verifyCode(req.user.id, code, 'email_change');
    
    if (!isValid) {
      return res.status(400).json({ message: '验证码无效或已过期' });
    }
    
    // 更新邮箱
    await userService.updateUser(req.user.id, { email: newEmail });
    
    res.status(200).json({ message: '邮箱修改成功' });
  } catch (error) {
    res.status(500).json({ message: '邮箱修改失败', error: error.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    // 检查用户是否已登录
    if (!req.user) {
      return res.status(401).json({ message: '需要登录' });
    }
    
    res.status(200).json({
      user: {
        id: req.user.id,
        username: req.user.username,
        email: req.user.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: '获取用户信息失败', error: error.message });
  }
};