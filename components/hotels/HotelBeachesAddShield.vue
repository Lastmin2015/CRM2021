<template>
  <v-dialog
    v-model="$attrs.value"
    transition="dialog-bottom-transition"
    max-width="300px"
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
          @click="$parent.$parent.$parent.addBeachesShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Beach</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="addBeach"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-text-field
          label="Name"
          v-model="beach.name"
          solo
        ></v-text-field>
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
      beach: {
        name: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addAction: 'hotels/beaches/add'
    }),
    async addBeach () {
      await this.addAction(this.beach)
      this.$parent.$parent.$parent.addBeachesShield = false
    }
  }
}
</script>

<style scoped>

</style>
