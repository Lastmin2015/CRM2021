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
        <v-toolbar-title>Add Country</v-toolbar-title>
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
import { mapActions } from 'vuex'

export default {
  name: 'CountryAddShield',
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
  methods: {
    ...mapActions({
      addAction: 'geography/country/add'
    }),
    async addCountry () {
      await this.addAction(this.names)
      this.$parent.addShield = false
    }
  }
}
</script>

<style scoped>

</style>
