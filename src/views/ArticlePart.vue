<template>
    <v-container grid-list-md v-if="part">
        <v-layout row wrap>
            <v-flex xs12 sm10 offset-sm1>
                <!-- content -->
            </v-flex>
            <v-flex xs12 sm10 offset-sm1>
                <!-- words -->
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
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
        computed: {
            part() {
                return this.$store.getters.getParts.find(part => part.articleId === this.articleId
                    && part.articlePartId === this.partId);
            }
        }
    };
</script>
