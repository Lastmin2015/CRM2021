<template>
  <v-dialog v-model="$attrs.value" max-width="300px" scrollable>
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-btn
          icon
          dark
          @click="$parent.$parent.$parent.addTypesShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Type</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="addType"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-text-field label="Name" v-model="type.name" solo></v-text-field>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "CountryAddShield",
  data() {
    return {
      type: {
        name: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addAction: "hotels/types/add",
    }),
    async addType() {
      await this.addAction(this.type);
      this.$parent.$parent.$parent.addTypesShield = false;
    },
  },
};
</script>