<template>
  <info-block title="General Information">
    <template v-slot:main>
      <v-simple-table>

        <template v-slot:default>
          <thead>
            <tr>
              <th class="text-left">Hotel ID</th>
              <th class="text-left">Hotel Name</th>
              <th v-if="!isOperator" class="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{{ hotel.id }}</td>
              <td>{{ hotel.name }}</td>
              <td v-if="!isOperator" class="text-right">
                <v-btn icon @click="edit = true" small color="primary">
                  <v-icon small>mdi-pencil</v-icon>
                </v-btn>
              </td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
      <general-info-edit
        :dialog="edit"
        @dialog="(value) => edit = value"
      />
    </template>
  </info-block>
</template>

<script>
import { mapGetters } from "vuex";
import InfoBlock from "../hotel/hotel-info-block.vue";
import GeneralInfoEdit from './general-info-edit.vue';

export default {
  name: "GeneralInformation",
  components: { InfoBlock, GeneralInfoEdit },
  data: () => ({
    edit: false
  }),
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
  },
};
</script>