<template>
  <div
    class="flipbook__page-renderer"
    :style="`transform: scale(${reverseScale});
     width: ${100 * scale}%;
     height: ${100 * scale}%;
     `"
  >
    <div :style="`width: ${width}px; height: ${height}px; overflow: hidden`">
      <button
        @click="toggle"
        class="flipbook-sheet__toggle"
        :aria-label="`Go to ${isFront ? 'next page' : 'previous page'}`"
        :style="isFront ? 'right: 0' : 'left: 0'"
      />
      <slot />
    </div>
  </div>
</template>
<script setup lang="ts">
import { PropType } from "vue";
defineProps({
  isFront: { type: Boolean, default: false },
  scale: { type: Number, default: 1 },
  reverseScale: { type: Number, default: 1 },
  width: { type: Number, default: 1 },
  height: { type: Number, default: 1 },
  toggle: {
    type: Function as PropType<() => void>,
    default: () => {
      return;
    },
  },
});
</script>
<style>
.flipbook__page-renderer {
  width: 100%;
  height: 100%;
  transform-origin: left top;
}
.flipbook__page-renderer * {
  text-size-adjust: none;
}

.flipbook-sheet__toggle {
  position: absolute;
  width: 24px;
  height: 100%;
  border: none;
  background-color: transparent;
  -webkit-appearance: none;
  -webkit-tap-highlight-color: transparent;
  cursor: pointer;
  z-index: 50;
}
</style>
