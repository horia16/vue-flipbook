<template>
  <div
    v-if="shouldRender"
    :id="`sheet_${id}`"
    :key="id"
    class="flipbook-sheet"
    :class="{ sheet_open: isOpen }"
    :style="sheetStyle"
    :index="index"
  >
    <div class="flipbook-sheet__page_wrapper">
      <div
        class="flipbook-sheet__page flipbook-sheet__page__front"
        :style="{
          ...parentSize,
          transform:
            currentPage === 1
              ? `translateY(${clampMax(index * 0.5, 11)}px) scaleX(${
                  frontPageNumber !== 1 ? clampMin(1 - index / 1000, 0.98) : '1'
                })`
              : '',
          pointerEvents: !interactive.front ? 'none' : undefined,
          userSelect: !interactive.front ? 'none' : undefined,
          borderRadius: flibookOptions?.rounded ? '4px' : undefined
        }"
      >
        <PageRenderer
          v-if="renderContent"
          is-front
          :scale="renderingSize.scale"
          :reverse-scale="renderingSize.reverseScale"
          :width="flibookOptions?.width"
          :height="flibookOptions?.height"
          :toggle="toggle"
        >
          <slot name="front" :number="frontPageNumber"></slot>
        </PageRenderer>
      </div>
      <div
        class="flipbook-sheet__page flipbook-sheet__page__back"
        :style="{
          ...parentSize,
          pointerEvents: !interactive.back ? 'none' : undefined,
          userSelect: !interactive.back ? 'none' : undefined,
          borderRadius: flibookOptions?.rounded ? '4px' : undefined
        }"
      >
        <PageRenderer
          v-if="renderContent"
          :scale="renderingSize.scale"
          :reverse-scale="renderingSize.reverseScale"
          :width="flibookOptions?.width"
          :height="flibookOptions?.height"
          :toggle="toggle"
        >
          <slot name="back" :number="backPageNumber"></slot>
        </PageRenderer>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, inject, watch } from "vue";
import { useFlipbookSheet } from "@/hooks/flipbook";
import injectionKeys from "@/injection-keys";
import { clampMax, clampMin } from "@/utils";
import PageRenderer from "./Renderer/PageRenderer.vue";
const sheetIds = inject(injectionKeys.registredSheets, ref([]));
const currentPage = inject(injectionKeys.currentPage, ref(0));
const flibookOptions = inject(injectionKeys.flibookOptions);
const renderingSize = inject(
  injectionKeys.renderingSize,
  computed(() => ({ width: 0, height: 0, scale: 1, reverseScale: 1 }))
);
const flipbookSheetsState = inject(injectionKeys.flipbookSheetsState, {});
const { isOpen, id, index, frontPageNumber, backPageNumber, zIndex, toggle } = useFlipbookSheet(
  sheetIds,
  flipbookSheetsState
);

const visiblePages = computed(() => {
  return currentPage.value === 1
    ? [1]
    : currentPage.value === sheetIds.value.length * 2 + 1
    ? [currentPage.value - 1]
    : [currentPage.value - 1, currentPage.value];
});
const interactive = computed(() => ({
  front: visiblePages.value.includes(frontPageNumber.value),
  back: visiblePages.value.includes(backPageNumber.value)
}));
const isCover = computed(
  () => flibookOptions?.value.bigCovers && (index.value === 0 || index.value === sheetIds.value.length - 1)
);
const renderBig = computed(() => isCover.value);
const parentSize = computed(() => ({
  width: `${renderBig.value ? renderingSize.value.width : Number(renderingSize.value.width) - 5}px`,
  height: `${renderBig.value ? renderingSize.value.height : Number(renderingSize.value.height) - 10}px`
}));

const sheetStyle = computed(() => ({
  ...parentSize.value,
  top: renderBig.value ? "-5px" : "",
  zIndex: zIndex.value,
  transform: "perspective(100vw)"
}));

const shouldRender = computed(() => isCover.value || Math.abs(backPageNumber.value - currentPage.value) < 40);

const renderContent = computed(() => {
  return isCover.value || Math.abs(backPageNumber.value - currentPage.value) < 6;
});
</script>
<style>
.flipbook-sheet {
  position: absolute;
  transform-style: preserve-3d;
  transition: transform 2s;
}
.sheet_open .flipbook-sheet__page_wrapper {
  transform: rotateY(-180deg);
  transform-origin: left center;
}

.flipbook-sheet__page_wrapper {
  transition: transform 0.6s ease-in-out;
  transform-style: preserve-3d;
  position: relative;
  transform-origin: left center;
}

.flipbook-sheet__page__front {
  z-index: 2;
  transform: rotateY(0deg);
  box-shadow: 6px 0 6px -2px rgba(0, 0, 0, 0.3) inset;
}
.flipbook-sheet__page__back {
  transform: rotateY(180deg);
  box-shadow: -6px 0 6px -2px rgba(0, 0, 0, 0.3) inset;
}
.flipbook-sheet__page {
  transition: transform 0.6s;
  background: white;
  border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  backface-visibility: hidden;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  font-family: "Lato", sans-serif;
}
</style>
