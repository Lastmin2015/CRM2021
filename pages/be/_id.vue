<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Card “Booking entries”
    </h2>
    <v-row>
      <v-col md="12">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1 mt-1">
              Booking
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Hotel Name
                </th>
                <th class="text-left">
                  Check in Date
                </th>
                <th class="text-left">
                  Check out Date
                </th>
                <th class="text-left">
                  Days of stay*
                </th>
                <th class="text-left">
                  Boarding
                </th>
                <th class="text-left">
                  Room type
                </th>
                <th class="text-left">
                  Adults Num
                </th>
                <th class="text-left">
                  Kids Num
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>B Ocean Resort</td>
                <td>08.01.2020</td>
                <td>25.05.2020</td>
                <td>
                  4
                </td>
                <td>
                  String
                </td>
                <td>
                  <v-chip
                    color="purple"
                    dark
                  >
                    One person
                  </v-chip>
                </td>
                <td>
                  4
                </td>
                <td>
                  2
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
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
              Full Price
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Flight cost Full
                </th>
                <th class="text-left">
                  Hotel Cost Full
                </th>
                <th class="text-left">
                  Transfer Cost
                </th>
                <th class="text-left">
                  Total
                </th>
                <th class="text-left">
                  Netto
                </th>
                <th class="text-left">
                  Profit
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>$1,200</td>
                <td>$70</td>
                <td>$80</td>
                <td>
                  $160
                </td>
                <td>
                  $1,500
                </td>
                <td>
                  $250
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Customer Information
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th class="text-left">
                  Customer E-mail
                </th>
                <th class="text-left">
                  Customer phone num
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>
                  angloero@mail.ru
                </td>
                <td>
                  +79582919477
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Documents: Order Conf Sent
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
                <td>
                  Flight docs sent
                </td>
                <td>
                  <a href="#">https://www.artstation.c...</a>
                </td>
              </tr>
              <tr>
                <td>
                  Hotel confirm sent
                </td>
                <td>
                  <a href="#">https://www.artstation.c...</a>
                </td>
              </tr>
              <tr>
                <td>
                  Transfer Sent
                </td>
                <td>
                  <a href="#">https://www.artstation.c...</a>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Transactions
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
                <td>
                  TRANSACTION NUMBER
                </td>
                <td>
                  28473891
                </td>
              </tr>
              <tr>
                <td>
                  DATE
                </td>
                <td>
                  28.08.2010
                </td>
              </tr>
              <tr>
                <td>
                  PAYMENT METHOD
                </td>
                <td>
                  <v-chip
                    color="blue"
                    dark
                  >
                    Cash
                  </v-chip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Transfer Information
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
                <td>
                  Transfer type
                </td>
                <td>
                  <v-chip
                    color="yellow"
                  >
                    Class A
                  </v-chip>
                </td>
              </tr>
              <tr>
                <td>
                  Transfer provider
                </td>
                <td>
                  LogoTrans
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
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
              General Information
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th>
                  REF Number
                </th>
                <th>
                  Entry date
                </th>
              <th>
                Manager
              </th>
              <th>
                Status
              </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>
                  2KA921
                </td>
                <td>
                  23.04.2020
                </td>
                <td>
                  Elise Rose
                </td>
                <td>
                  <v-chip
                    color="green"
                    dark
                  >
                    Paid up
                  </v-chip>
                </td>
              </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card>
      </v-col>
      <v-col md="4">
        <v-card>
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Payment Status
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
                <td>
                  Unpaid Indicator **
                </td>
                <td>
                  <v-chip
                    color="green"
                    dark
                  >
                    Paid up
                  </v-chip>
                </td>
              </tr>
              <tr
              >
                <td>
                  Paid in full Indicator
                </td>
                <td>
                  <v-chip
                    color="green"
                    dark
                  >
                    Paid up
                  </v-chip>
                </td>
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
              Flight
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th>
                  Flight origin
                </th>
                <th>
                  Return flight origin
                </th>
                <th>
                  Flight Dest
                </th>
                <th>
                  Carrier
                </th>
                <th>
                  Date
                </th>
                <th>
                  Time Dep
                </th>
                <th>
                  Time Arr
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>
                  03.07.2020
                </td>
                <td>
                  28.04.2020
                </td>
                <td>
                  Resplace
                </td>
                <td>
                  John Paul
                </td>
                <td>
                  18.03.2020
                </td>
                <td>
                  07:59 pm
                </td>
                <td>
                  10:41 pm
                </td>
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
              Passengers
            </h4>
          </v-toolbar>
          <hr>
          <v-simple-table>
            <template v-slot:default>
              <thead>
              <tr>
                <th>
                  FirstName
                </th>
                <th>
                  Lastname
                </th>
                <th>
                  Date of birth
                </th>
                <th>
                  Nationality
                </th>
                <th>
                  Pass number
                </th>
                <th>
                  Pass expiry date
                </th>
              </tr>
              </thead>
              <tbody>
              <tr
              >
                <td>
                  Kristin
                </td>
                <td>
                  Warren
                </td>
                <td>
                  01.06.2020
                </td>
                <td>
                  Russian
                </td>
                <td>
                  E9WIFX
                </td>
                <td>
                  01.06.2020
                </td>
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
      headers: [
        { text: 'Info', value: 'info' },
        {
          text: 'Hotel ID',
          align: 'start',
          sortable: false,
          value: 'id'
        },
        { text: 'Hotel Name', value: 'name' },
        { text: 'Place', value: 'place' },
        { text: 'Resort', value: 'resort' },
        { text: 'Region', value: 'region' },
        { text: 'Country', value: 'country' },
        { text: 'Type', value: 'type' },
        { text: '', value: 'actions', sortable: false }
      ],
      mock: [
        {
          id: 'SD9212969',
          name: 'The Peninsula Chicago',
          place: 'Cincinnati',
          resort: 'Vancouver',
          region: 'Africa',
          country: 'Monaco',
          type: 'Boutique'
        },
        {
          id: 'SD9212929',
          name: 'Andronis Boutique Hotel',
          place: 'San Isidro',
          resort: 'Medicine Hat',
          region: 'Asia',
          country: 'Georgia',
          type: 'Business'
        },
        {
          id: 'SD9212920',
          name: 'Hanoi La Siesta Hote...',
          place: 'North Las Vegas ',
          resort: 'Laval',
          region: 'Oceania',
          country: 'Iceland',
          type: 'Boutique'
        }
      ],
      items: [
        {
          text: 'Booking entries',
          disabled: false,
          href: '/be'
        },
        {
          text: 'Card “Booking entries”',
          disabled: true,
          href: '/hotels/description'
        }
      ]
    }
  }
}
</script>

<style scoped>

</style>
