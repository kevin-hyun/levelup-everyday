# # Step 1
# ## base image for Step 1: Node 10
# FROM node:12 AS builder
# WORKDIR /app
# ## 프로젝트의 모든 파일을 WORKDIR(/app)로 복사한다
# COPY . .
# ## Nest.js project를 build 한다
# RUN npm install
# RUN npm run build


# # Step 2
# ## base image for Step 2: Node 10-alpine(light weight)
# FROM node:12-alpine
# WORKDIR /app
# ## Step 1의 builder에서 build된 프로젝트를 가져온다
# COPY --from=builder /app ./

# ## application 실행
# CMD ["npm", "run", "start:prod"]

FROM node:12-alpine
ARG NODE_ENV=staging
WORKDIR /app
COPY . .
RUN npm install --silent
RUN npm run build
EXPOSE 5000
CMD ["node", "dist/main"]