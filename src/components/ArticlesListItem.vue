<template>
    <v-card color="info" class="white--text">
        <v-container fluid>
            <!-- desktop layout -->
            <v-layout row class="hidden-sm-and-down">
                <v-flex md3>
                    <v-img
                        src="https://images-na.ssl-images-amazon.com/images/I/51U6bQbA8oL._SY346_.jpg"
                        height="100px"
                    >
                    </v-img>
                    <div class="text-xs-center">
                        <v-btn flat color="white">
                            <v-icon left>visibility</v-icon>
                            Youtube
                        </v-btn>
                    </div>
                </v-flex>
                <v-flex md9>
                    <v-card-title>
                        <div>
                            <div class="headline">{{ article.title }}</div>
                            <div>{{ article.description }}</div>
                            <v-divider class="white"></v-divider>
                            <div>Уровень: {{ getArticleLevel(article.level) }} {{ article.parts.length }} частей</div>
                        </div>
                    </v-card-title>
                    <v-card-actions>
                        <v-rating v-model="article.rating" color="yellow" readonly dense half-increments></v-rating>
                        <div class="ml-1">
                            <span>{{ article.rating }}</span>
                            <span>({{ article.ratingsCount }})</span>
                        </div>
                        <v-spacer></v-spacer>
                        <v-btn class="primary" flat :to="{ name: 'article', params: { articleId: article.id } }">
                            Открыть
                        </v-btn>
                    </v-card-actions>
                </v-flex>
            </v-layout>

            <!-- tablet and mobile layout -->
            <div class="hidden-md-and-up">
                <v-layout row>
                    <v-flex xs4>
                        <v-img
                            src="https://images-na.ssl-images-amazon.com/images/I/51U6bQbA8oL._SY346_.jpg"
                            height="100px"
                        >
                        </v-img>
                    </v-flex>
                    <v-flex xs8>
                        <v-card-title>
                            <h4>{{ article.title }}</h4>
                            <v-btn flat color="white">
                                <v-icon left>visibility</v-icon>
                                Youtube
                            </v-btn>
                        </v-card-title>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <div>{{ article.description }}</div>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <div>Уровень: {{ getArticleLevel(article.level) }} {{ article.parts.length }} частей</div>
                    </v-flex>
                </v-layout>

                <v-layout row>
                    <v-flex xs12>
                        <v-card-actions>
                            <v-rating v-model="article.rating" color="yellow" readonly dense half-increments></v-rating>
                            <div class="ml-1">
                                <span>{{ article.rating }}</span>
                                <span>({{ article.ratingsCount }})</span>
                            </div>
                            <v-spacer></v-spacer>
                            <v-btn class="primary" flat :to="{ name: 'article', params: { articleId: article.id } }">
                                Открыть
                            </v-btn>
                        </v-card-actions>
                    </v-flex>
                </v-layout>
            </div>
        </v-container>
    </v-card>
</template>

<script>
    import getArticleLevel from '@/helpers/article';

    export default {
        props: {
            article: {
                type: Object,
                required: true,
            },
        },
        methods: {
            getArticleLevel: getArticleLevel,
        },
    };
</script>
