FROM node:16.16.0-alpine AS prebuild

# Set working directory
WORKDIR /var/www/app

COPY ./package*.json ./

# Install dependencies
RUN yarn install --production --frozen-lockfile


ARG ALAA_API_V2_SERVER=https://alaatv.com/api/v2
ARG ALAA_API_V1_SERVER=https://alaatv.com/api/v1
ARG ALAA_WEB_SERVER=https://alaatv.com
ARG ALAA_MINIO_SERVER=https://stage-minio.alaatv.com
ARG VUEX_PERSISTED_STATE_KEY=vuex
ARG GET_TIME_SERVER=/time
ARG ALAA_API_V1=/alaa/api/v1
ARG ALAA_API_V2=/alaa/api/v2
ARG ALAA_WEB=/alaa
ARG ALAA_MINIO=/minio
ARG NGINX_PORT=8081
ARG SSR_PORT=3000
ARG GOOGLE_TAG_MANAGER_TOKEN=GTM-PNP8RDW
ARG RAYCHAT_TOKEN=901122c0-5c9d-4279-800d-4902cac2ebb8
ARG HEAP_MEMORY_ALLOCATION_INTERVAL=10000
ARG MAX_HEAP_MEMORY_ALLOCATION_IN_PERCENT=70
ARG LOG_REQUEST=true
ARG NODES_SERVER_URL_SSL
ENV NODES_SERVER_URL_SSL=$NODES_SERVER_URL_SSL
ARG ASSET_SERVE
ARG VITE_APP_DOMAIN=alaatv.com
ARG SENTRY_DSN
ARG SENTRY_TRACES_SAMPLE_RATE
ARG SENTRY_REPLAYS_SESSION_SAMPLE_RATE
ARG SENTRY_REPLAYS_ON_ERROR_SAMPLE_RATE
ARG SENTRY_ORG
ARG SENTRY_PROJECT
ARG SENTRY_AUTH_TOKEN

# Copy all files
COPY ./ ./

#Run prebuild script to inject env variable from server ( pipline env ) to client (custom-service-worker.js)
RUN yarn prebuild

# Build app on SSR mode
RUN yarn build:ssr


##############################################


FROM node:16.16.0-alpine
COPY --from=prebuild /var/www/app/dist/ssr /var/www/app/dist/ssr
#Why we simply don't copy node_module to new docker image so we can remove yar install
COPY --from=prebuild /var/www/app/node_modules /var/www/app/dist/ssr/node_modules
WORKDIR /var/www/app/dist/ssr

#RUN yarn install

# Expose the listening port
EXPOSE 3000

# Run container as non-root (unprivileged) user
# The "node" user is provided in the Node.js Alpine base image

USER node

CMD ["node", "/var/www/app/dist/ssr/index.js"]
