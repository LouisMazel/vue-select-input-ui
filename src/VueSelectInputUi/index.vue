<template>
  <div
    class="maz-select"
    :class="[{
      'has-list-open': hasListOpen,
      'is-dark': dark
    }]"
    @click.stop="toggleList"
  >
    <MazInput
      ref="textField"
      :value="valueShown"
      v-bind="$attrs"
      readonly
      :label="label"
      :disabled="disabled"
      :border-radius="borderRadius"
      :dark="dark"
      :color="color"
      @keydown="keyboardNav"
      @keyup="$emit('keyup', $event)"
      @blur.capture="handleBlur"
      @change="$emit('change', $event)"
    >
      <div
        slot="input-icon-right"
        class="maz-select__toggle"
      >
        <!-- The arrow icon -->
        <slot name="arrow">
          <!-- the arrow svg -->
          <svg
            mlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            class="maz-select__toggle__arrow"
          >
            <path
              class="arrow"
              d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"
            />
            <path
              fill="none"
              d="M0 0h24v24H0V0z"
            />
          </svg>
        </slot>
      </div>
    </MazInput>
    <transition name="slide">
      <div
        v-show="hasListOpen"
        ref="optionsList"
        class="maz-select__options-list"
        :style="[itemListHeight, borderRadiusStyle]"
      >
        <button
          v-for="({ label: l, value: v }, i) in options"
          :key="i"
          tabindex="-1"
          type="button"
          :class="[
            {'selected': value === v},
            {'keyboard-selected': tmpValue === v}
          ]"
          class="flex align-center maz-select__options-list__item"
          :style="[optionHeight, value === v ? bgColorItem : null]"
          @click.stop="updateValue(v)"
        >
          <!-- Item template -->
          <slot
            :option="{ label: l, value: v }"
            tag="div"
          >
            <!-- `<p>item value</p>` -->
            <div
              class="dots-text"
              :class="{
                'text-muted': !v && value !== v
              }"
            >
              {{ l }}
            </div>
          </slot>
        </button>
      </div>
    </transition>
  </div>
</template>

