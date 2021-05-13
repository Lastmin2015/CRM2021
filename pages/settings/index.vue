<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Settings
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Settings',
          disabled: true,
          href: '/setting'
        }
      ]
    }
  }
}
</script>
