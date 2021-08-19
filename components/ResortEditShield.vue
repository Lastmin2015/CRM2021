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
<!--          <v-col class="mt-4"  md="6">-->
<!--            <v-text-field-->
<!--              label="Name"-->
<!--              v-model="region.name"-->
<!--              solo-->
<!--            ></v-text-field>-->
<!--          </v-col>-->
          <v-col class="mt-4" md="6">
            <v-select
              v-model="region.region_id"
              :items="country"
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
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      region: {
        region_id: ''
      }
    }
  },
  async mounted () {
    await this.getRegions()
    this.region.region_id = this.item.region_id
  },
  computed: {
    ...mapGetters({
      country: 'geography/regions/regions'
    })
  },
  methods: {
    ...mapActions({
      getRegions: 'geography/regions/get',
      editAction: 'geography/resort/edit'
    }),
    async editCountry () {
      await this.editAction({
        id: this.item.id,
        region_id: this.region.region_id
      })
      this.$parent.editShield = false
    }
  }
}
</script>

<style scoped>

</style>
