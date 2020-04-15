<template>
  <div
    ref="parent"
    :class="[{
      'is-focused': isFocus,
      'is-valid': valid,
      'has-value': value,
      'has-error': error,
      'is-disabled': disabled,
      'is-dark': dark,
      'has-hint': hint,
      'has-no-label': !hasLabel && !hint,
      'has-left-icon': hasLeftIcon,
      'has-right-icon': hasRightIcon
    }, size]"
    class="maz-input"
    @click="focusInput"
    @mouseenter="hoverHandler(true)"
    @mouseleave="hoverHandler(false)"
  >
    <div
      v-for="({ name, position }, i) in inputIcons"
      :key="`input-icon-${i}`"
      class="maz-input__icon flex"
      :class="[
        position,
        textarea ? 'align-start pt-2' : 'align-center'
      ]"
    >
      <!-- Icon slot (`input-icon-left` / `input-icon-right`) -->
      <slot :name="`input-icon-${position}`">
        <i class="material-icons">{{ name }}</i>
      </slot>
    </div>
    <input
      v-if="!textarea"
      :id="uniqueId"
      ref="MazInput"
      v-model="inputValue"
      v-bind="$attrs"
      :placeholder="labelValue"
      :type="getType"
      class="maz-input__input"
      :aria-label="label"
      :class="{
        'has-right-btn': hasClearBtn || hasPasswordBtn
      }"
      :style="[borderRadiusStyle, bgStyle, borderStyle]"
      :disabled="disabled"
      :required="required"
      :readonly="readonly"
      @keydown="keyDown"
      @keyup="keyUp"
      @focus="onFocus"
      @blur="onBlur"
      @change="$emit('change', $event)"
      @click="$emit('click', $event)"
    >
    <textarea
      v-else
      :id="uniqueId"
      ref="MazInput"
      v-model="inputValue"
      v-bind="$attrs"
      :placeholder="labelValue"
      :type="type"
      :required="required"
      :readonly="readonly"
      class="maz-input__input textarea"
      @keydown="keyDown"
      @keyup="keyUp"
      @focus="onFocus"
      @blur="onBlur"
      @click="$emit('click', $event)"
    />
    <label
      v-if="hasLabel || hint"
      ref="label"
      :for="uniqueId"
      :class="error ? 'text-danger' : null"
      :style="[colorStyle]"
      class="maz-input__label"
      @click="focusInput"
    >
      {{ hintValue || labelValue }}
    </label>
    <transition-group
      name="scale"
    >
      <button
        v-if="hasClearBtn"
        key="clear-button"
        class="maz-input__toggle-btn --clear flex flex-center"
        title="clear"
        type="button"
        tabindex="-1"
        :class="{ 'has-right-icon': hasRightIcon }"
        @click="clear"
      >
        <span class="maz-input__toggle-btn__effect" />
        <i class="maz-input__toggle-btn__icon material-icons">
          close
        </i>
      </button>

      <button
        v-if="hasPasswordBtn"
        key="password-button"
        class="maz-input__toggle-btn password flex flex-center"
        :class="{
          'has-clear-btn': hasClearBtn,
          'has-right-icon': hasRightIcon
        }"
        title="clear"
        type="button"
        tabindex="-1"
        @click="showPassword = !showPassword"
      >
        <span class="maz-input__toggle-btn__effect" />
        <i class="maz-input__toggle-btn__icon material-icons">
          {{ showPassword ? 'visibility_off' : 'visibility' }}
        </i>
      </button>
    </transition-group>

    <div
      v-if="loading"
      class="maz-input__loader"
      :class="{ textarea }"
    >
      <div
        class="maz-input__loader__progress-bar"
      />
    </div>
  </div>
</template>

