FROM node:10.15.0-alpine

RUN npm config set cache /opt/pub/.npm

RUN apk upgrade --update \
    && apk add --no-cache curl yarn git

RUN yarn global add \
    @vue/cli@3.12.1 \
    node-firestore-import-export

ARG WEB_USER_ID=33
ARG WEB_USER_NAME=www-data
RUN echo "Building for web user: id=${WEB_USER_ID} name=${WEB_USER_NAME}"
RUN adduser -D -u ${WEB_USER_ID} ${WEB_USER_NAME} || echo "Users exists"
USER ${WEB_USER_ID}

CMD ["yarn", "serve"]
