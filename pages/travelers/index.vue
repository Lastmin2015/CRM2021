<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Travelers
    </h2>
    <div>
      <v-data-table
        :headers="headers"
        :items="mock"
        sort-by="calories"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Travelers Information</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
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
        </template>
        <template v-slot:[`item.actions`]="">
          <v-icon
            small
          >
            mdi-delete
          </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Refresh
          </v-btn>
        </template>
      </v-data-table>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      headers: [
        // {
        //   text: 'Airport ID',
        //   align: 'start',
        //   sortable: false,
        //   value: 'id'
        // },
        { text: 'REF Number', value: 'id' },
        { text: 'Firstname', value: 'firstname' },
        { text: 'Lastname', value: 'lastname', width: 150 },
        { text: 'DOB', value: 'dob', width: 150 },
        { text: 'Nationality', value: 'national', width: 200 },
        { text: 'Pass number', value: 'pass_num', width: 200 },
        { text: 'Pass expiry date', value: 'pass', width: 200 },
        { text: 'Hotel', value: 'hotel', width: 150 },
        { text: '', value: 'actions', width: 121 }
      ],
      mock: [
        {
          id: '0000000000001',
          firstname: 'Gloria',
          lastname: 'Lane',
          dob: '14.07.2020',
          national: 'Taiwanese',
          pass_num: '07.02.2020',
          pass: '10.03.2020',
          hotel: 'Tulemar Bungalows &...'
        },
        {
          id: '0000000000001',
          firstname: 'Gloria',
          lastname: 'Lane',
          dob: '14.07.2020',
          national: 'Taiwanese',
          pass_num: '07.02.2020',
          pass: '10.03.2020',
          hotel: 'Tulemar Bungalows &...'
        }
      ],
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
