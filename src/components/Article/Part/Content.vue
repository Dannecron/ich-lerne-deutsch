<template>
   <v-card class="pa-2">
       <div>
            <div class="display-1">
               {{ part.articleTitle }}
            </div>
            <div class="headline">
               {{ part.partTitle }}
            </div>
            <v-divider class="black"></v-divider>
            <div class="text-xs-center mt-2 mb-2 primary">
                <youtube
                    :video-id="part.youtubeId"
                    :player-width="playerWidth"
                    :player-height="playerHeight"
                >
                </youtube>
            </div>

            <div class="mt-2">
                <v-slider
                    v-model="fontSize"
                    :label="'Размер шрифта'"
                    step="1"
                    max="30"
                    min="10"
                    tick-size="5"
                >
                </v-slider>
                <v-tabs v-model="tabMode" color="accent" dark fixed-tabs slider-color="success">
                    <v-tab :key="'german'" ripple>
                        Текст с подсказками
                    </v-tab>
                    <v-tab :key="'side_by_side'" ripple>
                        Параллельно
                    </v-tab>

                    <v-tab-item :key="'german'">
                        <div v-for="(paragraph, i) in part.content" :key="`paragraph1-${i}`">
                            <span>&nbsp;&nbsp;</span>
                            <span v-for="(sentence, y) in paragraph.sentences" :key="`paragraph1-sentence${y}`" :style="textStyle">
                                <span>
                                    {{ sentence.origText }}
                                </span>
                                <v-icon :size="fontSize" @click.prevent="toggleVisibility(i, y)">help</v-icon>
                                <span class="success--text" style="font-weight:bold;" v-if="getVisibilityFlag(i, y).value">
                                    {{ sentence.transText }}
                                </span>
                            </span>
                        </div>
                    </v-tab-item>

                    <v-tab-item  :key="'side_by_side'">
                        <v-container>
                            <v-layout row wrap v-for="(paragraph, i) in part.content" :key="`paragraph2-${i}`">
                                <v-flex xs6>
                                    <span>&nbsp;&nbsp;</span>
                                    <span v-for="(sentence, y) in paragraph.sentences" :key="`paragraph2-sentence-orig${y}`" :style="textStyle">
                                        <span>
                                            {{ sentence.origText }}
                                        </span>
                                    </span>
                                </v-flex>

                                <v-flex xs6>
                                    <span>&nbsp;&nbsp;</span>
                                    <span v-for="(sentence, y) in paragraph.sentences" :key="`paragraph2-sentence-trans${y}`" :style="textStyle">
                                        <span>
                                            {{ sentence.transText }}
                                        </span>
                                    </span>
                                </v-flex>
                            </v-layout>
                        </v-container>
                    </v-tab-item>
                </v-tabs>
            </div>
       </div>
   </v-card> 
</template>

<script>
    export default {
        props: {
            part: {
                type: Object,
                required: true,
            },
        },
        data: () => ({
            tabMode: 'german',
            visibillityKeys: [],
            fontSize: 18,
        }),
        created() {
            for (let i = 0; i < this.part.content.length; i++) {
                for (let y = 0; y < this.part.content[i].sentences.length; y++) {
                    this.visibillityKeys.push({
                        key: `${i}${y}`,
                        value: false,
                    });
                }
            }
        },
        computed: {
            playerWidth() {
                if (this.$vuetify.breakpoint.mdAndUp) {
                    return '640px';
                }

                return '250px';
            },
            playerHeight() {
                if (this.$vuetify.breakpoint.mdAndUp) {
                    return '390px';
                }

                return '190px';
            },
            textStyle() {
                return {
                    fontSize: `${this.fontSize}px`,
                };
            },
        },
        methods: {
            getVisibilityFlag(i, y) {
                return this.visibillityKeys.find(v => v.key === `${i}${y}`);
            },
            toggleVisibility(i, y) {
                let flag = this.getVisibilityFlag(i, y);
                flag.value = !flag.value;
            },
        }
    };
</script>

<style>

</style>
