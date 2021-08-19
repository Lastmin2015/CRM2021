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
        <v-toolbar-title>Add Resort</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="addResort"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
<!--          <v-col class="mt-4" md="6">-->
<!--            <v-select-->
<!--              v-model="region.country_id"-->
<!--              :items="country"-->
<!--              item-value="id"-->
<!--              item-text="name"-->
<!--              label="Item"-->
<!--              required-->
<!--            ></v-select>-->
<!--          </v-col>-->
          <v-col class="mt-4" md="6">
            <v-select
              v-model="region.region_id"
              :items="regions"
              item-value="id"
              item-text="name"
              label="Region"
              required
            ></v-select>
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
        region_id: ''
      }
    }
  },
  async mounted () {
    await this.getCountries()
  },
  computed: {
    ...mapGetters({
      regions: 'geography/regions/regions'
    })
  },
  methods: {
    ...mapActions({
      getCountries: 'geography/regions/get',
      addAction: 'geography/resort/add'
    }),
    async addResort () {
      await this.addAction(this.region)
      this.$parent.addShield = false
    }
  }
}
</script>

<style scoped>

</style>
