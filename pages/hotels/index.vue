<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Hotels
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Hotels',
          disabled: true,
          href: '/hotels'
        }
      ]
    }
  }
}
</script>
