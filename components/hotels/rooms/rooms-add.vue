<template>
  <v-dialog v-model="dialogValue" width="600px">
    <v-card tile>
      <v-toolbar flat dark color="primary">
        <v-toolbar-title>Add Room Type</v-toolbar-title>
      </v-toolbar>

      <v-card-text class="mt-5">
        <v-text-field
          dense
          outlined
          v-model="room.name"
          :rules="[v => !!v || 'Room is required']"
          label="Room type"
          required
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
          @click="addRoomHandler"
          :loading="loading"
          :disabled="!room.name"
        >
          Add
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "RoomsAdd",

  props: {
    dialog: {
      type: Boolean,
      required: false,
      default: () => false,
    }
  },

  data: () => ({
    loading: false,
    id: {
      created_at: 0,
      updated_at: 0,
    },
    room: {
      room_type_id: "",
      locale: "en",
      name: ""
    }
  }),

  computed: {
    dialogValue: {
      get() {
        return this.dialog;
      },
      set() {
        this.$emit("dialog");
      },
    },
  },

  methods: {
    ...mapActions({
      addRoom: "hotels/rooms/add",
      addRoomName: "hotels/rooms/addName",
    }),

    async addRoomHandler() {
      try {
        this.loading = true

        const data = {
          id: this.id,
          room: this.room
        }

        await this.addRoom(data)

        this.$emit('dialog')
        this.$notifier.showMessage({ content: 'New room type successfully created' })

      } catch (err) {
        this.$notifier.showMessage({ content: err })
      } finally {
        this.loading = false
      }
    },
  },

  watch: {
    dialog(value) {
      if (!value) this.room.name = ''
    }
  },
}
</script>