<template>
  <v-app dark>
    <v-navigation-drawer
      v-if="!isOperator"
      v-model="drawer"
      dark
      fixed
      app
    >
      <v-list>
        <!-- <nav-item-hotel v-if="false"></nav-item-hotel> -->
        <template v-for="item in items">
          <v-row
            v-if="item.heading"
            :key="item.heading"
            align="center"
          >
            <v-col cols="6">
              <v-subheader v-if="item.heading">
                {{ item.heading }}
              </v-subheader>
            </v-col>
          </v-row>
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.icon"
            append-icon=""
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>
                  {{ item.title }}
                </v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(child, i) in item.children"
              :key="i"
              link
              :to="child.to"
            >
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.title }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <v-list-item
            v-else
            :key="item.title"
            link
            :to="item.to"
          >
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ item.title }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
<!--        <v-list-item-->
<!--          v-for="(item, i) in items"-->
<!--          :key="i"-->
<!--          :to="item.to"-->
<!--          router-->
<!--          exact-->
<!--        >-->
<!--          <v-list-item-action>-->
<!--            <v-icon>{{ item.icon }}</v-icon>-->
<!--          </v-list-item-action>-->
<!--          <v-list-item-content>-->
<!--            <v-list-item-title v-text="item.title" />-->
<!--          </v-list-item-content>-->
<!--        </v-list-item>-->
      </v-list>
    </v-navigation-drawer>
    <v-app-bar
      v-if="!isOperator"
      class="nav-top"
      elevation="0"
      fixed
      app
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
    </v-app-bar>
    <v-main class="main-content">
      <v-container fluid>
        <nuxt />
      </v-container>
    </v-main>
    <snackbar></snackbar>
  </v-app>
</template>

<script>
import { mapGetters } from "vuex";
import Snackbar from '../components/common/Snackbar.vue'
// import NavItemHotel from "~/components/common/nav-item-hotel"
export default {
  // middleware: 'auth',
  components: {
    Snackbar,
    // NavItemHotel
  },
   computed: {
    ...mapGetters({
      isOperator: "auth/isOperator"
    }),
  },
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
          to: '/payments',
          children: [
            {
              // icon: 'mdi-plus',
              to: '/payments/incoming',
              title: 'Incoming'
            },
            {
              // icon: 'mdi-plus',
              to: '/payments/outgoing',
              title: 'Outgoing'
            }
          ]
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
          to: '/hotels',
          // children: [
          //   {
          //     // icon: 'mdi-plus',
          //     to: '/hotels/descriptions',
          //     title: 'Hotel description'
          //   },
          //   {
          //     // icon: 'mdi-plus',
          //     to: '/hotels/prices/room-types',
          //     title: 'Hotel price tables'
          //   }
          // ]
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
