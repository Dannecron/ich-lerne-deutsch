<template>
    <v-card color="info" class="white--text">
        <v-container fluid>
            <v-layout row>
                <v-flex xs4 md3>
                    <v-img
                        :src="article.imageUrl"
                        v-bind:height="expandDetails ? '150px' : '100px'"
                    >
                    </v-img>
                    <youtube-button class="hidden-sm-and-down"></youtube-button>
                </v-flex>
                <v-flex xs8 md9>
                    <v-card-title>
                        <div :class="{
                                'subheading': $vuetify.breakpoint.smAndDown,
                                'headline': $vuetify.breakpoint.mdAndUp,
                            }"
                        >
                            {{ article.title }}
                        </div>
                        <youtube-button class="hidden-md-and-up"></youtube-button>
                    </v-card-title>
                </v-flex>
            </v-layout>

            <v-layout row wrap>
                <v-flex xs12 md8 order-md2>
                    <div>{{ article.description }}</div>
                </v-flex>
                <v-flex xs12 md4 order-md1>
                    <div>Уровень: {{ getArticleLevel(article.level) }} {{ partsDescription }}</div>
                </v-flex>
            </v-layout>

            <v-layout row>
                <v-flex xs12>
                    <v-card-actions>
                        <!-- <v-rating v-model="article.rating" color="yellow" readonly dense half-increments></v-rating>
                        <div class="ml-1">
                            <span>{{ article.rating }}</span>
                            <span>({{ article.ratingsCount }})</span>
                        </div> -->
                        <v-spacer></v-spacer>
                        <v-btn v-if="!expandDetails" class="primary" flat :to="{ name: 'article', params: { articleId: article.id } }">
                            Открыть
                        </v-btn>
                        <v-btn v-if="expandDetails && canAddArticle(article.id)"
                            class="primary"
                            flat
                            @click="addArticle(article.id)"
                        >
                            Добавить
                        </v-btn>
                        <div v-if="getUserDataArticle(article.id)" class="ml-2">
                            <v-icon color="white">work_outline</v-icon>
                            Добавлено {{ getArticleAddedAt(article.id) | formattedDate }}
                        </div>
                    </v-card-actions>
                </v-flex>
            </v-layout>
        </v-container>
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';
    import YoutubeButton from '@/components/Article/YoutubeButton';
    import { getArticleLevel, declOfNum } from '@/utils';

    export default {
        props: {
            article: {
                type: Object,
                required: true,
            },
            expandDetails: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            partsDescription() {
                const partsCount = this.article.parts.length;
                const partsCountWord = declOfNum(partsCount, ['часть', 'части', 'частей']);
                return `${partsCount} ${partsCountWord}`;
            },
            ...mapGetters(['isUserAuthentificated', 'getProcessing', 'userData']),
        },
        methods: {
            getArticleLevel,
            getUserDataArticle(articleId) {
                return this.userData.articles[articleId];
            },
            canAddArticle(articleId) {
                const article = this.getUserDataArticle(articleId);
                return this.isUserAuthentificated && !this.getProcessing && !article;
            },
            addArticle(articleId) {
                this.$store.dispatch('addUserArticle', articleId);
            },
            getArticleAddedAt(articleId) {
                const article = this.getUserDataArticle(articleId);
                return article.addedAt;
            }
        },
        components: {
            YoutubeButton,
        },
    };
</script>
