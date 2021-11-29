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
      <v-row>
        <v-col md="4">
          <v-card>
            <v-toolbar
              class="my-1"
              height="30px"
              flat
            >
              <h4 class="subtitle-1">
                Users
              </h4>
              <v-spacer></v-spacer>
              <v-btn-toggle
                small
                color="primary"
                dense
                group
              >
                <v-btn
                  small
                  :value="1"
                  text
                >
                  <v-icon>mdi-magnify</v-icon>
                </v-btn>

                <v-btn
                  small
                  :value="2"
                  text
                >
                  <v-icon>mdi-filter-minus-outline</v-icon>
                </v-btn>

                <v-btn
                  small
                  :value="3"
                  text
                >
                  <v-icon>mdi-filter-plus-outline</v-icon>
                </v-btn>

                <v-btn
                  small
                  :value="4"
                  text
                >
                  <v-icon>mdi-table-column-width</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-toolbar>
            <hr>
            <v-list three-line>
              <v-list-item>
                  <v-list-item-avatar>
                    <v-img src="https://picsum.photos/510/300?random"></v-img>
                  </v-list-item-avatar>
                  <v-list-item-content>
                    <v-list-item-title>
                      <v-chip
                        color="green"
                        dark
                      >
                        Active
                      </v-chip>
                      Arlene McCoy
                    </v-list-item-title>
                    <v-list-item-subtitle>
                      admin@demo.com
                    </v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>
              <v-divider></v-divider>
              <v-list-item>
                <v-list-item-avatar>
                  <v-img src="https://picsum.photos/510/300?random"></v-img>
                </v-list-item-avatar>

                <v-list-item-content>
                  <v-list-item-title>
                    <v-chip
                      color="green"
                      dark
                    >
                      Active
                    </v-chip>
                    Arlene McCoy
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    admin@demo.com
                  </v-list-item-subtitle>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>

        </v-col>
        <v-col md="8">
          <v-card>
            <v-toolbar
              class="my-1"
              height="30px"
              flat
            >
              <h4 class="subtitle-1">
                Roles
              </h4>
            </v-toolbar>
            <hr>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                <tr>
                  <th class="text-left">
                    Role name
                  </th>
                  <th class="text-left">
                    Permission
                  </th>
                  <th class="text-left">
                    Users
                  </th>
                </tr>
                </thead>
                <tbody>
                <tr
                >
                  <td>Admin</td>
                  <td>
                    <v-chip
                      color="green"
                      dark
                    >
                      Active
                    </v-chip>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="https://picsum.photos/510/300?random"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          <v-chip
                            color="green"
                            dark
                          >
                            Active
                          </v-chip>
                          Arlene McCoy
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          admin@demo.com
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                </tr>
                <tr
                >
                  <td>Bookkeeper</td>
                  <td>
                    <v-chip
                      color="green"
                      dark
                    >
                      Active
                    </v-chip>
                  </td>
                  <td>
                    <v-list-item>
                      <v-list-item-avatar>
                        <v-img src="https://picsum.photos/510/300?random"></v-img>
                      </v-list-item-avatar>

                      <v-list-item-content>
                        <v-list-item-title>
                          <v-chip
                            color="green"
                            dark
                          >
                            Active
                          </v-chip>
                          Arlene McCoy
                        </v-list-item-title>
                        <v-list-item-subtitle>
                          admin@demo.com
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
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
