<template>
  <div>
    <v-breadcrumbs
      class="pa-0"
      :items="items"
    />
    <h2>
      Geography
    </h2>
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          text: 'Geography',
          disabled: true,
          href: '/geography'
        }
      ]
    }
  }
}
</script>
