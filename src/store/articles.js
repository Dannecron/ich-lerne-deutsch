import Vue from 'vue';

export default {
    state: {
        articles: [],
    },
    actions: {
        loadArticles({ commit }) {
            Vue.$db.collection('articles')
                .get()
                .then((querySnapshot) => {
                    const articles = querySnapshot.docs.map((articleSnap) => {
                        const data = articleSnap.data();
                        const { parts } = data;
                        return {
                            id: articleSnap.id,
                            title: data.title,
                            description: data.description,
                            imageUrl: data.imageUrl,
                            level: data.level.slice(),
                            youtubePlaylistId: data.youtubePlaylistId,
                            parts: parts ? parts.map(part => Object.assign({}, part)) : [],
                        };
                    });

                    commit('setArticles', articles);
                })
                .catch(e => console.error(e));
        },
    },
    getters: {
        getArticles: state => state.articles,
    },
    mutations: {
        setArticles(state, payload) {
            state.articles = payload;
        },
    },
};
