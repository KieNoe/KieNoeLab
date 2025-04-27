const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const userRoutes = require("./routes/userRoutes");
const https = require("https");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use("/api/users", userRoutes);

// 错误处理
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "服务器内部错误", error: err.message });
});

// 读取证书文件
const options = {
  key: fs.readFileSync("SSL-keyspems/privkey.key"),
  cert: fs.readFileSync("SSL-keyspems/fullchain.pem"),
};

// 启动服务器
sequelize
  .sync({ force: false })
  .then(() => {
    https.createServer(options, app).listen(PORT, "0.0.0.0", () => {
      console.log(`HTTPS 服务器运行在 https://0.0.0.0:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("数据库连接失败:", err);
  });

module.exports = app;
