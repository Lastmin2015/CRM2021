<template>
  <info-block title="Classification">
    <template v-slot:main>
      <v-simple-table>
        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Type</th>
              <th class="text-left">Format</th>
              <th class="text-left">Class</th>
              <th v-if="!isOperator" class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <v-chip
                  v-if="hotel.hotel_type.hotel_type_name.name"
                  color="green"
                  dark
                >
                  {{ hotel.hotel_type.hotel_type_name.name }}
                </v-chip>
                <span v-else> --- </span>
              </td>
              <td>
                <v-chip
                  dark
                  color="blue"
                  v-if="hotel.hotel_format.hotel_format_name.name"
                >
                  {{ hotel.hotel_format.hotel_format_name.name }}
                </v-chip>
                <span v-else> --- </span>
              </td>
              <td>
                <v-chip v-if="hotel.hotel_class.name" color="red" dark>
                  {{ hotel.hotel_class.name ? hotel.hotel_class.name : '---'}}
                </v-chip>
                <span v-else> --- </span>
              </td>
              <td v-if="!isOperator" class="text-right">
                <v-btn icon @click="edit = true" small color="primary">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <classification-edit :dialog="edit" @dialog="(value) => (edit = value)" />
    </template>
  </info-block>
</template>

<script>
import { mapGetters } from "vuex";
import InfoBlock from "../hotel/hotel-info-block.vue";
import ClassificationEdit from "./classification-edit.vue";
export default {
  components: { InfoBlock, ClassificationEdit },
  name: "Classification",
  data: () => ({
    edit: false,
  }),
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
  },
};
</script>