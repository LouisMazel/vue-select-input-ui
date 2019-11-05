<template>
  <div>
    <h1>
      Component:
    </h1>
    <VueSelectInputUi
      id="VueSelectInputUi"
      v-model="value"
      :options="options"
    />
  </div>
</template>

<script>
  import VueSelectInputUi from './../VueSelectInputUi'
  export default {
    components: {
      VueSelectInputUi
    },
    data () {
      return {
        value: null,
        options: [
          { label: 'First option', value: 'first' },
          { label: 'Second option', value: 'second' },
          { label: 'Third option', value: 'third' },
          { label: 'Example 1', value: 'ex_1' },
          { label: 'Example 2', value: 'ex_2' },
          { label: 'Example 3', value: 'ex_3' },
          { label: 'Example 4', value: 'ex_4' },
          { label: 'Example 5', value: 'ex_5' },
          { label: 'Example 6', value: 'ex_6' }
        ]
      }
    },
    methods: {
      onUpdate (payload) {
        this.results = payload
      }
    }
  }
</script>
