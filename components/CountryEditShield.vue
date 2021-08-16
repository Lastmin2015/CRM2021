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
        <v-toolbar-title>Edit Country {{ item.name }}</v-toolbar-title>
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
        <v-row class="mt-4" >
          <template v-for="(name, i) in names">
            <v-col class="mt-4"  md="3" :key="i">
              <v-text-field
                label="Name"
                v-model="names[i].name"
                solo
              ></v-text-field>
              <v-text-field
                label="locale"
                v-model="names[i].locale"
                solo
              ></v-text-field>
            </v-col>
          </template>
          <v-col md="12">
            <v-btn
              color="primary"
              @click.prevent="names.push({
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
import { mapActions } from 'vuex'

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
      names: [
        {
          locale: '',
          name: ''
        }
      ]
    }
  },
  async mounted () {
    this.names = await this.getNames(this.item.id)
  },
  methods: {
    ...mapActions({
      getNames: 'geography/country/getNames',
      editAction: 'geography/country/edit'
    }),
    async editCountry () {
      await this.editAction({
        id: this.item.id,
        names: this.names
      })
      this.$parent.editShield = false
    }
  }
}
</script>

<style scoped>

</style>
