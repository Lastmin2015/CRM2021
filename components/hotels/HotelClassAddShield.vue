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
          @click="$parent.$parent.$parent.addClassShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Class</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn
            dark
            text
            @click="addClass"
          >
            Save
          </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-text-field
          label="Name"
          v-model="classes.name"
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
      classes: {
        name: ''
      }
    }
  },
  methods: {
    ...mapActions({
      addAction: 'hotels/classes/add'
    }),
    async addClass () {
      await this.addAction(this.classes)
      this.$parent.$parent.$parent.addClassShield = false
    }
  }
}
</script>

<style scoped>

</style>
