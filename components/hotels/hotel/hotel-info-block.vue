<template>
  <v-card
    :height="height"
    class="pa-0 ma-0"
    outlined
    elevation="3"
  >
    <v-card-title
      style="line-height: 1"
      class="
        ma-0 py-1 px-4 d-flex
        justify-space-between
        align-center"
    >
      <h4  class="subtitle-1">{{ title }}</h4>
      <slot name="actions"></slot>
    </v-card-title>
    <hr v-if="hideDivider" />
    <slot name="main"></slot>
  </v-card>
</template>

<script>
export default {
  name: 'InfoBlock',
  props: {
    title: {
      type: String,
      required: true
    },
    height: {
      type: String,
      required: false,
      default: () => '136'
    },
    hideDivider: {
      type: Boolean,
      required: false,
      default: () => true
    }
  },
  name: 'TitleTemplate'
}
</script>