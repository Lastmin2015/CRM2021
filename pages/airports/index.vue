<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Airports
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Airports',
          disabled: true,
          href: '/airports'
        }
      ]
    }
  }
}
</script>
