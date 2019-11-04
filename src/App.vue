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
        id="VueSelectInput3"
        v-model="selectedValue"
        name="VueSelectInput3"
        :options="optionsList"
        label="Choose option"
        color="dodgerblue"
        class="mb-3"
        error
        :item-height="50"
      />

      <VueSelectInputUi
        id="VueSelectInput4"
        v-model="selectedValue"
        name="VueSelectInput4"
        :options="optionsList"
        label="Disabled input"
        color="orangered"
        class="mb-3"
        disabled
        dark
        :item-height="60"
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
          { label: 'Tout', value: 'all' },
          { label: 'Nom client', value: 'from' },
          { label: 'Depuis', value: 'platform' },
          { label: 'Date de mise à jour', value: 'updated' },
          { label: 'Date de mise à jour (décroissante)', value: '-updated' },
          { label: `Date d'échéance`, value: 'due' },
          { label: `Date d'échéance (décroissante)`, value: '-due' },
          { label: 'Assigné à', value: 'assigned' }
        ]
      }
    }
  }
</script>

<style lang="scss">
  @import './assets/scss/main.scss';
  @import 'style-helpers';

  #app {
    .container {
      width: 300px;
    }
  }
</style>
