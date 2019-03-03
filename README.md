# Ich Lerne Deutsch

## Project info

This is project based on [tproger course](https://tproger.ru/video/building-vuejs-app/) to learn [vue](https://vuejs.org/),
[vuex](https://vuex.vuejs.org/) and how to work with [firebase](https://firebase.google.com/).

## Project setup
1. copy `src/config/firebase.example.js` to `src/config/firebase.js` and replace content with real firebase config.
2. run command
```
yarn install
```

### Importing data to firestore
To achieve this goal we use [node-firestore-import-export library](https://www.npmjs.com/package/node-firestore-import-export).
1. Create `docker-compose.override.yml` and add this content to it
```
version: '3'

services: 
  app:
    volumes:
      - ~/path/to/firebase/credentials.json:/var/www/credentials.json
    environment: 
      - GOOGLE_APPLICATION_CREDENTIALS=/var/www/cred.json
```
1. Run `docker-compose exec app firestore-import --yes --backupFile /var/www/vue/data/back-up.json`

### Compiles and hot-reloads for development
```
yarn run serve
```
