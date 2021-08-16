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
        <v-toolbar-title>Edit Place</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="editPlace"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text>
        <v-row>
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
              item-text="id"
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
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
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
    this.place.resort_id = this.item.resort_id
    this.place.is_city = this.item.is_city
  },
  computed: {
    ...mapGetters({
      resorts: 'geography/resort/resorts'
    })
  },
  methods: {
    ...mapActions({
      getResort: 'geography/resort/get',
      editAction: 'geography/place/edit'
    }),
    async editPlace () {
      await this.editAction({
        id: this.item.id,
        resort_id: this.place.resort_id,
        is_city: this.place.is_city
      })
      this.$parent.editShield = false
    }
  }
}
</script>

<style scoped>

</style>
