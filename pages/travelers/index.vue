<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Travelers
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Travelers',
          disabled: true,
          href: '/travelers'
        }
      ]
    }
  }
}
</script>
