<template>
    <div>
        <section>
            <v-parallax :src="parallaxImg" height="400">
                <v-layout
                    column
                    align-center
                    justify-center
                    class="white--text"
                >
                    <h1 class="white--text mb-2 display-1 text-xs-center">Parallax Template</h1>
                    <div class="subheading mb-3 text-xs-center">Powered by Vuetify</div>
                </v-layout>
            </v-parallax>
        </section>

        <section>
            <v-layout
                class="mt-4"
                column
                wrap
                align-center
            >
                <v-flex xs12 sm4>
                    <div class="text-xs-center">
                        <h2 class="headline">Учи немецкий с удовольствием!</h2>
                    </div>
                </v-flex>

                <v-flex xs12>
                    <v-container grid-list-md>
                        <v-layout row wrap align-center>
                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">book</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline text-xs-center">Читай статьи</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra.
                                        Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada
                                        fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt.
                                        Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>

                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                        <v-icon x-large class="blue--text text--lighten-2">spellcheck</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                        <div class="headline">Учи слова</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada
                                        fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt.
                                        Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>

                            <v-flex xs12 md4>
                                <v-card class="elevation-0 transparent">
                                    <v-card-text class="text-xs-center">
                                       <v-icon x-large class="blue--text text--lighten-2">devices</v-icon>
                                    </v-card-text>
                                    <v-card-title primary-title class="layout justify-center">
                                       <div class="headline text-xs-center">Учись на любом устройстве</div>
                                    </v-card-title>
                                    <v-card-text>
                                        Cras facilisis mi vitae nunc lobortis pharetra. Nulla volutpat tincidunt ornare.
                                        Pellentesque habitant morbi tristique senectus et netus et malesuada
                                        fames ac turpis egestas.
                                        Nullam in aliquet odio. Aliquam eu est vitae tellus bibendum tincidunt.
                                        Suspendisse potenti.
                                    </v-card-text>
                                </v-card>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-flex>
            </v-layout>
        </section>

        <section v-if="articles">
            <v-container grid-list-md>
                <v-layout
                    row
                    wrap
                    justify-center
                >
                    <v-flex xs12 sm4>
                        <v-card class="elevation-0 transparent">
                            <v-card-title class="justify-center" primary-title>
                                <div class="headline">Случайные книги</div>
                            </v-card-title>
                            <v-card-text class="justify-center" xs12 md6>
                                <v-carousel :height="400">
                                    <v-carousel-item
                                        style="cursor: pointer"
                                        v-for="(article, i) in articles"
                                        :key="i"
                                        :src="article.imageUrl"
                                        @click.native="goToAricle(article.id)"
                                    >
                                        <div class="articleTitle">{{ article.title }}</div>
                                    </v-carousel-item>
                                </v-carousel>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-container>
        </section>
    </div>
</template>

<script>
import { shuffle } from 'lodash';
import ParallaxImg from '@/assets/berchtesgadenerland.jpg';

export default {
    name: 'home',
    computed: {
        parallaxImg: () => {
            return ParallaxImg;
        },
        articles() {
            const articles = this.$store.getters.getArticles;
            if (!articles) {
                return [];
            }

            const shuffled = shuffle(articles);
            if (shuffled.length  < 5) {
                return shuffled;
            }

            return shuffled.slice(0, 5);
        },
    },
    methods: {
        goToAricle(articleId) {
            this.$router.push({
                name: 'article',
                params: { articleId },
            });
        },
    },
};
</script>

<style>
    .articleTitle {
        position: absolute;
        color: white;
        font-size: 2em;
        padding: 15px;
        background-color: rgba(0, 0, 0, .5);
        width: 100%;
        text-align: center;
    }
</style>

