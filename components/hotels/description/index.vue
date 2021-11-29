<template>
  <info-block title="Description Text">
    <template v-if="!isOperator" v-slot:actions>
      <v-btn  v-if="readOnly" icon small color="primary" @click="editText">
        <v-icon small dark>mdi-pencil</v-icon>
      </v-btn>
      <div v-else>
        <v-btn
          height="25"
          elevation="0"
          small
          color="primary"
          :loading="loading"
          @click="saveText"
        >
          Save
        </v-btn>
        <v-btn
          :disabled="loading"
          height="25"
          elevation="0"
          class="ml-2"
          small
          color="error"
          @click="readOnly = true"
        >
          Cancel
        </v-btn>
      </div>
    </template>
    <template v-slot:main>
      <v-textarea
        :readonly="readOnly"
        no-resize
        flat
        solo
        hide-details
        rows="3"
        class="ma-0 px-1"
        v-model="hotelDescription"
      />
    </template>
  </info-block>
</template>

<script>
import InfoBlock from "../hotel/hotel-info-block.vue";
import { mapGetters } from "vuex";

export default {
  name: "DescriptionText",
  data: () => ({
    loading: false,
    hotelDescription: "",
    readOnly: true,
  }),
  components: { InfoBlock },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
  },
  methods: {
    editText() {
      this.readOnly = false;
    },
    saveText() {
      this.loading = true;

      let url = ''
      let method = ''
      let description = {
        hotel_id: this.hotel.id,
        description: this.hotelDescription,
        locale: "en"
      };

      if (this.hotel.hotel_descriptions.length) {
        let id = this.hotel.hotel_descriptions[0].id;
        url = `/api/hotel-descriptions/${id}`
        method = 'put'
      } else {
        url = `/api/hotel-descriptions`
        method = 'post'
      }

      this.$axios[method](url, description).then(() => {
        this.$store.dispatch('hotels/getById', this.hotel.id)
        this.loading = false;
        this.readOnly = true;
        this.$notifier.showMessage({ content: 'Description was successfully updated!' })
      });
    },
  },
  mounted() {
    if (this.hotel.hotel_descriptions.length) {
      this.hotelDescription = this.hotel.hotel_descriptions[0].description;
    }
  },
};
</script>