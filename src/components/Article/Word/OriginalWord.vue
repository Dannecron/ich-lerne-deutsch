<template>
    <div v-if="wordEntity">
        <v-tooltip bottom>
            <v-avatar v-if="isWord" :size="size" color="teal" slot="activator">
                <span class="white--text">W</span>
            </v-avatar>
            <span>Слово / das word</span>
        </v-tooltip>

        <v-tooltip bottom>
            <v-avatar v-if="isRedewndung" :size="size" color="indigo" slot="activator">
                <span class="white--text">RW</span>
            </v-avatar>
            <span>Выражение / die Redewendung</span>
        </v-tooltip>

        {{ fullOriginalWord }}

        <v-icon v-if="canPronounceWord && showAudio" @click="pronounceWord">music_note</v-icon>
    </div>
</template>

<script>
import { getFullOriginalWord, WORD_TYPES } from '@/utils';

export default {
    props: {
        wordEntity: {
            type: Object,
            default: null,
        },
        size: {
            type: Number,
            default: 45,
        },
        showAudio: {
            type: Boolean,
            default: false,
        },
    },
    data: () => ({
        voice: null,
    }),
    computed: {
        isWord() {
            return this.wordEntity.type === WORD_TYPES.WORD;
        },
        isRedewndung() {
            return this.wordEntity.type === WORD_TYPES.REDEWNNDUNG;
        },
        canPronounceWord() {
            return !!this.voice;
        },
        fullOriginalWord() {
            return this.getFullOriginalWord(this.wordEntity);
        },
    },
    methods: {
        getFullOriginalWord,
        pronounceWord() {
            if (!this.canPronounceWord) {
                return;
            }

            const message = new SpeechSynthesisUtterance();
            message.voice = this.voice;
            message.rate = 1;
            message.pitch = 1;
            message.volume = 1;
            message.text = this.fullOriginalWord;

            speechSynthesis.speak(message);
        },
    },
    created() {
        if ('speechSynthesis' in window) {
            const germanVoices = speechSynthesis.getVoices()
                .filter(voice => voice.lang === 'de');

            if (germanVoices.length) {
                this.voice = germanVoices[0];
            }
        }
    },
}
</script>

