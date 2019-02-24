<template>
    <div>
        <v-footer :fixed="true" app>
            <span>
                Ich Lerne Deutsch &copy;2018-{{ year }}
            </span>
        </v-footer>
    </div>
</template>


<script>
    export default {
        computed: {
            year: () => new Date().getFullYear(),
        },
    };
</script>
