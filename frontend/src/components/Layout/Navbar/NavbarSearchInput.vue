<template>
  <div v-click-away="closeMenu">
    <label
      v-if="label"
      class="form-label block mb-1 font-semibold text-gray-700"
      :for="id"
      >{{ label }}</label
    >
    <div class="relative">
      <input
        :id="id"
        ref="input"
        v-bind="$attrs"
        class="px-2 py-2 h-12 duration-150 leading-normal flex w-full placeholder-gray-600 text-xs text-gray-800 bg-white border border-secondary-200 font-sans text-left appearance-none outline-none transition-all"
        :class="[
          {
            'border-red-400': errors.length,
            'pl-12': withIcon === true,
            'focus:rounded-t focus:border-b-0': showSearch === true,
            ' bg-white shadow-lg border border-2 border-secondary-300':
              isFocused,
            'rounded-md': !showSearch,
          },
          classes,
        ]"
        :type="type"
        :value="value"
        @input="onInput($event)"
        @keydown="$emit('keydown', $event)"
        @blur="blur($event)"
        @keyup="$emit('keyup', $event)"
        @focus="focus($event)"
      />
      <div v-if="errors.length" class="text-secondary-600 mt-1 text-sm">
        {{ errors[0] }}
      </div>
      <svg
        v-if="errors.length"
        class="absolute text-red-600 fill-current"
        style="top: 12px; right: 12px"
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
      >
        <path
          d="M11.953,2C6.465,2,2,6.486,2,12s4.486,10,10,10s10-4.486,10-10S17.493,2,11.953,2z M13,17h-2v-2h2V17z M13,13h-2V7h2V13z"
        />
      </svg>
      <div
        v-if="withIcon"
        class="absolute left-0 top-0 bottom-0 w-12 block ml-2"
      >
        <slot name="icon"></slot>
      </div>

      <div class="absolute right-0 top-0 bottom-0 w-12 block ml-2">
        <button v-if="value != ''" @click="removeText()">
          <icon-x
            class="mt-[14px] w-5 h-5 stroke-current text-secondary-500 hover:text-secondary-800"
          />
        </button>
      </div>
      <div
        v-if="showSearch"
        ref="searchResult"
        class="absolute block left-0 bottom-0 border-t-0 border-secondary-300 -mb-6 w-full border transition-all duration-100"
        :class="{
          'border-l-2 border-r-2 border-b-2 border-secondary-300 rounded-b block':
            isFocused,
        }"
        @mousemove="isFocused = true"
        @click="(e) => (isFocused = true)"
      >
        <div class="px-2">
          <hr />
        </div>
        <slot name="searchResult"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import { mixin as VueClickAway } from "vue3-click-away";
import IconX from "../../Icons/IconX.vue";

export default {
  name: "SearchTextInput",
  mixins: [VueClickAway],
  inheritAttrs: false,
  props: {
    id: {
      type: String,
      default() {
        return `search-text-input-${Math.random()
          .toString(36)
          .substring(2, 9)}`;
      },
    },
    type: {
      type: String,
      default: "text",
    },
    value: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    errors: {
      type: Array,
      default: () => [],
    },
    withIcon: {
      type: Boolean,
      default: false,
    },
    bordered: {
      type: Boolean,
      default: true,
    },
    showSearch: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocused: false,
    };
  },
  computed: {
    classes() {
      return {
        "focus:border-secondary-400 focus:border-blue-600 focus:bg-white focus:shadow-lg focus:border focus:border-2 focus:border-secondary-300":
          this.bordered === true,
        "border border-secondary-400 bg-gray-200 focus:bg-white":
          this.bordered === false,
      };
    },
  },
  methods: {
    onInput(e) {
      this.$emit("input", e.target.value);
    },
    closeMenu() {
      this.$emit("away");
      this.isFocused = false;
    },
    focus(e) {
      this.$emit("focus", e);
      this.isFocused = true;
    },
    blur(e) {
      this.$emit("blur", e);
      this.isFocused = false;
    },
    select() {
      this.$refs.input.select();
    },
    setSelectionRange(start, end) {
      this.$refs.input.setSelectionRange(start, end);
    },
    removeText() {
      this.$refs.input.value = "";
      this.$emit("input", "");
    },
  },
  components: { IconX },
};
</script>
