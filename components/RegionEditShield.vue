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
          @click="$parent.editShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Edit Region {{ item.name }}</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="editCountry"
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
                name: '',
                new: true
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
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      region: {
        name: '',
        country_id: '',
        names: []
      }
    }
  },
  async mounted () {
    this.region.name = this.item.name
    this.region.country_id = this.item.country_id
    this.names = await this.getNames(this.item.id)
  },
  computed: {
    ...mapGetters({
      country: 'geography/country/country'
    })
  },
  methods: {
    ...mapActions({
      getCountries: 'geography/country/get',
      getNames: 'geography/regions/getNames',
      editAction: 'geography/regions/edit'
    }),
    async editCountry () {
      await this.editAction({
        id: this.item.id,
        name: this.region.name,
        country_id: this.region.country_id,
        names: this.region.names
      })
      this.$parent.editShield = false
    }
  }
}
</script>

<style scoped>

</style>
