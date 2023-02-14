FROM node:16.16.0-alpine

# Set working directory
WORKDIR /usr/app

# Install PM2 globally
#RUN npm install --global pm2

# Copy "package.json" and "package-lock.json" before other files
# Utilise Docker cache to save re-installing dependencies if unchanged
COPY ./package*.json ./

# Install dependencies
RUN yarn install --production --frozen-lockfile

# Copy all files
COPY ./ ./

## eslint
# RUN npm run lint

# Build app on SSR mode
RUN yarn build:ssr

# On distributables folder install dependencies and boots up the webserver and starts listening for connections
WORKDIR /usr/app/dist/ssr
RUN yarn install

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image
# USER node

# Launch app with PM2
# CMD [ "pm2-runtime", "start", "npm", "--", "start" ]
#CMD [ "pm2-runtime", "start", "/usr/app/dist/ssr/index.js", "--", "start" ]
CMD ["node", "/usr/app/dist/ssr/index.js"]

## stage1 as builder
#FROM node:16.13.2-alpine as builder
#
## Set working directory
#WORKDIR /usr/app
#
## Install PM2 globally
#RUN npm install --global pm2
#
## Copy "package.json" and "package-lock.json" before other files
## Utilise Docker cache to save re-installing dependencies if unchanged
#COPY package*.json ./
#
## Install dependencies
#RUN npm ci
#
## Copy all files
#COPY ./ ./
#
## eslint
## RUN npm run lint
#
## Build the project
#RUN npm run build:ssr
#
## Run container as non-root (unprivileged) user
## The "node" user is provided in the Node.js Alpine base image
## USER node
#
## Launch app with PM2
#CMD [ "pm2-runtime", "start", "/usr/app/dist/ssr/index.js", "--", "start" ]
## CMD ["node", "/usr/app/dist/ssr/index.js"]
#
#
#FROM nginx:stable-alpine as production-build
#COPY ./nginx.conf /etc/nginx/nginx.conf
#
## Remove default nginx index page
#RUN rm -rf /usr/share/nginx/html/*
#
## Copy from the stahg 1
#COPY --from=builder /usr/app/dist/ssr /usr/share/nginx/html
#
## Show current folder structure in logs
## RUN ls -al -TestComponent1Widget
#RUN ls /usr/share/nginx/html
#
## Expose the listening port
#EXPOSE 3000
#
#ENTRYPOINT ["nginx", "-g", "daemon off;"]
