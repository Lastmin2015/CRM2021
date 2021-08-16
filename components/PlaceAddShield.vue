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
        <v-toolbar-title>Add Place</v-toolbar-title>
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
          <v-col class="mt-4"  md="6">
            <v-checkbox
              v-model="place.is_city"
              label="Is city"
            ></v-checkbox>
          </v-col>
          <v-col class="mt-4" md="6">
            <v-select
              v-model="place.resort_id"
              :items="resorts"
              item-value="id"
              item-text="region_id"
              label="Resort Id"
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
      place: {
        resort_id: '',
        is_city: false
      }
    }
  },
  async mounted () {
    await this.getResort()
  },
  computed: {
    ...mapGetters({
      resorts: 'geography/resort/resorts'
    })
  },
  methods: {
    ...mapActions({
      getResort: 'geography/resort/get',
      addAction: 'geography/place/add'
    }),
    async addResort () {
      await this.addAction(this.place)
      this.$parent.addShield = false
    }
  }
}
</script>

<style scoped>

</style>