<script>
  import MazInput from './MazInput'
  import uniqueId from './mixins/uniqueId'

  /**
   * > Beautiful select input
   */

  export default {
    name: 'MazSelect',
    components: { MazInput },
    mixins: [uniqueId],
    props: {
      // is the value of the input
      value: {
        required: true,
        validator: prop => ['number', 'string', 'boolean'].includes(typeof prop) || prop === null
      },
      // list of the options
      options: { type: Array, required: true },
      // When is `true` the select is disabled
      disabled: { type: Boolean, default: false },
      // When is `true` the select has the dark style
      dark: { type: Boolean, default: false },
      // Item in list height in pixel
      itemHeight: { type: Number, default: 35 },
      // List height in pixel
      listHeight: { type: Number, default: 210 },
      // The input label
      label: { type: String, default: 'Select option' },
      // border radius value for input & list corner
      borderRadius: { type: Number, default: 8 },
      // input & item selected color
      color: { type: String, default: 'dodgerblue' }
    },
    data () {
      return {
        selectedIndex: null,
        hasListOpen: false,
        query: '',
        tmpValue: this.value,
        indexItemToShow: 0
      }
    },
    computed: {
      optionHeight () {
        return {
          height: `${this.itemHeight}px`
        }
      },
      itemListHeight () {
        return {
          maxHeight: `${this.listHeight}px`
        }
      },
      tmpValueIndex () {
        return this.options.findIndex(c => c.value === this.tmpValue)
      },
      selectedValueIndex () {
        return this.value
          ? this.options.findIndex(c => c.value === this.value)
          : null
      },
      valueShown () {
        const valueSelected = this.options.filter(c => c.value === this.value)[0]
        return valueSelected && valueSelected.value ? valueSelected.label : null
      },
      borderRadiusStyle () {
        return {
          borderRadius: `${this.borderRadius}px`
        }
      },
      bgColorItem () {
        return {
          backgroundColor: this.color
        }
      }
    },
    watch: {
      value (val) {
        this.tmpValue = val
      }
    },
    methods: {
      handleBlur (e) {
        if (this.$el.contains(e.relatedTarget)) return
        // sent when the input is blur
        this.$emit('blur')
        this.closeList()
      },
      toggleList (e) {
        e.view.event.preventDefault()
        this.hasListOpen ? this.closeList() : this.openList()
      },
      openList () {
        if (!this.disabled) {
          if (this.disabled) return
          // sent when the list is open
          this.$emit('open')
          // sent when the input is focus
          this.$emit('focus')
          this.hasListOpen = true
          this.selectFirstValue()
          this.$refs.textField.focusInput()
          if (this.value && this.hasListOpen) this.scrollToSelectedOnFocus(this.selectedValueIndex)
        }
      },
      closeList () {
        // sent when the list is close
        this.$emit('close')
        this.hasListOpen = false
      },
      async reset () {
        this.closeList()
        await this.$nextTick()
        this.$refs.textField.focusInput()
      },
      selectFirstValue () {
        if (this.value) return
        const value = this.options[0].value || null
        this.tmpValue = value
        // return the select input
        // @arg the option value selected
        this.$emit('input', value)
      },
      async updateValue (val) {
        this.tmpValue = val
        this.$emit('input', val || null)
        await this.$nextTick()
        this.reset()
      },
      scrollToSelectedOnFocus (arrayIndex) {
        this.$nextTick(() => {
          this.$refs.optionsList.scrollTop = arrayIndex * this.itemHeight - (this.itemHeight * 3)
        })
      },
      keyboardNav (e) {
        const code = e.keyCode
        if (code === 40 || code === 38) {
          if (e.view && e.view.event) {
            // TODO : It's not compatible with FireFox
            e.view.event.preventDefault()
          }
          if (!this.hasListOpen) this.openList()
          let index = code === 40 ? this.tmpValueIndex + 1 : this.tmpValueIndex - 1
          if (index === -1 || index >= this.options.length) {
            index = index === -1
              ? this.options.length - 1
              : 0
          }
          this.tmpValue = this.options[index].value
          this.scrollToSelectedOnFocus(index)
        } else if (code === 13) {
          // enter key
          this.hasListOpen ? this.updateValue(this.tmpValue) : this.openList()
        } else if (code === 27) {
          // escape key
          this.closeList()
        } else {
          // typing an option's name
          this.searching(e)
        }
      },
      searching (e) {
        const code = e.keyCode
        clearTimeout(this.queryTimer)
        this.queryTimer = setTimeout(() => {
          this.query = ''
        }, 2000)
        const q = String.fromCharCode(code)
        if (code === 8 && this.query !== '') {
          this.query = this.query.substring(0, this.query.length - 1)
        } else if (/[a-zA-Z-e ]/.test(q)) {
          if (!this.hasListOpen) this.openList()
          this.query += q.toLowerCase()
          const resultIndex = this.options.findIndex(o => {
            this.tmpValue = o.value
            return o.label.toLowerCase().startsWith(this.query)
          })
          if (resultIndex !== -1) {
            this.scrollToSelectedOnFocus(resultIndex)
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'style-helpers';

  .maz-select {
    position: relative;
    user-select: none;

    &__toggle {
      transition: all .25s cubic-bezier(.645, .045, .355, 1);
      cursor: pointer;
      height: 24px;

      &__arrow {
        color: $secondary-color;

        .arrow {
          fill: $secondary-color;
        }
      }
    }

    &__options-list {
      z-index: 9;
      padding: 0;
      list-style: none;
      overflow-y: auto;
      overflow-x: hidden;
      margin: 0;
      max-width: 100%;
      position: absolute;
      top: calc(100% + .143em);
      border-radius: $border-radius;
      width: 100%;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, .14), 0 1px 5px 0 rgba(0, 0, 0, .12);
      background-color: $bg-color;

      &__item {
        padding: 0 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: .857em;
        cursor: pointer;
        background-color: transparent;
        border: none;
        color: $text-color;
        width: 100%;
        outline: none;

        &:hover,
        &.keyboard-selected {
          background-color: darken($hover-color, 5%);
        }

        &.selected {
          color: white;
          background-color: $primary-color;
          font-weight: 600;
        }
      }
    }

    &.has-list-open {
      .maz-select {
        &__toggle {
          transform: rotate(180deg);
        }
      }
    }

    &.is-dark {
      .maz-select__toggle {
        transition: all .25s cubic-bezier(.645, .045, .355, 1);
        cursor: pointer;
        height: 24px;

        &__arrow {
          color: $secondary-color-dark !important;
        }
      }

      .maz-select__options-list {
        background-color: $bg-color-dark;

        &__item {
          color: $secondary-color-dark;

          &:hover,
          &.keyboard-selected {
            background-color: lighten($hover-color-dark-l, 5%);
          }

          &.selected {
            color: white;
            background-color: $primary-color;
            font-weight: 600;
          }
        }
      }
    }
  }
</style>
