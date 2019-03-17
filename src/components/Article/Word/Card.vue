<template>
    <v-card>
        <v-card-title>
            <div class="headline">
                <original-word :wordEntity="wordEntity"></original-word>
            </div>
        </v-card-title>

        <v-divider></v-divider>

        <v-card-text>
            {{ wordEntity.transText }}
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn fab dark small color="primary" @click.stop="addWord(wordEntity)" :disabled="isProcessing">
                <v-icon class="d-flex" dark>add</v-icon>
            </v-btn>
            <v-snackbar v-model="snackbar.isEnabled" color="error" bottom light>
                <v-icon>warning</v-icon>
                {{ snackbar.text }}
            </v-snackbar>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import OriginalWord from '@/components/Article/Word/OriginalWord';

export default {
    props: {
        wordEntity: {
            type: Object,
            required: true,
        },
    },
    data: () => ({
        snackbar: {
            isEnabled: false,
            text: null,
        },
    }),
    computed: {
        ...mapGetters(['userData', 'getProcessing']),
        isProcessing() {
            return this.getProcessing;
        },
    },
    methods: {
        addWord(entity) {
            const userWords = this.userData.words;
            const wordAdded = userWords[entity.key];
            if (wordAdded) {
                this.snackbar.isEnabled = true;
                this.snackbar.text = 'Слово уже было добавлено';
                return;
            }

            if (Object.keys(userWords).length > 100) {
                this.snackbar.isEnabled = true;
                this.snackbar.text = 'Слишком много добавленных слов';
                return;
            }

            this.$store.dispatch('addUserWord', entity);
        },
    },
    components: {
        OriginalWord,
    },
};
</script>
