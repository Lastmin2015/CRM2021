<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Card “Customers”
    </h2>
    <v-row>
      <v-col md="12">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Customer Data
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Firstname
                </th>
                <th class="text-left">
                  Lastname
                </th>
                <th class="text-left">
                  E-mail
                </th>
                <th class="text-left">
                  Phone
                </th>
                <th class="text-left">
                  Birth date
                </th>
                <th class="text-left">
                  Personal code
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>Kristin</td>
                <td>Lane</td>
                <td>debra.holt@example.c...</td>
                <td>+79106732955</td>
                <td>21.11.2019</td>
                <td>6763160707635419</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Passport
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Passport number
                </th>
                <th class="text-left">
                  Passport issued at
                </th>
                <th class="text-left">
                  Passport expires at
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>1938669933</td>
                <td>18.05.2020</td>
                <td>21.11.2019</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="6">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Profile
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Password
                </th>
                <th class="text-left">
                  Profile image
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>HladOs138</td>
                <td>img/list1/p1.png</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Companions List
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Firstname
                </th>
                <th class="text-left">
                  Lastname
                </th>
                <th class="text-left">
                  E-mail
                </th>
                <th class="text-left">
                  Phone
                </th>
                <th class="text-left">
                  Birth date
                </th>
                <th class="text-left">
                  Personal code
                </th>
                <th class="text-left">
                  Passport num
                </th>
                <th class="text-left">
                  Passport issued at
                </th>
                <th class="text-left">
                  Passport expires at
                </th>
                <th class="text-left">
                  Password
                </th>
                <th class="text-left">
                  Profile image
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>Sara</td>
                <td>Tomson</td>
                <td>sarato.holt@ex...</td>
                <td>+7938201855</td>
                <td>23.09.2019</td>
                <td>67631107076354...</td>
                <td>1638664933.</td>
                <td>07.02.2020</td>
                <td>31.10.2019</td>
                <td>ka!!di48</td>
                <td>img/list2/p1.png</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="12">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Orders history
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  REF Number
                </th>
                <th class="text-left">
                  Hotel Name
                </th>
                <th class="text-left">
                  Date
                </th>
                <th class="text-left">
                  Order confi...
                </th>
                <th class="text-left">
                  Flight tickets
                </th>
                <th class="text-left">
                  Hotel confi...
                </th>
                <th class="text-left">
                  Transfer c...
                </th>
                <th class="text-left">
                  Invoices
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>SD9212969</td>
                <td>Sunstry Corp</td>
                <td>23.09.2019</td>
                <td>/img.pdf</td>
                <td>/img-ft.pdf</td>
                <td>/img.pdf</td>
                <td>/img-not.pdf</td>
                <td>/img-iv.pdf</td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'HotelDescription',
  data () {
    return {
      items: [
        {
          text: 'Customers',
          disabled: false,
          href: '/customers'
        },
        {
          text: 'Card “Customers”',
          disabled: true,
          href: '/customers/description'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
