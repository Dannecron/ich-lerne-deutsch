export default {
    state: {
        articles: [
            {
                id: 'sgjngsnaada312',
                title: 'Harry Potter und Stein der Weisen - 1',
                description: 'Первая глава первой книги о Гарри Поттере',
                imageId: 'asfgdfhmfgn131',
                level: ['B2', 'C1'],
                rating: 4,
                ratingsCount: 164,
                youtubePlaylistId: 'asdadsadad',
                parts: [
                    {
                        id: 'asdasdad123',
                        title: 'kapitel 1',
                        youtubeId: 'asdasdad1',
                    },
                    {
                        id: 'asdasdad124',
                        title: 'kapitel 2',
                        youtubeId: 'asdasdad2',
                    },
                    {
                        id: 'asdasdad125',
                        title: 'kapitel 3',
                        youtubeId: 'asdasdad3',
                    },
                    {
                        id: 'asdasdad126',
                        title: 'kapitel 4',
                        youtubeId: 'asdasdad4',
                    },
                ],
            },
            {
                id: 'sgjngsnaadasd2',
                title: 'Harry Potter und Stein der Weisen - 2',
                description: 'Вторая глава первой книги о Гарри Поттере',
                imageId: 'asfgdf111hmfgn131',
                level: ['B1', 'B2'],
                rating: 3.5,
                ratingsCount: 55,
                youtubePlaylistId: 'asdadsadad234234',
                parts: [
                    {
                        id: 'bsdasdad123',
                        title: 'kapitel 1',
                        youtubeId: 'bsdasdad1',
                    },
                    {
                        id: 'bsdasdad124',
                        title: 'kapitel 2',
                        youtubeId: 'bsdasdad2',
                    },
                    {
                        id: 'bsdasdad125',
                        title: 'kapitel 3',
                        youtubeId: 'bsdasdad3',
                    },
                ],
            },
            {
                id: 'sgjngsdbfd12as',
                title: 'Harry Potter und Stein der Weisen - 3',
                description: 'Третья глава первой книги о Гарри Поттере',
                imageId: 'asfgdfhmfgn13111',
                level: ['A2'],
                rating: 2,
                ratingsCount: 80,
                youtubePlaylistId: 'asdadsada435346',
                parts: [
                    {
                        id: 'bsdasdad123',
                        title: 'kapitel 1',
                        youtubeId: 'bsdasdad1',
                    },
                    {
                        id: 'bsdasdad124',
                        title: 'kapitel 2',
                        youtubeId: 'bsdasdad2',
                    },
                    {
                        id: 'bsdasdad125',
                        title: 'kapitel 3',
                        youtubeId: 'bsdasdad3',
                    },
                ],
            },
        ],

        articleParts: [
            {
                articleId: 'sgjngsnaada312',
                articlePartId: 'asdasdad123',
                articleTitle: 'Harry Potter und Stein der Weisen - 1',
                partTitle: 'kapitel 1',
                youtubeId: 'asdasdad1',
                content: [
                    {
                        sentences: [
                            {
                                origText: 'Bla',
                                transText: 'Бла',
                            },
                        ]
                    }
                ],
                words: [
                    {
                        origWord: 'Hallo',
                        transWord: 'Привет',
                    },
                ],
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
        getParts: state => state.articleParts,
    },
};
