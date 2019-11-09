<template>
  <div
    id="app"
    class="sidebar-ui flex align-center justify-content-center flex-direction-column"
  >
    <h1 class="mb-3">
      VueSelectInputUi
    </h1>
    <div class="container">
      <VueSelectInputUi
        id="VueSelectInput2"
        v-model="selectedValue"
        name="VueSelectInput2"
        :options="optionsList"
        label="Choose option"
        color="dodgerblue"
        class="mb-3"
      />

      <VueSelectInputUi
        id="VueSelectInput1"
        v-model="selectedValue"
        name="VueSelectInput1"
        :options="optionsList"
        label="Choose option"
        color="yellowgreen"
        class="mb-3"
        size="sm"
        required
        valid
        :item-height="20"
      />

      <VueSelectInputUi
        id="VueSelectInput3"
        v-model="selectedValue"
        name="VueSelectInput3"
        :options="optionsList"
        label="Choose option"
        color="purple"
        class="mb-3"
        size="lg"
        dark
        :item-height="40"
      />

      <VueSelectInputUi
        id="VueSelectInputBgDark"
        v-model="selectedValue"
        name="VueSelectInputBgDark"
        :options="optionsList"
        label="With different bg dark color"
        color="dodgerblue"
        dark-color="#21222e"
        class="mb-3"
        dark
      />

      <VueSelectInputUi
        id="VueSelectInput4"
        v-model="selectedValue"
        name="VueSelectInput5"
        :options="optionsList"
        label="Choose option"
        color="dodgerblue"
        class="mb-3"
        error
        hint="Error message shown"
        :item-height="50"
      />

      <VueSelectInputUi
        id="VueSelectInput5"
        v-model="selectedValue"
        name="VueSelectInput5"
        :options="optionsList"
        label="Disabled input dark"
        color="orangered"
        class="mb-3"
        disabled
        dark
        :item-height="60"
      />

      <VueSelectInputUi
        id="VueSelectInputDisabledLight"
        v-model="selectedValue"
        name="VueSelectInputDisabledLight"
        :options="optionsList"
        label="Disabled input light"
        class="mb-3"
        disabled
        :item-height="70"
      />

      <VueSelectInputUi
        id="VueSelectInputValid"
        v-model="selectedValue"
        name="VueSelectInputValid"
        :options="optionsList"
        label="Valid input"
        class="mb-3"
        valid
      />
    </div>
    <p>
      Value selected : {{ selectedValue || 'null' }}
    </p>
  </div>
</template>

<script>
  import VueSelectInputUi from './VueSelectInputUi'

  export default {
    name: 'App',
    components: {
      VueSelectInputUi
    },
    data () {
      return {
        selectedValue: null,
        optionsList: [
          { label: 'None' },
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
    }
  }
</script>

<style lang="scss" scoped>
  @import './assets/scss/main.scss';
  @import 'style-helpers';

  #app {
    .container {
      width: 300px;
    }
  }
</style>
