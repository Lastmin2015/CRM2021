<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Users
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Users',
          disabled: true,
          href: '/users'
        }
      ]
    }
  }
}
</script>
