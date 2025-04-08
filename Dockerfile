# 使用官方的 Node.js 镜像作为基础镜像
FROM node:16 AS build

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm install

# 复制项目的所有文件到工作目录
COPY . .

# 构建项目
RUN npm run build

# 使用 Nginx 镜像来部署前端文件
FROM nginx:alpine

# 将构建好的文件拷贝到 Nginx 的静态文件目录
COPY --from=build /app/dist /usr/share/nginx/html

# 暴露 8088 端口
EXPOSE 8088

# 启动 Nginx 服务
CMD ["nginx", "-g", "daemon off;"]
