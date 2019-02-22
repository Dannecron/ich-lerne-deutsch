
<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-container fluid>
                    <v-layout row>
                        <v-flex md8>
                            <v-text-field label="Поиск" v-model="searchTerm"></v-text-field>
                        </v-flex>
                        <v-flex md4>
                            <v-select label="Уровень" :items="levels" v-model="levelTerm" multiple></v-select>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-flex>
            <v-flex v-for="article in filteredArticles" xs12 sm10 md8 offset-sm1 offset-md2 :key="article.id">
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
                                        <div>Уровень: {{ getArticleLevel(article.level) }} {{ article.parts }} частей</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-rating v-model="article.rating" color="yellow" readonly dense half-increments></v-rating>
                                    <div class="ml-1">
                                        <span>{{ article.rating }}</span>
                                        <span>({{ article.ratingsCount }})</span>
                                    </div>
                                    <v-spacer></v-spacer>
                                    <v-btn class="primary" flat>Открыть</v-btn>
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
                                    <div>Уровень: {{ getArticleLevel(article.level) }} {{ article.parts }} частей</div>
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
                                        <v-btn class="primary" flat>Открыть</v-btn>
                                    </v-card-actions>
                                </v-flex>
                            </v-layout>
                        </div>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    export default {
        data() {
            return {
                levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],

                searchTerm: null,
                levelTerm: [],
            };
        },
        computed: {
            articles() {
                return this.$store.getters.getArticles;
            },
            filteredArticles() {
                const { articles, searchTerm, levelTerm } = this;
                let filteredArticles = articles

                if (searchTerm) {
                    filteredArticles = filteredArticles.filter(article => 
                        article.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
                        ||  article.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
                    );
                }

                if (levelTerm.length) {
                    filteredArticles = filteredArticles.filter(article => levelTerm.filter(val => article.level.indexOf(val) !== -1).length > 0)
                }

                return filteredArticles;
            },
        },
        methods: {
            getArticleLevel(levels) {
                return levels.join('/');
            },
        },
    };
</script>
