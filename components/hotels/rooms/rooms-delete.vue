<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Delete Room type</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5 black--text body-2">
        Would you like to delete <strong> {{ name }} </strong>?
      </v-card-text>

      <v-card-actions>
        <v-btn
          text
          @click="$emit('dialog', false)"
        > Cancel </v-btn>

        <v-spacer></v-spacer>

        <v-btn
          text
          color="red"
          @click="deleteRoomHandler"
          :loading="loading"
        >
          Delete
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RoomsDelete",

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
      loading: false
    }
  },

  computed: {
    dialogValue: {
      get() {
        return this.dialog;
      },
      set(newVal) {
        this.$emit("dialog", newVal);
      },
    }
  },

  methods: {
    ...mapActions({
      deleteRoom: "hotels/rooms/deleteRoom",
      deleteRoomName: "hotels/rooms/deleteRoomName",
    }),

    async deleteRoomHandler() {
      try {
        this.loading = true

        const { id, room_type: { id: roomID } } = this.room

        await this.deleteRoom({ id, roomID })

        this.$emit('dialog', false)
        this.$notifier.showMessage({ content: 'Room type was successfully deleted' })

      } catch (err) {
        this.$notifier.showMessage({ content: err })
      } finally {
        this.loading = false
      }
    }
  },

  watch: {
    dialog(value) {
      if (value) this.name = this.room.room_type.name
    }
  }
}
</script>