<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Booking entries
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Booking entries',
          disabled: true,
          href: '/be'
        }
      ]
    }
  }
}
</script>
