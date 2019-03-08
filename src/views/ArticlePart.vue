<template>
    <v-container grid-list-md v-if="part">
        <v-layout row wrap>
            <v-flex v-if="finishedAt" xs12 sm10 offset-sm1>
                <v-card>
                    <v-img src="https://img.icons8.com/nolan/64/000000/inspection.png"
                        max-width="100px"
                    >
                    </v-img>
                    <v-card-title primary-title>
                        <div class="headline">Чтение этой части завершено {{ finishedAt | formattedDate }}</div>
                    </v-card-title>
                    <v-card-actions>
                        <span>Оценка</span>
                        <v-rating v-model="storedRating" color="success" half-increments readonly large></v-rating>
                    </v-card-actions>
                </v-card>
            </v-flex>
            <v-flex xs12 sm10 offset-sm1>
                <book-part-content :part="part"></book-part-content>
            </v-flex>

            <v-flex xs12 sm10 offset-sm1>
                <book-part-words :words="part.words"></book-part-words>
            </v-flex>

            <v-flex xs12 sm10 offset-sm1 class="text-xs-center">
                <v-dialog v-model="finishDialog" persistent max-width="600px">
                    <v-btn v-if="!finishedAt" slot="activator" color="success" dark @click.stop="finishDialog = true">
                        <v-icon>check</v-icon> Завершить
                    </v-btn>
                    <v-card>
                        <v-img src="https://img.icons8.com/nolan/64/000000/inspection.png"
                            max-width="100px"
                        >
                        </v-img>
                        <v-card-title primary-title>
                            <div class="headline">Чтение этой части завершено.</div>
                        </v-card-title>
                        <v-card-text>
                            <span>Оценка</span>
                            <v-rating v-model="rating" color="success" half-increments large></v-rating>
                        </v-card-text>
                        <v-card-actions>
                            <v-spacer></v-spacer>
                            <v-btn color="primary" dark flat @click.native="finishDialog = false">
                                <v-icon>close</v-icon> Закрыть
                            </v-btn>
                            <v-btn color="success" dark flat @click.native="finishWork">
                                <v-icon>check</v-icon> Подтвердить
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-dialog>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import BookPartContent from '@/components/Article/Part/Content';
    import BookPartWords from '@/components/Article/Words';

    export default {
        props: {
            articleId: {
                type: String,
                required: true,
            },
            partId: {
                type: String,
                required: true,
            },
        },
        components: {
            BookPartContent,
            BookPartWords,
        },
        computed: {
            currentUserArticle() {
                const articles = this.$store.getters.userData.articles;
                if (!articles) {
                    return null;
                }
                return articles[this.articleId];
            },
            currentUserArticlePart() {
                const article = this.currentUserArticle;
                if (!article) {
                    return null;
                }
                
                const articleParts = article.parts;
                if (!articleParts) {
                    return null;
                }

                return articleParts[this.partId];
            },
            finishedAt() {
                const articlePart = this.currentUserArticlePart;
                return articlePart ? articlePart.finishedAt : null
            },
            storedRating() {
                const articlePart = this.currentUserArticlePart;
                return articlePart ? articlePart.rating : 0;
            }
        },
        methods: {
            finishWork() {
                this.$store.dispatch('finishUserArticlePart', { 
                    articleId: this.articleId,
                    partId: this.partId,
                    rating: this.rating,
                });
                this.finishDialog = false;
            }
        },
        data: () => ({
            part: null,
            finishDialog: false,
            rating: 0,
        }),
        created() {
            const { articleId, partId } = this;
            Vue.$db.collection('articleParts')
                .where('articleId', '==', articleId)
                .where('articlePartId', '==', partId)
                .get()
                .then((querySnapshot) => {
                    const snapDocs = querySnapshot.docs;
                    if (snapDocs.length > 0) {
                        this.part = Object.assign({}, snapDocs[0].data());
                    }
                })
                .then(() => {
                    this.$store.dispatch('updateUserArticlePartStats', {
                        articleId,
                        partId,
                    });
                })
                .catch(e => window.console.error(e));
        }
    };
</script>
