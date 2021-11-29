<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Edit Room type</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-text-field
          dense
          outlined
          label="Room type"
          v-model="name"
        ></v-text-field>
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          @click="$emit('dialog', false)"
        > Cancel </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          text
          color="primary"
          @click="editRoomHandler"
          :loading="loading"
          :disabled="!name"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RoomsEdit",
  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    },
    room: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      name: "",
      editableRoom: "",
      loading: false,
    };
  },
  computed: {
    dialogValue: {
      get() {
        return this.dialog;
      },
      set(newVal) {
        this.$emit("dialog", newVal);
      },
    },
  },
  methods: {
    ...mapActions({
      editRoom: "hotels/rooms/edit",
      editRoomName: "hotels/rooms/editName",
    }),
    async editRoomHandler() {
      try {
        this.loading = true

        const { id: room_type_id, created_at, updated_at, room_type: { id, locale } } = this.room

        const room = {
          id: room_type_id,
          body: {
            created_at,
            updated_at
          }
        }

        const name = {
          id,
          body: {
            locale,
            room_type_id,
            name: this.name
          }
        }

        await this.editRoom({ room, name })

        this.$emit("dialog", false)
        this.$notifier.showMessage({content: 'Room type was successfully updated'})

      } catch (err) {
        this.$notifier.showMessage({content: err})
      } finally {
        this.loading = false
      }
    },
  },
  watch: {
    dialog(value) {
      if (value) {
        this.name = this.room.room_type.name
      }
    }
  }
};
</script>