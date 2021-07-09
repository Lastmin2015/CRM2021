<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Hotel price
    </h2>
    <v-tabs
      centered
      slot="extension"
    >
      <v-tab to="/settings/">
        General
      </v-tab>

      <v-tab to="/settings/custom-fields">
        Custom Fields
      </v-tab>

      <v-tab to="/settings/notifications">
        Notifications
      </v-tab>
    </v-tabs>
    <div>
      <v-row>
        <v-col md="5">
          <v-card class="mt-2">
            <v-toolbar
              class="my-1"
              height="30px"
              flat
            >
              <h4 class="subtitle-1">
                Company info
              </h4>
            </v-toolbar>
            <hr>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                </thead>
                <tbody>
                <tr
                >
                  <td>Language</td>
                  <td>English</td>
                </tr>
                <tr>
                  <td>Company name</td>
                  <td>
                    Lastmin
                  </td>
                </tr>
                <tr>
                  <td>
                    Company logo <br>
                    (Recommended size: 210 x 50 px)
                  </td>
                  <td>
                    <v-img width="150px" height="150px" src="https://picsum.photos/510/300?random"></v-img>
                  </td>
                </tr>
                <tr>
                  <td>
                    Company icon <br>
                    (Recommended size: 50 x 50 px)
                  </td>
                  <td>
                    <v-img width="150px" height="150px" src="https://picsum.photos/510/300?random"></v-img>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
        <v-col md="7">
          <v-card class="mt-2">
            <v-toolbar
              class="my-1"
              height="30px"
              flat
            >
              <h4 class="subtitle-1">
                Currency setting
              </h4>
            </v-toolbar>
            <hr>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                </thead>
                <tbody>
                <tr
                >
                  <td>Currency symbol</td>
                  <td>$</td>
                </tr>
                <tr>
                  <td>Decimal separator</td>
                  <td>
                    <v-chip-group
                      active-class="primary--text"
                      v-model="selection"
                      column
                    >
                      <v-chip
                        value="DOT(.)"
                      >
                        DOT(.)
                      </v-chip>
                      <v-chip
                      >
                        COMMA(,)
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <td>Thousand separator</td>
                  <td>
                    <v-chip-group
                      active-class="primary--text"
                      v-model="selection"
                      column
                    >
                      <v-chip
                        value="DOT(.)"
                      >
                        DOT(.)
                      </v-chip>
                      <v-chip
                      >
                        COMMA(,)
                      </v-chip>
                      <v-chip
                      >
                        SPACE
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <td>Number of decimal</td>
                  <td>
                    <v-chip-group
                      active-class="primary--text"
                      v-model="selection"
                      column
                    >
                      <v-chip
                        value="DOT(.)"
                      >
                        ZERO(0)
                      </v-chip>
                      <v-chip
                      >
                        TWO(2)
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
                <tr>
                  <td>Currency position</td>
                  <td>
                    <v-chip-group
                      active-class="primary--text"
                      v-model="selection"
                      column
                    >
                      <v-chip
                        value="DOT(.)"
                      >
                        $1,100.00
                      </v-chip>
                      <v-chip
                      >
                        $ 1,100.00
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <v-card class="mt-2">
            <v-toolbar
              class="my-1"
              height="30px"
              flat
            >
              <h4 class="subtitle-1">
                Date and time setting
              </h4>
            </v-toolbar>
            <hr>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                </thead>
                <tbody>
                <tr
                >
                  <td>Date format</td>
                  <td>28.04.2020</td>
                </tr>
                <tr>
                  <td>Time format</td>
                  <td>
                    <v-chip-group
                      active-class="primary--text"
                      v-model="selection"
                      column
                    >
                      <v-chip
                        value="DOT(.)"
                      >
                        12 HOURS
                      </v-chip>
                      <v-chip
                      >
                        24 HOURS
                      </v-chip>
                    </v-chip-group>
                  </td>
                </tr>
                <tr
                >
                  <td>Time zone</td>
                  <td>Asia/Dhaka</td>
                </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
          <v-card class="mt-2">
            <v-toolbar
              class="my-1"
              height="30px"
              flat
            >
              <h4 class="subtitle-1">
                Email Setup
              </h4>
            </v-toolbar>
            <hr>
            <v-simple-table>
              <template v-slot:default>
                <thead>
                </thead>
                <tbody>
                <tr
                >
                  <td>Supported mail services</td>
                  <td>Mail</td>
                </tr>
                <tr
                >
                  <td>Email sent from name</td>
                  <td>afeew@mail.ru</td>
                </tr>
                <tr
                >
                  <td>Email sent from email</td>
                  <td>afeew@mail.ru</td>
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
  name: 'Settings',
  data () {
    return {
      selection: 'DOT(.)',
      items: [
        {
          text: 'Settings',
          disabled: true,
          href: '/settings'
        }
      ]
    }
  }
}
</script>

<style scoped>
.v-tab {
  max-width: 370px;
}
</style>
