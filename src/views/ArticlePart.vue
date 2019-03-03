<template>
    <v-container grid-list-md v-if="part">
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
                <book-part-content :part="part"></book-part-content>
            </v-flex>
            <v-flex xs12 sm10 offset-sm1>
                <book-part-words :words="part.words"></book-part-words>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Vue from 'vue';
    import BookPartContent from '@/components/Article/Part/Content';
    import BookPartWords from '@/components/Article/Words';

    export default {
        props: {
            articleId: {
                type: String,
                required: true,
            },
            partId: {
                type: String,
                required: true,
            },
        },
        components: {
            BookPartContent,
            BookPartWords,
        },
        data: () => ({
            part: null,
        }),
        created() {
            Vue.$db.collection('articleParts')
                .where('articleId', '==', this.articleId)
                .where('articlePartId', '==', this.partId)
                .get()
                .then((querySnapshot) => {
                    const snapDocs = querySnapshot.docs;
                    if (snapDocs.length > 0) {
                        this.part = Object.assign({}, snapDocs[0].data());
                    }
                })
                .catch(e => console.error(e));
        }
    };
</script>
