<template>
  <section>
    <v-breadcrumbs v-if="items.length" class="pa-0 ma-0" :items="items" />
    <h2 class="mt-5 mb-1">{{ title }}</h2>
    <slot name="main"></slot>
  </section>
</template>

<script>
export default {
  name: 'PageBlock',
  props: {
    items: {
      type: Array,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
}
</script>