<template>
  <v-dialog v-model="dialogValue" width="600">
    <v-toolbar color="primary" dark>
      <v-toolbar-title> Hotel Classification </v-toolbar-title>
    </v-toolbar>

    <v-card style="border-top-right-radius: 0px; border-top-left-radius: 0px">
      <v-tabs v-model="tab" grow>
        <v-tab> Edit </v-tab>
        <v-tab> Add </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-text class="pt-6">
            <v-select
              dense
              outlined
              return-object
              :items="types"
              :value="typeName"
              label="Hotel Type"
              @change="(e) => (type = e.id)"
              item-text="hotel_type_name.name"
              no-data-text="No hotel types available"
            >
            <template #item="{item}">
              <div style="width: 100%" class="d-flex justify-space-between">
                {{ item.hotel_type_name.name }}
                <v-btn
                  icon
                  small
                  right
                  color="red"
                  :loading="deletingType === item.id"
                  @click.stop="deleteType(item)"
                >
                  <v-icon small>mdi-delete</v-icon>
                </v-btn>
              </div>
            </template>

            </v-select>

            <v-select
              dense
              outlined
              item-value="id"
              v-model="format"
              :items="formats"
              label="Hotel Format"
              item-text="hotel_format_name.name"
            >
              <template #item="{item}">
                <div style="width: 100%" class="d-flex justify-space-between">
                  {{ item.hotel_format_name.name }}
                  <v-btn
                    icon
                    small
                    right
                    color="red"
                    :loading="deletingType === item.id"
                    @click.stop="deleteFormat(item)"
                  >
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-select>

            <v-select
              dense
              outlined
              item-text="name"
              item-value="id"
              :items="classes"
              label="Hotel Class"
              :value="hotel.hotel_class"
              @change="(e) => (classValue = e)"
              no-data-text="No hotel classes available"
            >
              <template #item="{item}">
                <div style="width: 100%" class="d-flex justify-space-between">
                  {{ item.name }}
                  <v-btn
                    icon
                    small
                    right
                    color="red"
                    :loading="deletingType === item.id"
                    @click.stop="deleteClass(item)"
                  >
                    <v-icon small>mdi-delete</v-icon>
                  </v-btn>
                </div>
              </template>
            </v-select>
          </v-card-text>

          <v-card-actions>
            <v-btn text @click="$emit('dialog', false)"> Cancel </v-btn>
            <v-spacer></v-spacer>
            <v-btn
              text
              color="primary"
              :loading="loading"
              @click="editClassification"
            >
              Save
            </v-btn>
          </v-card-actions>
        </v-tab-item>

        <v-tab-item>
          <template v-if="showButtons">
            <div class="d-flex flex-column align-center">
              <v-btn
                width="200"
                class="my-5"
                color="primary"
                @click="showAddTypeForm"
              >
                Type
              </v-btn>

              <v-btn
                width="200"
                class="my-5"
                color="primary"
                @click="showAddFormatForm"
              >
                Format
              </v-btn>

              <v-btn
                width="200"
                class="my-5"
                color="primary"
                @click="showAddClassForm"
              >
                Class
              </v-btn>
            </div>
          </template>

          <!-- ////////////////////////////////// -->

          <template v-if="showForms">
            <template v-if="addType">
              <v-card-text class="mt-5">
                <v-text-field
                  outlined
                  dense
                  label="Name"
                  v-model="addTypeName"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn text @click="cancelAdding">
                  Cancel
                </v-btn>
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="addTypeMethod"
                  :loading="loading"
                  :disabled="!addTypeName"
                >
                  Add Type
                </v-btn>
              </v-card-actions>
            </template>

            <template v-if="addFormat">
              <v-card-text class="mt-5">
                <v-text-field
                  outlined
                  dense
                  label="Name"
                  v-model="addFormatName"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn text @click="cancelAdding">
                  Cancel
                </v-btn>
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="addFormatMethod"
                  :loading="loading"
                  :disabled="!addFormatName"
                >
                  Add Format
                </v-btn>
              </v-card-actions>
            </template>

            <template v-if="addClass">
              <v-card-text class="mt-5">
                <v-text-field
                  outlined
                  dense
                  label="Name"
                  v-model="addClassName"
                ></v-text-field>
              </v-card-text>

              <v-card-actions>
                <v-btn text @click="cancelAdding">
                  Cancel
                </v-btn>
                <v-spacer />
                <v-btn
                  text
                  color="primary"
                  @click="addClassMethod"
                  :loading="loading"
                  :disabled="!addClassName"
                >
                  Add Class
                </v-btn>
              </v-card-actions>
            </template>
          </template>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "DistanceEdit",
  props: {
    dialog: {
      type: Boolean,
      required: true,
    },
  },
  data: () => ({
    tab: null,
    loading: false,
    showForms: false,
    showButtons: true,

    type: "",
    format: "",
    classValue: "",

    addTypeName: "",
    addClassName: "",
    addFormatName: "",

    addType: false,
    addCLass: false,
    addFormat: false,

    deletingType: ''
  }),
  methods: {
    ...mapActions({
      getTypes: "hotels/types/get",
      getFormats: "hotels/formats/get",
      getClasses: "hotels/classes/get",
      editClassificationAction: "hotels/edit",
      getHotel: "hotels/getById",
      addClassAction: "hotels/classes/add",
      deleteClassAction: "hotels/classes/deleteClass",
      addTypeAction: "hotels/types/add",
      deleteTypeAction: "hotels/types/deleteType",
      addFormatAction: "hotels/formats/add",
      deleteFormatAction: "hotels/formats/deleteFormat",
    }),
    async deleteType(item) {
      this.deletingType = item.id

      const payload = {
        type: item.id,
        name: item.hotel_type_name.id
      }
      await this.deleteTypeAction(payload)
      await this.getHotel(this.hotel.id)
      this.$notifier.showMessage({
        content: "Hotel type was successfully deleted",
      });

      this.deletingType = ''
    },
    async deleteFormat(item) {
      this.deletingType = item.id

      const payload = {
        format: item.id,
        name: item.hotel_format_name.id
      }
      await this.deleteFormatAction(payload)
      await this.getHotel(this.hotel.id)
      this.$notifier.showMessage({
        content: "Hotel format was successfully deleted",
      });

      this.deletingType = ''
    },
    async deleteClass(item) {
      this.deletingType = item.id

      await this.deleteClassAction(item.id)
      await this.getHotel(this.hotel.id)
      this.$notifier.showMessage({
        content: "Hotel class was successfully deleted",
      });

      this.deletingType = ''
    },
    async editClassification() {
      this.loading = true;

      const payload = {
        id: this.hotel.id,
        data: {
          ...this.hotelNoData,
          hotel_class_id: this.classValue,
          hotel_type_id: this.type,
          hotel_format_id: this.format,
          // boarding_type_id: ["6155bc6a189714000839dc18"]
        },
      };

      await this.editClassificationAction(payload);
      this.loading = false;
      this.$emit("dialog", false);
      this.$notifier.showMessage({
        content: "Hotel classifications details were updated",
      });
    },
    showAddTypeForm() {
      this.addFormat = false
      this.addClass = false

      this.showButtons = false
      this.showForms = true
      this.addType = true
    },
    showAddFormatForm() {
      this.addType = false
      this.addClass = false

      this.showButtons = false
      this.showForms = true
      this.addFormat = true
    },
    showAddClassForm() {
      this.addType = false
      this.addFormat = false

      this.showButtons = false
      this.showForms = true
      this.addClass = true
    },
    cancelAdding() {
      this.showForms = false
      this.addFormat = false
      this.addClass = false
      this.addType = false

      this.showButtons = true

      this.addTypeName = ""
      this.addClassName = ""
      this.addFormatName = ""
    },
    async addTypeMethod() {
      this.loading = true

      const payload = {
        typeData: {
          created_at: 0,
          updated_at: 0
        },
        typeNameData: {
          name: this.addTypeName,
          locale: "en"
        }
      }

      await this.addTypeAction(payload)

      this.loading = false
      this.tab = 0
      this.addType = false
      this.addTypeName = ''
      this.showForms = false
      this.showButtons = true
      this.$notifier.showMessage({
        content: "New Hotel Type added",
      });
    },
    async addClassMethod() {
      this.loading = true

      const payload = {
        name: this.addClassName
      }

      await this.addClassAction(payload)
      this.loading = false
      this.tab = 0
      this.addClass = false
      this.addClassName = ''
      this.showForms = false
      this.showButtons = true
      this.$notifier.showMessage({
        content: "New Hotel Class added",
      });
    },
    async addFormatMethod() {
      this.loading = true

      const payload = {
        formatData: {
          show_in_filter: true,
          order: 0,
        },
        formatNameData: {
          locale: "en",
          name: this.addFormatName
        }
      }

      await this.addFormatAction(payload)
      this.loading = false
      this.tab = 0
      this.addFormat = false
      this.addFormatName = ''
      this.showForms = false
      this.showButtons = true
      this.$notifier.showMessage({
        content: "New Hotel Format added",
      });
    },
  },
  computed: {
    ...mapGetters({
      hotel: "hotels/currentHotel",
      hotelNoData: "hotels/currentHotelNoData",
      types: "hotels/types/types",
      formats: "hotels/formats/formats",
      classes: "hotels/classes/classes",
    }),
    dialogValue: {
      get() {
        return this.dialog;
      },
      set(value) {
        this.$emit("dialog", value);
      },
    },
  },
  watch: {
    tab(value) {
      if (value === 0) {
        this.showForms = false
        this.showButtons = true
      }
    }
  },
  created() {
    this.getTypes();
    this.getClasses();
    this.getFormats();

    this.classValue = this.hotelNoData.hotel_class_id;

    this.type = this.hotelNoData.hotel_type_id;
    const name = this.hotel.hotel_type.hotel_type_name.name;
    this.typeName = !!name ? name : "";

    this.format = this.hotelNoData.hotel_format_id
      ? this.hotelNoData.hotel_format_id
      : "";
  },
};
</script>