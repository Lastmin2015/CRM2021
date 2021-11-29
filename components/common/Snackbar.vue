<template>
  <v-snackbar
      v-model="show"
      timeout="5000"
    >
      {{ message }}
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
</template>

<script>
export default {
  name: "Snackbar",
  data() {
    return {
      show: false,
      message: "",
      color: "",
    };
  },

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === "snackbar/showMessage") {
        this.message = state.snackbar.content;
        this.color = state.snackbar.color;
        this.show = true;
      }
    });
  },
};
</script>