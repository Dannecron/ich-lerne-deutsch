import Vue from 'vue';
import firebase from 'firebase/app';
import 'firebase/firestore';

import { EventBus, EVENTS } from '@/utils';

const defaultUserData = {
    articles: {},
    words: {},
};

export default {
    state: {
        userData: defaultUserData,
    },
    actions: {
        async loadUserData({ commit }, userId) {
            await commit('setProcessing', true);

            let userDataRef = Vue.$db.collection('userData').doc(userId);
            await userDataRef.get()
                .then((data) => {
                    let userData = data.exists ? data.data() : defaultUserData;

                    if (!userData.articles) {
                        userData.articles = {};
                    }

                    if (!userData.words) {
                        userData.words = {};
                    }

                    commit('setUserData', userData);
                })
                .catch(e => window.console.error(e));

            await EventBus.notify(EVENTS.USER.DATA_LOADED);
            await commit('setProcessing', false);
        },
        async addUserArticle({ commit, getters }, articleId) {
            await commit('setProcessing', true);

            const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
            const article = {
                addedAt: new Date(),
                parts: {},
            };

            await userDataRef.set({
                articles: {
                    [articleId]: article,
                },
            }, { merge: true })
                .then(() => commit('addUserArticle', { articleId, article }))
                .catch(e => window.console.error(e));

            await commit('setProcessing', false);
        },
        async addUserWord({ commit, getters }, wordEntity) {
            await commit('setProcessing', true);
            
            const { key, ...wordEntityData } = wordEntity;

            const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
            const word = Object.assign({}, wordEntityData, {
                addedAt: new Date(),
                // about this {@see https://en.wikipedia.org/wiki/Leitner_system}
                bucket: 1,
                nextShowDate: new Date(),
            });

            await userDataRef.set({
                words: {
                    [key]: word,
                },
            }, { merge: true })
                .then(() => commit('addUserWord', { wordKey: key, word }))
                .catch(e => window.console.error(e));

            await commit('setProcessing', false);
        },
        async finishUserArticlePart({ commit, getters }, { articleId, partId, rating }) {
            await commit('setProcessing', true);

            const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
            const timestamp = new Date();

            await userDataRef.update({
                [`articles.${articleId}.parts.${partId}.finishedAt`]: timestamp,
                [`articles.${articleId}.parts.${partId}.rating`]: rating,
            })
                .then(() => commit('finishUserArticlePart', { articleId, partId, timestamp, rating }))
                .catch(e => window.console.error(e));

            await commit('setProcessing', false);
        },
        updateUserArticlePartStats({ commit, getters }, { articleId, partId }) {
            const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
            const timestamp = new Date();
            const articles = getters.userData.articles;

            if (!articles.hasOwnProperty(articleId) || !articles[articleId].parts.hasOwnProperty(partId)) {
                userDataRef.update({
                    [`articles.${articleId}.parts.${partId}.addedAt`]: timestamp,
                })
                    .then(() => commit('addUserArticlePart', { articleId, partId, timestamp }))
                    .catch(e => window.console.error(e));
            }

            userDataRef.update({
                [`articles.${articleId}.parts.${partId}.lastOpenedAt`]: timestamp,
            })
                .then(() => commit('openUserArticlePart', { articleId, partId, timestamp }))
                .catch(e => window.console.error(e));
        },
        processUserLearnWord({ commit, getters }, wordKey) {
            const word = getters.userData.words[wordKey];

            const userDataRef = Vue.$db.collection('userData').doc(getters.userId);

            if (word.bucket === 5) {
                return userDataRef.update({
                    [`words.${wordKey}`]: firebase.firestore.FieldValue.delete(),
                })
                    .then(() => commit('removeUserWord', wordKey))
                    .then(() => EventBus.notify(EVENTS.USER.WORD_UPDATED, { wordKey }));
            }

            let nextShowDate = new Date();
            nextShowDate.setDate((new Date().getDate() + word.bucket * 2));
            word.nextShowDate = nextShowDate;
            word.bucket = word.bucket + 1;

            userDataRef.set({
                words: {
                    [wordKey]: word,
                },
            }, { merge: true })
                .then(() => commit('updateUserWord', { word, wordKey }))
                .then(() => EventBus.notify(EVENTS.USER.WORD_UPDATED, { wordKey }));

        },
    },
    mutations: {
        setUserData(state, payload) {
            Vue.set(state, 'userData', payload);
        },
        addUserArticle(state, { articleId, article }) {
            Vue.set(state.userData.articles, articleId, article);
        },
        addUserArticlePart(state, { articleId, partId, timestamp }) {
            if (state.userData.articles[articleId].parts[partId]) {
                Vue.set(state.userData.articles[articleId].parts[partId], 'addedAt', timestamp);
                return;
            }

            Vue.set(state.userData.articles[articleId].parts, partId, { addedAt: timestamp });
        },
        addUserWord(state, { wordKey, word }) {
            Vue.set(state.userData.words, wordKey, word);
        },
        openUserArticlePart(state, { articleId, partId, timestamp }) {
            Vue.set(state.userData.articles[articleId].parts[partId], 'lastOpenedAt', timestamp);
        },
        finishUserArticlePart(state, { articleId, partId, timestamp, rating }) {
            Vue.set(state.userData.articles[articleId].parts[partId], 'finishedAt', timestamp);
            Vue.set(state.userData.articles[articleId].parts[partId], 'rating', rating);
        },
        removeUserWord(state, wordKey) {
            Vue.delete(state.userData.words, wordKey);
        },
        updateUserWord(state, { word, wordKey }) {
            Vue.set(state.userData.words, wordKey, word);
        },
    },
    getters: {
        userData: state => state.userData,
    },
};
