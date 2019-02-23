
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
                <list-item :article="article"></list-item>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import ListItem from '@/components/Article/Details';

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
        components: {
            ListItem,
        }
    };
</script>
