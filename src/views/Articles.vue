<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
                <articles-list></articles-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import ArticlesList from '@/components/ArticlesList';
export default {
    components: {
        ArticlesList,
    },
};
</script>
