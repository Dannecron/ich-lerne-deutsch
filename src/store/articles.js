export default {
    state: {
        articles: [
            {
                id: 'sgjngsnaada312',
                title: 'Harry Potter und Stein der Weisen - 1',
                description: 'Первая глава первой книги о Гарри Поттере',
                imageId: 'asfgdfhmfgn131',
                parts: 7,
                level: ['B2', 'C1'],
                rating: 4,
                ratingsCount: 164,
                youtubePlaylistId: 'asdadsadad',
            },
            {
                id: 'sgjngsnaadasd2',
                title: 'Harry Potter und Stein der Weisen - 2',
                description: 'Вторая глава первой книги о Гарри Поттере',
                imageId: 'asfgdf111hmfgn131',
                parts: 7,
                level: ['B1', 'B2'],
                rating: 3.5,
                ratingsCount: 55,
                youtubePlaylistId: 'asdadsadad234234',
            },
            {
                id: 'sgjngsdbfd12as',
                title: 'Harry Potter und Stein der Weisen - 3',
                description: 'Третья глава первой книги о Гарри Поттере',
                imageId: 'asfgdfhmfgn13111',
                parts: 7,
                level: ['A2'],
                rating: 2,
                ratingsCount: 80,
                youtubePlaylistId: 'asdadsada435346',
            },
        ],
    },
    mutations: {
        setArticles(state, payload) {
            state.articles = payload;
        },
    },
    getters: {
        getArticles: state => state.articles,
    },
};
