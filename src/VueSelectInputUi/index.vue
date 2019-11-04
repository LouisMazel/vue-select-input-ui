<template>
  <div
    ref="parent"
    v-click-outside="closeList"
    :class="[{
      'is-focused': isFocus,
      'has-value': value,
      'has-hint': hint,
      'has-error': error,
      'is-disabled': disabled,
      'is-dark': dark
    }, size]"
    class="select-input-ui"
    @click="openList"
    @keydown="keyboardNav"
  >
    <input
      :id="id"
      ref="SelectInputUiInput"
      :name="name"
      :value="labelShown"
      :placeholder="label"
      :disabled="disabled"
      :style="[borderStyle]"
      class="select-input-ui__input"
      readonly
      @focus="openList"
      @click="$emit('click')"
    >
    <div
      class="select-input-ui__toggle"
      @click="openList"
    >
      <slot name="arrow">
        <div class="select-input-ui__toggle__arrow">
          ▼
        </div>
      </slot>
    </div>
    <label
      ref="label"
      :for="id"
      :class="error ? 'text-danger' : null"
      :style="[colorStyle]"
      class="select-input-ui__label"
      @click="openList"
    >
      {{ hint || label }}
    </label>
    <Transition name="slide">
      <div
        v-show="isFocus"
        ref="optionsList"
        class="select-input-ui__options-list"
      >
        <div
          v-for="({ label: l, value: v }, i) in options"
          :key="i"
          :class="[
            {'selected': value === v},
            {'keyboard-selected': tmpValue === v}
          ]"
          class="flex align-center select-input-ui__options-list__item"
          :style="[value === v ? bgStyle : null, optionHeight]"
          @click.stop="updateValue(v)"
        >
          <div class="dots-text">
            {{ l }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
  import { directive } from 'v-click-outside'

  export default {
    name: 'VueSelectInputUi',
    directives: {
      clickOutside: directive
    },
    props: {
      itemHeight: { type: Number, default: 30 },
      value: { type: [String, Object], default: null },
      label: { type: String, default: 'Select' },
      hint: { type: String, default: String },
      size: { type: String, default: String },
      error: { type: Boolean, default: Boolean },
      disabled: { type: Boolean, default: false },
      valid: { type: Boolean, default: false },
      validColor: { type: String, default: 'yellowgreen' },
      color: { type: String, default: String },
      dark: { type: Boolean, default: false },
      id: { type: String, default: 'VueSelectInputUi' },
      name: { type: String, default: 'VueSelectInputUi' },
      options: { type: Array, default: Array, required: true }
    },
    data () {
      return {
        isFocus: false,
        selectedIndex: null,
        query: '',
        tmpValue: this.value
      }
    },
    computed: {
      borderStyle () {
        const cond = (this.isFocus && !this.error) || this.valid
        const color = this.valid ? this.validColor : this.color
        return cond ? { border: `1px solid ${color} !important` } : null
      },
      colorStyle () {
        const cond = this.isFocus || this.valid
        const color = this.valid ? this.validColor : this.color
        return cond ? { color: `${color}` } : null
      },
      bgStyle () {
        return { backgroundColor: `${this.color}` }
      },
      optionHeight () {
        return {
          height: `${this.itemHeight}px`
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
      labelShown () {
        const valueSelected = this.options.filter(c => c.value === this.tmpValue)[0]
        return valueSelected ? valueSelected.label : null
      }
    },
    watch: {
      value (val) {
        this.tmpValue = val
      }
    },
    methods: {
      openList () {
        if (!this.disabled) {
          this.$emit('focus')
          this.isFocus = true
          if (this.value) {
            this.scrollToSelectedOnFocus(this.selectedValueIndex)
          }
        }
      },
      closeList () {
        this.$emit('blur')
        this.isFocus = false
      },
      updateValue (val) {
        this.isFocus = false
        this.tmpValue = val
        this.$emit('input', val)
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
          // down arrow
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
          this.updateValue(this.tmpValue)
        } else if (code === 27) {
          this.closeList()
        } else {
          // typing an option's name
          clearTimeout(this.queryTimer)
          this.queryTimer = setTimeout(() => {
            this.query = ''
          }, 1000)
          const q = String.fromCharCode(code)
          if (code === 8 && this.query !== '') {
            this.query = this.query.substring(0, this.query.length - 1)
          } else if (/[a-zA-Z-e ]/.test(q)) {
            this.query += e.key
            const resultIndex = this.options.findIndex(o => {
              this.tmpValue = o.value
              console.log('o.label.toLowerCase()', o.value, o.label.toLowerCase().startsWith(this.query))
              return o.label.toLowerCase().startsWith(this.query)
            })
            if (resultIndex !== -1) {
              this.scrollToSelectedOnFocus(resultIndex)
            }
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  .select-input-ui {
    position: relative;

    &__label {
      position: absolute;
      top: 3px;
      cursor: pointer;
      left: 11px;
      -webkit-transform: translateY(25%);
      transform: translateY(25%);
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      font-size: 11px;
      color: rgba(0, 0, 0, 0.54);
    }

    &__input {
      cursor: pointer;
      background-color: transparent;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      position: relative;
      width: 100%;
      height: 42px;
      min-height: 42px;
      padding-right: 18px;
      padding-left: 10px;
      font-weight: 400;
      -webkit-appearance: none;
      outline: none;
      border: 1px solid rgba(0, 0, 0, 0.2);
      border-radius: 4px;
      font-size: 13px;
      z-index: 0;
    }

    &__toggle {
      position: absolute;
      right: 10px;
      top: calc(50% - 10px);
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      text-align: center;
      display: inline-block;
      cursor: pointer;

      &__arrow {
        color: #424242;
        font-size: 15px;
        transform: scaleY(0.5);
      }
    }

    &.has-error {
      .select-input-ui__input {
        border-color: orangered !important;
      }
    }

    &.has-value {
      .select-input-ui__label {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        font-size: 11px;
      }

      .select-input-ui__input {
        padding-top: 14px;
      }
    }

    &.has-hint {
      .select-input-ui__label {
        opacity: 1;
        -webkit-transform: translateY(0);
        transform: translateY(0);
        font-size: 11px;
      }

      .select-input-ui__input {
        padding-top: 14px;
      }
    }

    &.is-focused {
      .select-input-ui__toggle {
        transform: rotate(-180deg);
      }
    }

    &.is-disabled {
      .select-input-ui__input {
        border-color: #CCC;
        background-color: #F2F2F2;
      }

      .select-input-ui__label,
      .select-input-ui__input {
        cursor: default;
      }
    }

    .text-danger {
      color: orangered !important;
    }

    &__options-list {
      padding: 0;
      list-style: none;
      background: #FFF;
      max-height: 210px;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 9;
      margin: 0;
      max-width: 100%;
      position: absolute;
      top: 100%;
      border-radius: 4px;
      width: 100%;
      min-width: 230px;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);

      &__item {
        padding: 0 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px;
        cursor: pointer;

        &:hover,
        &.keyboard-selected {
          background-color: #F2F2F2;
        }

        &.selected {
          color: #FFF;
          font-weight: 600;
        }
      }
    }

    &.is-dark {
      .select-input-ui__label {
        color: rgba(255, 255, 255, 0.7);
      }

      .select-input-ui__input {
        background-color: #424242;
        border-color: rgba(255, 255, 255, 0.7);
        color: rgba(255, 255, 255, 0.7);
      }

      .select-input-ui__options-list {
        background-color: #424242;
        color: rgba(255, 255, 255, 0.7);

        &__item:hover,
        &__item.keyboard-selected {
          background-color: darken(#424242, 5%);
        }
      }

      .select-input-ui__toggle__arrow {
        color: rgba(255, 255, 255, 0.7);
      }

      &.is-disabled {
        .select-input-ui__label,
        .select-input-ui__input {
          color: #424242;
        }
      }

      ::-webkit-input-placeholder {
        /* WebKit, Blink, Edge */
        color: rgba(255, 255, 255, 0.7);
      }

      :-moz-placeholder {
        /* Mozilla Firefox 4 to 18 */
        color: rgba(255, 255, 255, 0.7);
        opacity: 1;
      }

      ::-moz-placeholder {
        /* Mozilla Firefox 19+ */
        color: rgba(255, 255, 255, 0.7);
        opacity: 1;
      }

      :-ms-input-placeholder {
        /* Internet Explorer 10-11 */
        color: rgba(255, 255, 255, 0.7);
      }

      ::-ms-input-placeholder {
        /* Microsoft Edge */
        color: rgba(255, 255, 255, 0.7);
      }

      ::placeholder {
        /* Most modern browsers support this now. */
        color: rgba(255, 255, 255, 0.7);
      }

      &.is-disabled {
        .select-input-ui__input {
          border-color: #CCC;
          background-color: #F2F2F2;
        }

        .select-input-ui__toggle__arrow {
          color: #888;
        }

        ::-webkit-input-placeholder {
          /* WebKit, Blink, Edge */
          color: #424242;
        }

        :-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #424242;
          opacity: 1;
        }

        ::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #424242;
          opacity: 1;
        }

        :-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #424242;
        }

        ::-ms-input-placeholder {
          /* Microsoft Edge */
          color: #424242;
        }

        ::placeholder {
          /* Most modern browsers support this now. */
          color: #424242;
        }
      }
    }

    &.sm {
      .select-input-ui__input {
        height: 36px;
        min-height: 36px;
        font-size: 12px;
      }

      .select-input-ui__label {
        font-size: 10px;
      }

      &.has-value {
        .select-input-ui__input {
          padding-top: 12px;
        }
      }
    }

    &.lg {
      .select-input-ui__input {
        height: 48px;
        min-height: 48px;
        font-size: 16px;
      }

      .select-input-ui__label {
        font-size: 14px;
      }

      &.has-value {
        .select-input-ui__input {
          padding-top: 18px;
        }
      }
    }

    .slide-enter-active,
    .slide-leave-active {
      opacity: 1;
      z-index: 998;
      transition: all 0.3s;
      transform: translateY(0);
    }

    .slide-enter,
    .slide-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
      z-index: 998;
      transform: translateY(-20px);
    }
  }
</style>
