<template>
  <info-block
    class="hotel-images"
    title="Hotel Images"
    :height="hotelImages.length ? '100%' : '36'"
    :hideDivider="hotelImages.length ? true : false"
  >
    <template v-if="!isOperator" v-slot:actions>
      <div style="width: 400px" class="d-flex align-center">
        <v-file-input
          v-model="image"
          class="ma-0 pa-0 body-2"
          clearable
          multiple
          dense
          hide-details
          show-size
          label="Upload Image"
          truncate-length="22"
        ></v-file-input>
        <v-btn
          v-if="image"
          small
          height="28"
          elevation="0"
          class="ml-5"
          color="primary"
          :loading="loading"
          @click="uploadImage"
        >
          Upload
          <v-icon right dark> mdi-cloud-upload </v-icon>
        </v-btn>
      </div>
    </template>
    <template v-slot:main>
      <template v-if="hotelImages.length">
        <v-slide-group
          class="py-2 slider-lastmin"
          active-class="success"
          show-arrows="always"
        >
          <draggable
            v-model="hotelImages"
            ghost-class="ghost"
            class="d-flex"
            @start="dragging = true"
            @end="dragging = false"
          >
            <v-slide-item v-for="(src, i) in hotelImages" :key="i">
              <v-card class="mx-2" height="79" width="120">
                <img
                  :src="src.file_name | imgSRC"
                  @click="openDialog(src)"
                  height="79"
                  width="120"
                  alt="hotel-image"
                />
              </v-card>
            </v-slide-item>
          </draggable>
        </v-slide-group>
      </template>
      <hotel-images-dialog
        :dialog="dialog"
        :src="src"
        :id="id"
        @handleDialog="(state) => (dialog = state)"
      />
    </template>
  </info-block>
</template>

<script>
import { mapGetters } from "vuex";
import HotelImagesDialog from "./images-delete.vue";
import InfoBlock from "../hotel/hotel-info-block.vue";
import draggable from "vuedraggable";

export default {
  name: "HotelImages",
  components: { InfoBlock, HotelImagesDialog, draggable },
  data: () => ({
    image: null,
    loading: false,
    dialog: false,
    src: "",
    id: "",
    dragging: false
  }),
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      isOperator: "auth/isOperator"
    }),
    hotelImages: {
      get() {
        return this.hotel.hotel_images
      },
      set(value) {
        this.$store.commit('hotels/SET_IMAGES_ORDER', value)
        this.$store.dispatch('hotels/setImagesOrder', value)
      }
    }
  },
  filters: {
    imgSRC(src) {
      return `${process.env.baseUrl}/storage/${src}`;
    },
  },
  methods: {
    openDialog(img) {
      this.src = img.file_name;
      this.id = img.id;
      this.dialog = true;
    },
    async uploadImage() {
      this.loading = true

      if (this.image.length > 1) {
        for (let i = 0; i < this.image.length; i++ ) {
          const formData = new FormData();
          formData.append("file", this.image[i]);
          await this.$store.dispatch('hotels/images/uploadImage', formData)
        }
      } else if (this.image.length === 1){
        const formData = new FormData();
        const file = this.image[0]
        formData.append("file", file);
        await this.$store.dispatch('hotels/images/uploadImage', formData)
      }

      await this.$store.dispatch('hotels/getById', this.hotel.id)
      this.loading = false
      this.image = null
      this.$notifier.showMessage({ content: 'Image successfully uploaded!' })
    }
  }
};
</script>

<style lang="scss">
.hotel-images {
  .v-input__prepend-outer {
    margin-bottom: 0 !important;
  }
}
</style>