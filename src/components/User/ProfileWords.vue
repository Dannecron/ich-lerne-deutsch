<template>
    <div>
        <v-card v-if="currentWord" class="mt-2" dark>
            <v-card-title>
                <div class="headline">
                    <original-word :wordEntity="currentWord" :showAudio="true"></original-word>
                </div>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text v-if="currentWord.showTranslation" class="headline">
                {{ currentWord.transText }}
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn 
                    v-if="!currentWord.showTranslation"
                    @click="currentWord.showTranslation = true"
                    color="primary"
                    dark 
                    small
                >
                    <v-icon>visibility</v-icon> Показать перевод
                </v-btn>
                <v-btn
                    @click="learnWord"
                    color="success"
                    dark
                    small
                >
                    <v-icon>check</v-icon> Изучено
                </v-btn>
            </v-card-actions>
        </v-card>

        <v-card>
            <v-card-title v-if="words.length" class="display-1">
                <span>Все слова на сегодня ({{ words.length }})</span>
            </v-card-title>

            <v-card-title v-else>
                <span>Нет слов для изучения</span>
            </v-card-title>

            <v-card-text>
                <v-list>
                    <div v-for="(word, index) in words" :key="index">
                        <v-list-tile @click="selectCurrentWord(word)">
                            <div class="title pa-1">
                                <original-word :wordEntity="word" :size="35"></original-word>
                            </div>
                        </v-list-tile>
                    </div>
                </v-list>
            </v-card-text>
        </v-card>
    </div>    
</template>

<script>
import { mapGetters } from 'vuex';
import OriginalWord from '@/components/Article/Word/OriginalWord';
import { buildDate } from '@/filters';
import { EVENTS } from '@/utils';

export default {
    data: () => ({
        words: [],
        currentWord: null,
    }),
    computed: {
        ...mapGetters(['userData']),
        userWords() {
            return this.userData.words;
        }
    },
    methods: {
        setWords() {
            this.words = [];
            const userWords = this.userWords;

            for (let property in userWords) {
                if (userWords.hasOwnProperty(property)) {
                    const word = userWords[property];
                    const nextShowDate = buildDate(word.nextShowDate);
                    const isWordAvailable = nextShowDate <= new Date();

                    if (isWordAvailable) {
                        this.words.push({ ...word, key: property, showTranslation: false });
                    }
                }
            }

            this.currentWord = this.words.length > 0 ? this.words[0] : null;
        },
        learnWord() {
            this.$store.dispatch('processUserLearnWord', this.currentWord.key);
        },
        selectCurrentWord(word) {
            this.currentWord = { ...word, showTranslation: false };
        },
    },
    mounted() {
        this.setWords();
    },
    created() {
        this.$bus.$on(EVENTS.USER.DATA_LOADED, () => {
            this.setWords();
        });
        this.$bus.$on(EVENTS.USER.WORD_UPDATED, () => {
            this.setWords();
        });
    },
    beforeDestroy() {
        this.$bus.$off(EVENTS.USER.DATA_LOADED);
        this.$bus.$off(EVENTS.USER.WORD_UPDATED)
    },
    components: {
        OriginalWord,
    },
};
</script>

