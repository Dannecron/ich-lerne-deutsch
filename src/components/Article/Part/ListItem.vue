<template>
    <div>
        <v-card color="accent" class=white--text>
            <v-card-title primary-title class="headline">
                {{ part.title }}
            </v-card-title>
            <v-card-actions>
                <v-spacer></v-spacer>
                <div v-if="finishedAt" class="mr-2">
                    <v-icon dark>check</v-icon> Завершено {{ finishedAt | formattedDate }}
                </div>
                <v-btn v-if="isUserArticleAdded"
                    flat
                    class="primary"
                    :to="{
                        name: 'articlePart',
                        params: { articleId: this.articleId, partId: part.id },
                    }"
                >
                    Открыть
                </v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        props: {
            part: {
                type: Object,
                required: true,
            },
            articleId: {
                type: String,
                required: true,
            },
        },
        computed: {
            ...mapGetters(['isUserAuthentificated', 'getProcessing', 'userData']),
            currentUserArticle() {
                return this.userData.articles[this.articleId];
            },
            currentUserArticlePart() {
                const article = this.currentUserArticle;
                return article ? article.parts[this.part.id] : null;
            },
            isUserArticleAdded() {
                return this.isUserAuthentificated && !this.getProcessing && !!this.currentUserArticle;
            },
            finishedAt() {
                const { currentUserArticlePart } = this;
                return currentUserArticlePart ? currentUserArticlePart.finishedAt : null;
            },
        },
        methods: {
        },
    };
</script>

