<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Reports
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Reports',
          disabled: true,
          href: '/reports'
        }
      ]
    }
  }
}
</script>
