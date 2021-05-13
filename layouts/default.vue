<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      dark
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      class="nav-top"
      elevation="0"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main class="main-content">
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  data () {
    return {
      drawer: false,
      items: [
        {
          icon: 'mdi-book-outline',
          title: 'Booking entries',
          to: '/be'
        },
        {
          icon: 'mdi-book-check-outline',
          title: 'Payments',
          to: '/payments'
        },
        {
          icon: 'mdi-map',
          title: 'Travelers',
          to: '/travelers'
        },
        {
          icon: 'mdi-account-supervisor-outline',
          title: 'Customers',
          to: '/customers'
        },
        {
          icon: 'mdi-map-marker-multiple',
          title: 'Geography',
          to: '/geography'
        },
        {
          icon: 'mdi-airplane',
          title: 'Airports',
          to: '/airports'
        },
        {
          icon: 'mdi-star-outline',
          title: 'Hotels',
          to: '/hotels'
        },
        {
          icon: 'mdi-key-outline',
          title: 'Users and roles',
          to: '/users'
        },
        {
          icon: 'mdi-account-settings-outline',
          title: 'Settings',
          to: '/settings'
        },
        {
          icon: 'mdi-chart-bar',
          title: 'Reports',
          to: '/reports'
        }
      ]
    }
  },
  mounted () {
    this.$axios.setToken(this.$store.state.auth.token, 'Bearer')
  }
}
</script>

<style scoped>
  .nav-top {
    background: #fff;
  }
  .main-content {
    background: #F4F8F8;
  }
</style>
