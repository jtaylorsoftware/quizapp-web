FROM node:16.13 AS base

WORKDIR /usr/local/src/quizapp

# Install deps
COPY package*.json ./
RUN npm ci

# Copy source
COPY public public
COPY src src
COPY tsconfig.json .

FROM base AS dev

ENV REACT_APP_API_HOST="http://localhost:8080/api/v2"
ENTRYPOINT ["npm", "start"]

FROM base AS test

COPY jest.config.js .
ENV CI=true
ENTRYPOINT ["npm", "test"]

FROM base AS build

ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV REACT_APP_API_HOST="http://www.makequizzes.online/api/v2"
RUN SKIP_PREFLIGHT_CHECK=true npm run build

FROM nginx:1.21.6 AS prod
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf /usr/share/nginx/html
COPY --from=build /usr/local/src/quizapp/build /usr/share/nginx/html