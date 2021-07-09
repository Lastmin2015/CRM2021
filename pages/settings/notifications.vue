<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Hotel price
    </h2>
    <v-tabs
      centered
      slot="extension"
    >
      <v-tab to="/settings/">
        General
      </v-tab>
      <v-tab to="/settings/custom-fields">
        Custom Fields
      </v-tab>
      <v-tab to="/settings/notifications">
        Notifications
      </v-tab>
    </v-tabs>
    <v-row>
      <v-col md="12">
        <v-card class="mt-2">
          <v-toolbar
            class="my-1"
            height="30px"
            flat
          >
            <h4 class="subtitle-1">
              Fields
            </h4>
          </v-toolbar>
          <hr>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  name: 'Notifications'
}
</script>

<style scoped>
.v-tab {
  max-width: 370px;
}
</style>