<script>
  import uniqueId from './../mixins/uniqueId'
  import { HexToRgba, isColorName, colorNameToHex } from 'color-transformer-ui'

  /**
   * > Beautiful input UI with loading & error manager
   */

  export default {
    name: 'MazInput',
    mixins: [uniqueId],
    props: {
      // value of the input
      value: {
        required: true,
        validator: prop => ['number', 'string'].includes(typeof prop) || prop === null
      },
      // input id
      id: { type: String, default: null },
      // value of the input
      label: { type: String, default: 'Enter text' },
      // replace the label if is present
      hint: { type: String, default: null },
      // input size (`'lg'` / `'sm'`)
      size: { type: String, default: null },
      // is the input size (`text` or `number`)
      type: { type: String, default: 'text' },
      // should be a [material icon](https://material.io/resources/icons/) name
      leftIconName: { type: String, default: null },
      // should be a [material icon](https://material.io/resources/icons/) name
      rightIconName: { type: String, default: null },
      // When is `true` the input has the error style (red)
      error: { type: Boolean, default: false },
      // When is `true` the input is disable
      disabled: { type: Boolean, default: false },
      // When is `true` the input has the dark theme
      dark: { type: Boolean, default: false },
      // When is `true` the input is on readonly mode
      readonly: { type: Boolean, default: false },
      // When is `true` the input has the valid style (green)
      valid: { type: Boolean, default: false },
      // When is `true` the input become required & has the `*` symbol
      required: { type: Boolean, default: false },
      // When is `true` the input is a textarea
      textarea: { type: Boolean, default: false },
      // When is `true` the input is a textarea
      loading: { type: Boolean, default: false },
      // When is `true` the input can be clear with a button on the right
      clearable: { type: Boolean, default: false },
      // When is `true` the input has not label
      noLabel: { type: Boolean, default: false },
      // When is `true` and is `required`, the `*` symbol is not showing
      noRequiredSymbol: { type: Boolean, default: false },
      // border radius input
      borderRadius: { type: Number, default: 8 },
      // input border & label color
      color: { type: String, default: 'dodgerblue' },
      // Dark color: input border & label
      darkColor: { type: String, default: '#21222E' },
      // valid color: input border & label
      validColor: { type: String, default: 'yellowgreen' },
      // error color: input border & label
      errorColor: { type: String, default: 'orangered' }
    },
    data () {
      return {
        isFocus: false,
        showPassword: false,
        isHover: false
      }
    },
    computed: {
      inputValue: {
        get () {
          return this.value
        },
        set (value) {
          // return the input value (in `@input` or `v-model`)
          // @arg input
          this.$emit(
            'input',
            this.hasNumberType
              ? !value ? 0 : parseInt(value)
              : value
          )
        }
      },
      labelValue () {
        let { label } = this
        if (this.required && label && !this.noRequiredSymbol) label += ` *`
        return label
      },
      hintValue () {
        let { hint } = this
        if (this.required && hint) hint += ` *`
        return hint
      },
      hasNumberType () {
        return this.type === 'number'
      },
      hasLabel () {
        return !this.noLabel
      },
      getType () {
        return this.showPassword ? 'text' : this.type
      },
      hasPasswordBtn () {
        return this.type === 'password' && this.inputValue
      },
      hasClearBtn () {
        return this.clearable && this.inputValue && !this.textarea
      },
      hasLeftIcon () {
        return this.leftIconName || this.$slots['input-icon-left']
      },
      hasRightIcon () {
        return this.rightIconName || this.$slots['input-icon-right']
      },
      inputIcons () {
        return [
          ...(this.hasLeftIcon ? [{ position: 'left', name: this.leftIconName }] : []),
          ...(this.hasRightIcon ? [{ position: 'right', name: this.rightIconName }] : [])
        ]
      },
      colorStyle () {
        const color = this.isHover || this.isFocus
          ? this.error
            ? this.errorColor
            : this.valid
              ? this.validColor
              : this.color
          : null
        return {
          color,
          fill: color
        }
      },
      borderStyle () {
        const color = this.isHover || this.isFocus
          ? this.error
            ? this.errorColor
            : this.valid
              ? this.validColor
              : this.color
          : null
        return {
          borderColor: color,
          boxShadow: this.isFocus
            ? `0 0 0 .143rem ${isColorName(color) ? HexToRgba(colorNameToHex(color), 0.7) : HexToRgba(color, 0.7)}`
            : null
        }
      },
      bgStyle () {
        return {
          backgroundColor: this.dark ? this.darkColor : 'white'
        }
      },
      borderRadiusStyle () {
        return {
          borderRadius: `${this.borderRadius}px`
        }
      }
    },
    methods: {
      hoverHandler (value) {
        if (!this.disabled) this.isHover = value
      },
      focusInput () {
        this.$refs.MazInput.focus()
      },
      onFocus (e) {
        // sent the focus event
        // @arg event
        this.$emit('focus', e)
        this.isFocus = true
      },
      onBlur (e) {
        // sent the blur event
        // @arg event
        this.$emit('blur', e)
        this.isFocus = false
      },
      clear () {
        this.$emit(
          'input',
          this.hasNumberType ? 0 : ''
        )
        // sent when the input is clear
        this.$emit('clear')
      },
      keyUp (e) {
        // sent the keyup event
        // @arg event
        this.$emit('keyup', e)
      },
      keyDown (e) {
        // sent the keydown event
        // @arg event
        this.$emit('keydown', e)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import 'style-helpers';

  .maz-input {
    position: relative;

    &__label {
      position: absolute;
      top: 4px;
      cursor: pointer;
      left: 13px;
      transform: translateY(25%);
      opacity: 0;
      transition: all .25s cubic-bezier(.645, .045, .355, 1);
      font-size: .786em;
      color: $muted-color;
      z-index: 0;
    }

    &__input {
      cursor: pointer;
      background-color: $bg-color;
      transition-duration: .3s;
      position: relative;
      width: 100%;
      padding: 0 12px;
      font-weight: 400;
      appearance: none;
      outline: none;
      border: 1px solid $third-color;
      border-radius: $border-radius;
      font-size: 1em;
      z-index: 1;
      caret-color: $primary-color;

      &:not(.textarea) {
        height: 40px;
        min-height: 40px;
      }

      &.textarea {
        padding: 8px 12px 0 12px;
        min-height: 88px !important;
        resize: vertical;
      }

      &.has-right-btn {
        padding-right: 30px;
      }

      &:hover {
        border-color: $primary-color;
      }

      &::-webkit-input-placeholder {
        color: $muted-color;
      }

      &::-moz-placeholder {
        color: $muted-color;
      }

      &:-ms-input-placeholder {
        color: $muted-color;
      }

      &::-ms-input-placeholder {
        color: $muted-color;
      }

      &:-moz-placeholder {
        color: $muted-color;
      }

      &::placeholder {
        color: $muted-color;
      }

      &__input:-webkit-autofill,
      &__input:-webkit-autofill:hover,
      &__input:-webkit-autofill:focus,
      &__input:-webkit-autofill:active {
        box-shadow: 0 0 0 1000px $bg-color inset !important;
        -webkit-text-fill-color: $muted-color !important;
      }
    }

    &__icon {
      position: absolute;
      z-index: 2;
      color: $disabled-color;
      font-size: 1.286em;
      top: 0;
      bottom: 0;
      cursor: pointer;

      &.left {
        left: 8px;
      }

      &.right {
        right: 8px;
      }
    }

    &__toggle-btn {
      $clear-size: 24px;

      position: absolute;
      top: 0;
      bottom: 0;
      right: 8px;
      margin: auto 0;
      width: $clear-size;
      height: $clear-size;
      appearance: none;
      border: none;
      background: transparent;
      color: $muted-color;
      border-radius: $clear-size;
      cursor: pointer;
      font-size: .857em;

      &:focus {
        outline: none;
      }

      &__icon {
        position: relative;
        font-size: 1.286em;
      }

      &__effect {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: $clear-size;
        height: $clear-size;
        background-color: $muted-color;
        border-radius: $clear-size;
        transform: scale(0);
        transition: transform 200ms;
      }

      &.has-right-icon {
        right: 40px;
      }

      &.password.has-clear-btn {
        right: 40px;

        &.has-right-icon {
          right: 70px;
        }
      }

      &:hover {
        color: white;

        .maz-input__toggle-btn__effect {
          transform: scale(1);
          opacity: .6;
        }
      }
    }

    &.has-left-icon {
      .maz-input__input {
        padding-left: 40px;
      }

      .maz-input__label {
        left: 40px;
      }
    }

    &.has-right-icon {
      .maz-input__input {
        padding-right: 40px;
      }
    }

    &.is-focused {
      .maz-input {
        &__input {
          border-color: $primary-color;
          box-shadow: 0 0 0 .143rem $primary-color-transparency;
        }

        &__label {
          color: $primary-color;
        }

        &__icon {
          color: $primary-color;

          path.arrow {
            fill: $primary-color;
          }
        }
      }

      &.has-error {
        .maz-input {
          &__input {
            box-shadow: 0 0 0 .143rem $danger-color-transparency;
          }

          &__icon {
            color: $danger-color;

            path.arrow {
              fill: $danger-color;
            }
          }
        }
      }

      &.is-valid {
        .maz-input {
          &__input {
            box-shadow: 0 0 0 .143rem $success-color-transparency;
          }

          &__icon {
            color: $success-color;

            path.arrow {
              fill: $success-color;
            }
          }
        }
      }
    }

    &.has-value,
    &.has-hint {
      .maz-input__label {
        opacity: 1;
        transform: translateY(0);
        font-size: .786em;
        z-index: 2;
      }

      &:not(.has-no-label) {
        .maz-input__input {
          padding-top: 14px;

          &.textarea {
            padding-top: 20px;
          }
        }
      }
    }

    &.is-valid {
      .maz-input__input,
      .maz-input__input:hover {
        border-color: $success-color;
      }

      .maz-input__label {
        color: $success-color;
      }
    }

    &.has-error {
      .maz-input__input,
      .maz-input__input:hover {
        border-color: $danger-color;
      }

      .maz-input__label {
        color: $danger-color;
      }
    }

    &.is-disabled {
      cursor: not-allowed;

      .maz-input__input {
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

      .maz-input__label,
      .maz-input__input,
      .maz-input__toggle__arrow {
        cursor: not-allowed;
        color: $disabled-color;
      }
    }

    &.sm {
      .maz-input__input {
        font-size: .857em;

        &:not(.textarea) {
          height: 36px;
          min-height: 36px;
        }
      }

      .maz-input__label {
        font-size: .714em;
      }

      &.has-value:not(.has-no-label) {
        .maz-input__input {
          padding-top: 12px;

          &.textarea {
            padding-top: 18px;
          }
        }
      }
    }

    &.lg {
      .maz-input__input {
        font-size: 1em;

        &:not(.textarea) {
          height: 48px;
          min-height: 48px;
        }
      }

      .maz-input__label {
        font-size: 1em;
      }

      &.has-value:not(.has-no-label) {
        .maz-input__input {
          padding-top: 16px;

          &.textarea {
            padding-top: 26px;
          }
        }
      }
    }

    &__loader {
      bottom: 1px;
      height: 2px;
      left: $border-radius / 2;
      width: calc(100% - 8px);
      position: absolute;
      overflow: hidden;
      border-radius: 8px;

      &.textarea {
        bottom: 6px;
      }

      &__progress-bar {
        background-color: $primary-color;
        display: block;
        position: absolute;
        content: '';
        left: -200px;
        width: 200px;
        height: 2px;
        animation: loading 2s linear infinite;
      }
    }
  }

  .is-dark .maz-input,
  .is-dark.maz-input {
    &__label {
      color: $secondary-color-dark;
    }

    &__input {
      background-color: $bg-color-dark-l;
      border: 1px solid $third-color-dark;
      color: $secondary-color-dark;

      &:hover {
        border-color: $primary-color;
      }

      &::-webkit-input-placeholder {
        color: $secondary-color-dark;
      }

      &::-moz-placeholder {
        color: $secondary-color-dark;
      }

      &:-ms-input-placeholder {
        color: $secondary-color-dark;
      }

      &::-ms-input-placeholder {
        color: $secondary-color-dark;
      }

      &:-moz-placeholder {
        color: $secondary-color-dark;
      }

      &::placeholder {
        color: $secondary-color-dark;
      }

      &__input:-webkit-autofill,
      &__input:-webkit-autofill:hover,
      &__input:-webkit-autofill:focus,
      &__input:-webkit-autofill:active {
        box-shadow: 0 0 0 1000px $bg-color-dark inset !important;
        -webkit-text-fill-color: $secondary-color-dark !important;
      }
    }

    &__toggle-btn {
      color: $secondary-color-dark;

      &__effect {
        background-color: $muted-color-dark;
      }

      &:hover {
        color: white;
      }
    }
  }
</style>
