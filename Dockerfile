FROM node:19-alpine3.16 as build

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --frozen-lockfile

COPY . .

RUN yarn build

# 第二阶段：生产环境镜像
FROM node:19-alpine3.16

WORKDIR /app

# 只复制必需的文件，减小镜像大小
COPY --from=build /app/package.json /app/yarn.lock /app/vite.config.ts ./

RUN yarn install --frozen-lockfile --production=true && \
    yarn cache clean

COPY --from=build /app/dist /app/dist

# 暴露容器的端口
EXPOSE 3000

# 启动应用程序
CMD ["npm", "start"]