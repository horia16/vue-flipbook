<template>
  <div style="position: absolute; top: 0; left: 0; color: red">
    {{ currentPage }}
    <button @click="openTo(4)">open to {{ 4 }}</button>
  </div>
  <div class="flipbook" :style="style">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { provide } from "vue";
import { useFlipbook } from "@/hooks/flipbook";
import injectionKeys from "@/injection-keys";
const props = defineProps({
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 },
  flipAnimationDuration: { type: Number, default: 600 },
  rounded: { type: Boolean, default: false },
  bigCovers: { type: Boolean, default: false },
  autoTurnDelay: { type: Number, default: 200 }
});
const { flipbookSheetsState, currentPage, openTo, style, registredSheets, flibookOptions, renderingSize } = useFlipbook(
  props
);
provide(injectionKeys.flipbookSheetsState, flipbookSheetsState);
provide(injectionKeys.currentPage, currentPage);
provide(injectionKeys.registredSheets, registredSheets);
provide(injectionKeys.flibookOptions, flibookOptions);
provide(injectionKeys.renderingSize, renderingSize);
</script>
