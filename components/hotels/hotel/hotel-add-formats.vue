<template>
  <v-dialog v-model="$attrs.value" max-width="300px" scrollable>
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-btn
          icon
          dark
          @click="$parent.$parent.$parent.addFormatShield = false"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Add Format</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="addType"> Save </v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <v-card-text class="mt-5">
        <v-text-field label="Name" v-model="format.name" solo></v-text-field>
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
      format: {
        name: "",
      },
    };
  },
  methods: {
    ...mapActions({
      addAction: "hotels/formats/add",
    }),
    async addType() {

      if (this.format.name) {
        const payload = {
          formatData: {
            show_in_filter: true,
            order: 0,
            created_at: 0,
            updated_at: 0
          },
          formatNameData: {
            locale: "en",
            name: this.format.name
          }
        }

        await this.addAction(payload);
        this.$parent.$parent.$parent.addFormatShield = false;
      }
    },
  },
};
</script>