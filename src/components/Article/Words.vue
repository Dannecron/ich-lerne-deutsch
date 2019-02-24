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
                md4
                lg3
            >
                <v-card>
                    <v-card-title>
                        <h4>{{ props.item.origWord }}</h4>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-card-text>
                        {{ props.item.transWord }}
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn fab dark small color="primary">
                            <v-icon class="d-flex" dark>add</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-data-iterator>
    </v-container>
</template>

<script>
    export default {
        props: {
            words: {
                type: Array,
                required: true,
            },
        },
    }
</script>

<style>

</style>
