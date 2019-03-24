<template>
    <v-container grid-list-md>
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
                <v-tabs v-model="tabMode" color="accent" dark fixed-tabs slider-color="success">
                    <v-tab :key="'myData'" ripple>
                        Мои данные
                    </v-tab>
                    <v-tab :key="'myArticles'" ripple>
                        Мои статьи
                    </v-tab>
                    <v-tab :key="'myWords'" ripple>
                        Мои слова
                    </v-tab>

                    <v-tab-item :key="'myData'">
                        <user-profile-data></user-profile-data>
                    </v-tab-item>
                    <v-tab-item :key="'myArticles'">
                        <articles-list :userOnly="true"></articles-list>
                    </v-tab-item>
                    <v-tab-item :key="'myWords'">
                        <user-profile-words></user-profile-words>
                    </v-tab-item>
                </v-tabs>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import ArticlesList from '@/components/ArticlesList';
import UserProfileData from '@/components/User/ProfileData';
import UserProfileWords from '@/components/User/ProfileWords';

export default {
    beforeMount() {
        this.$store.commit('clearError');
    },
    data: () => ({
        tabMode: 'myData',
    }),
    components: {
        UserProfileData,
        UserProfileWords,
        ArticlesList,
    },
};
</script>
