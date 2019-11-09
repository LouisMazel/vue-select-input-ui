<template>
  <div
    :id="uniqueId"
    ref="VueSelectInputUi"
    v-click-outside="closeList"
    :style="[cssTheme]"
    :class="[{
      'is-focused': isFocus,
      'has-value': value,
      'has-hint': hint,
      'has-error': error,
      'is-disabled': disabled,
      'is-dark': dark,
      'is-valid': valid
    }, size]"
    class="select-input-ui"
    @click="focusInput"
  >
    <input
      :id="id"
      ref="SelectInputUiInput"
      v-bind="$attrs"
      :name="name"
      :value="valueShown"
      :placeholder="labelShown"
      :disabled="disabled"
      :required="required"
      class="select-input-ui__input"
      readonly
      @focus="openList"
      @keydown="keyboardNav"
      @click="$emit('click')"
    >
    <div
      class="select-input-ui__toggle"
      @click="focusInput"
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
      class="select-input-ui__label"
    >
      {{ hintValue || labelShown }}
    </label>
    <Transition name="slide">
      <div
        v-show="isFocus"
        ref="optionsList"
        class="select-input-ui__options-list"
        :style="[itemListHeight]"
      >
        <div
          v-for="({ label: l, value: v }, i) in options"
          :key="i"
          :class="[
            {'selected': value === v},
            {'keyboard-selected': tmpValue === v}
          ]"
          class="flex align-center select-input-ui__options-list__item"
          :style="[optionHeight]"
          @click.stop="updateValue(v)"
        >
          <div
            class="dots-text"
            :class="{
              'text-muted': !v
            }"
          >
            {{ l }}
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script>
  import { directive } from 'v-click-outside'
  import cssVars from 'css-vars-ponyfill'

  import getTheme from './themes'

  export default {
    name: 'VueSelectInputUi',
    directives: {
      clickOutside: directive
    },
    props: {
      itemHeight: { type: Number, default: 30 },
      listHeight: { type: Number, default: 210 },
      borderRadius: { type: Number, default: 4 },
      value: { type: [String, Object], default: null },
      label: { type: String, default: 'Select option' },
      hint: { type: String, default: null },
      size: { type: String, default: null },
      error: { type: Boolean, default: Boolean },
      disabled: { type: Boolean, default: false },
      required: { type: Boolean, default: false },
      valid: { type: Boolean, default: false },
      validColor: { type: String, default: 'yellowgreen' },
      color: { type: String, default: 'dodgerblue' },
      dark: { type: Boolean, default: false },
      darkColor: { type: String, default: '#424242' },
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
      uniqueId () {
        return `${this.id}-${this._uid}`
      },
      cssTheme () {
        const { dark, color, darkColor, validColor, borderRadius } = this
        return getTheme(
          {
            dark,
            color,
            darkColor,
            validColor,
            borderRadius,
            lightColor: '#FFFFFF'
          }
        )
      },
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
        return valueSelected ? valueSelected.label : null
      },
      labelShown () {
        let label = this.label
        if (this.required && label) label += ` *`
        return label
      },
      hintValue () {
        let hint = this.hint
        if (this.required && hint) hint += ` *`
        return hint
      }
    },
    watch: {
      value (val) {
        this.tmpValue = val
      },
      dark () {
        this.setCssVars()
      }
    },
    mounted () {
      this.setCssVars()
    },
    methods: {
      setCssVars () {
        cssVars({
          variables: this.cssTheme
        })
      },
      focusInput () {
        this.$refs.SelectInputUiInput.focus()
      },
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
        this.$refs.SelectInputUiInput.blur()
        this.$emit('blur')
        this.isFocus = false
      },
      updateValue (val) {
        this.tmpValue = val
        this.$emit('input', val || null)
        this.closeList()
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
          // escape key
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
  @import 'style-helpers';

  $primary-color: var(--primary-color);
  $second-color: var(--second-color);
  $third-color: var(--third-color);
  $muted-color: var(--muted-color);
  $hover-color: var(--hover-color);
  $bg-color: var(--bg-color);
  $valid-color: var(--valid-color);
  $border-radius: var(--border-radius);
  $error-color: orangered;
  $disabled-color: #747474;
  $primary-color-transparency: var(--primary-color-transparency);
  $error-color-transparency: var(--error-color-transparency);
  $valid-color-transparency: var(--valid-color-transparency);

  .text-muted {
    color: $muted-color;
  }

  .select-input-ui {
    font-family: Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    position: relative;
    height: 42px;
    min-height: 42px;

    &__label {
      position: absolute;
      top: 3px;
      cursor: pointer;
      left: 11px;
      transform: translateY(25%);
      opacity: 0;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      font-size: 11px;
      color: $second-color;
    }

    &__input {
      cursor: pointer;
      transition: all 0.25s cubic-bezier(0.645, 0.045, 0.355, 1);
      background-color: $bg-color;
      position: relative;
      width: 100%;
      height: 42px;
      min-height: 42px;
      padding-right: 18px;
      padding-left: 10px;
      font-weight: 400;
      outline: none;
      border: 1px solid $third-color;
      border-radius: $border-radius;
      font-size: 13px;
      z-index: 0;

      &::-webkit-input-placeholder {
        color: $second-color;
      }

      &::-moz-placeholder {
        color: $second-color;
      }

      &:-ms-input-placeholder {
        color: $second-color;
      }

      &::-ms-input-placeholder {
        color: $second-color;
      }

      &:-moz-placeholder {
        color: $second-color;
      }

      &::placeholder {
        color: $second-color;
      }
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
        color: $second-color;
        font-size: 15px;
        transform: scaleY(0.5);
      }
    }

    &__options-list {
      padding: 0;
      list-style: none;
      min-width: 230px;
      overflow-y: auto;
      overflow-x: hidden;
      z-index: 9;
      margin: 0;
      max-width: 100%;
      position: absolute;
      top: 100%;
      border-radius: $border-radius;
      width: 100%;
      box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
      background-color: $bg-color;

      &__item {
        padding: 0 10px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        font-size: 12px;
        cursor: pointer;

        &:hover,
        &.keyboard-selected {
          background-color: $hover-color;
        }

        &.selected {
          color: #FFF;
          background-color: $primary-color;
          font-weight: 600;
        }
      }
    }

    &.has-value,
    &.has-hint {
      .select-input-ui__label {
        opacity: 1;
        transform: translateY(0);
        font-size: 11px;
      }

      .select-input-ui__input {
        padding-top: 14px;
      }
    }

    &.is-focused {
      .select-input-ui__toggle {
        transform: rotate(180deg);
      }

      .select-input-ui__input {
        border-color: $primary-color;
        box-shadow: 0 0 0 0.2rem $primary-color-transparency;
      }

      .select-input-ui__label {
        color: $primary-color;
      }
      &.is-valid {
        .select-input-ui {
          &__input {
            border-color: $valid-color;
            box-shadow: 0 0 0 0.2rem $valid-color-transparency;
          }
          &__label {
            color: $valid-color;
          }
        }
      }
    }

    &.has-error {
      .select-input-ui__input {
        border-color: $error-color;
      }

      &.is-focused {
        .select-input-ui__input {
          box-shadow: 0 0 0 0.2rem $error-color-transparency;
        }
      }

      .select-input-ui__label {
        color: $error-color;
      }
    }

    &.is-dark:not(.is-disabled) {
      .select-input-ui__input {
        color: #F2F2F2;
      }
      .select-input-ui__options-list__item {
        color: $second-color;
      }
    }

    &.is-disabled {
      cursor: not-allowed;

      .select-input-ui__input {
        border-color: #CCC;
        background-color: #F2F2F2;
        color: $disabled-color;

        &::-webkit-input-placeholder {
          color: $disabled-color;
        }

        &::-moz-placeholder {
          color: $disabled-color;
        }

        &:-ms-input-placeholder {
          color: $disabled-color;
        }

        &::-ms-input-placeholder {
          color: $disabled-color;
        }

        &:-moz-placeholder {
          color: $disabled-color;
        }

        &::placeholder {
          color: $disabled-color;
        }
      }

      .select-input-ui__label,
      .select-input-ui__input,
      .select-input-ui__toggle__arrow {
        cursor: not-allowed;
        color: $disabled-color;
      }
    }

    &.lg {
      height: 48px;
      min-height: 48px;

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

    &.sm {
      height: 36px;
      min-height: 36px;

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
