<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Users
    </h2>
    <div>
      {{ users }}
    </div>
  </div>
</template>

<script>
export default {
  async asyncData ({ $axios }) {
    const users = await $axios.$get('/api/users')
    return {
      users
    }
  },
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
