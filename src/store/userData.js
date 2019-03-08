import Vue from 'vue';

const defaultUserData = {
    articles: {},
    words: {},
};

export default {
    state: {
        userData: defaultUserData,
    },
    actions: {
        loadUserData({ commit }, userId) {
            commit('setProcessing', true);

            let userDataRef = Vue.$db.collection('userData').doc(userId);
            userDataRef.get()
                .then((data) => {
                    let userData = data.exists ? data.data() : defaultUserData;

                    if (!userData.articles) {
                        userData.articles = {};
                    }

                    commit('setUserData', userData);
                })
                .catch(e => window.console.error(e));

            commit('setProcessing', false);
        },
        addUserArticle({ commit, getters }, articleId) {
            commit('setProcessing', true);

            const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
            const article = {
                addedAt: new Date(),
                parts: {},
            };

            userDataRef.set({
                articles: {
                    [articleId]: article,
                }
            }, { merge: true })
                .then(() => commit('addUserArticle', { articleId, article }))
                .catch(e => window.console.error(e));

            commit('setProcessing', false);
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
        finishUserArticlePart({ commit, getters }, { articleId, partId, rating }) {
            commit('setProcessing', true);

            const userDataRef = Vue.$db.collection('userData').doc(getters.userId);
            const timestamp = new Date();

            userDataRef.update({
                [`articles.${articleId}.parts.${partId}.finishedAt`]: timestamp,
                [`articles.${articleId}.parts.${partId}.rating`]: rating,
            })
                .then(() => commit('finishUserArticlePart', { articleId, partId, timestamp, rating }))
                .catch(e => window.console.error(e));

            commit('setProcessing', false);
        }
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
        openUserArticlePart(state, { articleId, partId, timestamp }) {
            Vue.set(state.userData.articles[articleId].parts[partId], 'lastOpenedAt', timestamp);
        },
        finishUserArticlePart(state, { articleId, partId, timestamp, rating }) {
            Vue.set(state.userData.articles[articleId].parts[partId], 'finishedAt', timestamp);
            Vue.set(state.userData.articles[articleId].parts[partId], 'rating', rating);
        },
    },
    getters: {
        userData: state => state.userData,
    },
};
