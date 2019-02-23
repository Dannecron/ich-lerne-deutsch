<template>
    <v-container grid-list-md v-if="article">
        <v-layout row wrap>
            <v-flex xs12 xs10 offset-sm1>
                <article-details :article="article" :expandDetails="true"></article-details>
            </v-flex>
            <v-flex xs12 xs10 offset-sm1 v-for="part in article.parts" :key="part.id">
                <article-parts-list-item :part="part" :articleId="article.id"></article-parts-list-item>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
    import ArticleDetails from '@/components/Article/Details';
    import ArticlePartsListItem from '@/components/Article/Part/ListItem';

    export default {
        props: {
            articleId: {
                type: String,
                required: true,
            },
        },
        computed: {
            article() {
                return this.$store.getters.getArticles.find(article => article.id == this.articleId);
            },
        },
        components: {
            ArticleDetails,
            ArticlePartsListItem,
        },
    };
</script>
