<template>
  <div
    id="app"
    class="flex align-center justify-center direction-column"
    :class="{
      'is-dark': dark
    }"
  >
    <h1 class="mb-3">
      VueSelectInputUi
    </h1>
    <div class="flex space-between mb-4">
      <a
        href="https://github.com/LouisMazel/vue-select-input-ui"
        target="_blank"
        class="btn mr-2"
        :class="[dark ? 'btn--white' : 'btn--black']"
      >
        GITHUB
      </a>
      <a
        href="http://npmjs.com/package/vue-select-input-ui"
        target="_blank"
        class="btn btn--danger mr-2"
      >
        NPM
      </a>
    </div>
    <div class="flex flex-center mb-4">
      <button
        class="btn mr-2"
        @click="dark = !dark"
      >
        TOGGLE DARK MODE
      </button>
    </div>
    <div class="container">
      <VueSelectInputUi
        id="VueSelectInput2"
        v-model="selectedValue"
        name="VueSelectInput2"
        :options="optionsList"
        label="Choose option"
        color="dodgerblue"
        class="mb-3"
        :dark="dark"
      />

      <VueSelectInputUi
        id="VueSelectInput3"
        v-model="selectedValue"
        name="VueSelectInput3"
        :options="optionsList"
        label="Custom item template"
        color="purple"
        class="mb-3"
        size="lg"
        :item-height="40"
        :border-radius="4"
        :dark="dark"
      >
        <template v-slot="{ option }">
          <p>{{ option.label }} = {{ option.value }}</p>
        </template>
      </VueSelectInputUi>

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
        :item-height="20"
        :dark="dark"
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
        :border-radius="16"
        :dark="dark"
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
        :dark="dark"
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
        :item-height="60"
        :dark="dark"
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
        :dark="dark"
      />

      <VueSelectInputUi
        id="VueSelectInputValid"
        v-model="selectedValue"
        name="VueSelectInputValid"
        :options="optionsList"
        label="Valid input"
        class="mb-3"
        valid
        :dark="dark"
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
        dark: false,
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

<style lang="scss">
  @import './scss/main.scss';
</style>

<style lang="scss" scoped>
  @import 'style-helpers';

  #app {
    .container {
      width: 300px;
    }

    &.is-dark {
      background-color: black;

      h1 {
        color: white;
      }
    }
  }
</style>
