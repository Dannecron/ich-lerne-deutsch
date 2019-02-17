
<template>
  <div>
    <v-alert
        :value="true"
        color="error"
        icon="warning"
        outline
    >
      Страница, которую вы запросили, не существует.
    </v-alert>
  </div>
</template>

<script>

export default {
  name: 'notFound',
  components: {
  }
}
</script>
