# build environment
FROM node:12.16.3 as builder

ARG LUMIN_GRAPHQL_API
ARG LUMIN_NODE_ENV
ARG LUMIN_ESLINT_NO_DEV_ERRORS
ARG LUMIN_BUILD_NUMBER
ARG LUMIN_GOOGLE_CLIENT_ID
ARG LUMIN_FACEBOOK_CLIENT_ID
ARG LUMIN_WS_URL
ARG LUMIN_JIRA_API_ID
ARG LUMIN_REDIRECT_URI

WORKDIR /usr/src/app

COPY package*.json ./

ENV PATH /usr/src/app/node_modules/.bin:$PATH

RUN npm install

COPY . .
RUN npm run build

# production environment
FROM nginx:1.14-alpine
COPY --from=builder /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
