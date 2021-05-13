<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Payments
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Payments',
          disabled: true,
          href: '/payments'
        }
      ]
    }
  }
}
</script>
