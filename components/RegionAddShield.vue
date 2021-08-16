<template>
  <v-dialog
    v-model="$attrs.value"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    scrollable
  >
    <v-card tile>
      <v-toolbar
        flat
        dark
        color="primary"
      >
        <v-btn
          icon
          dark
          @click="$parent.addShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Region</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="addCountry"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
          <v-col class="mt-4" md="6">
            <v-select
              v-model="region.country_id"
              :items="country"
              item-value="id"
              item-text="name"
              label="Country"
              required
            ></v-select>
          </v-col>
        </v-row>

        <h4>Locales</h4>
        <v-row class="mt-4" >
          <template v-for="(name, i) in region.names">
            <v-col class="mt-4"  md="3" :key="i">
              <v-text-field
                label="Name"
                v-model="region.names[i].name"
                solo
              ></v-text-field>
              <v-text-field
                label="locale"
                v-model="region.names[i].locale"
                solo
              ></v-text-field>
            </v-col>
          </template>
          <v-col md="12">
            <v-btn
              color="primary"
              @click.prevent="region.names.push({
                locale: '',
                name: ''
              })"
            >
              Add locale
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'CountryAddShield',
  data () {
    return {
      region: {
        name: '',
        country_id: '',
        names: [
          {
            locale: '',
            name: ''
          }
        ]
      }
    }
  },
  async mounted () {
    await this.getCountries()
  },
  computed: {
    ...mapGetters({
      country: 'geography/country/country'
    })
  },
  methods: {
    ...mapActions({
      getCountries: 'geography/country/get',
      addAction: 'geography/regions/add'
    }),
    async addCountry () {
      await this.addAction(this.region)
      this.$parent.addShield = false
    }
  }
}
</script>

<style scoped>

</style>
