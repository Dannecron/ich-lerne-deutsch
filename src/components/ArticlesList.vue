
<template>
    <section>
        <div>
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
        </div>

        <div class="mb-3" v-for="article in filteredArticles" :key="article.id">
            <list-item :article="article"></list-item>
        </div>
    </section>
</template>


<script>
import ListItem from '@/components/Article/Details';

export default {
    props: {
        userOnly: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        levels: ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'],
        searchTerm: null,
        levelTerm: [],
    }),
    computed: {
        articles() {
            return this.$store.getters.getArticles;
        },
        filteredArticles() {
            const { articles, searchTerm, levelTerm } = this;
            let filteredArticles = articles;

            if (this.userOnly) {
                filteredArticles = filteredArticles.filter(
                    article => this.$store.getters.userData.articles[article.id]
                );
            }

            if (searchTerm) {
                filteredArticles = filteredArticles.filter(article =>
                    article.title.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
                    ||  article.description.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0
                );
            }

            if (levelTerm.length) {
                filteredArticles = filteredArticles.filter(
                    article => levelTerm.filter(val => article.level.indexOf(val) !== -1).length > 0
                );
            }

            return filteredArticles;
        },
    },
    components: {
        ListItem,
    },
};
</script>
