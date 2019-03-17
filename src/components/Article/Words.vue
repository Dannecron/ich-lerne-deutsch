<template>
    <v-container fluid>
        <span class="display-1">Слова</span>
        <v-data-iterator
            :items="words"
            :hide-actions="true"
            content-tag="v-layout"
            row
            wrap
        >
            <v-flex
                slot="item"
                slot-scope="props"
                xs12
                sm6
            >
                <word-card :wordEntity="props.item"></word-card>
            </v-flex>
        </v-data-iterator>
    </v-container>
</template>

<script>
import WordCard from '@/components/Article/Word/Card';

export default {
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
    computed: {
        userData() {
            return this.$store.getters.userData;
        },
        words() {
            const words = [];

            for (let property in this.data) {
                if (this.data.hasOwnProperty(property)) {
                    const word = Object.assign({}, this.data[property], { key: property });
                    words.push(word);
                }
            }

            return words;
        },
    },
    components: {
        WordCard,
    },
};
</script>

