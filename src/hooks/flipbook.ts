import { reactive, computed, ref, onBeforeUnmount, Ref, watch } from "vue";
import { timeout, keepAspectRatio } from "@/utils";
import { dimensions } from "./app-dimensions";
import useArrayLink from "./array-link";

export interface FlipbookOptions {
  width: number;
  height: number;
  flipAnimationDuration: number;
  rounded: boolean;
  bigCovers: boolean;
  autoTurnDelay: number;
}

export type FlipbookSheetState = Record<string, boolean>;

export enum State {
  Open = "open",
  Closed = "closed",
  OpeningStart = "opening-start",
  OpeningEnd = "opening-end",
  ClosingStart = "closing-start",
  ClosingEnd = "closing-end",
}

export function useFlipbook(options: Readonly<FlipbookOptions>) {
  /**
   * The state object for each sheet
   */
  const flipbookSheetsState: FlipbookSheetState = reactive({});
  /**
   * The current displayed page. If we are showing 2 pages this number will represent the last one.
   * Eg: we are on pages 1 - 2, this will be 2
   */
  const currentPage = computed(() => {
    const index = Object.entries(flipbookSheetsState)
      .slice()
      .reverse()
      .find(([key, value]) => value === true)?.[0];
    if (index) {
      // index starts with 0 so we need to increment it by one  then duplicate because we go from 2 to 2 and finally add one more to skip the sheet
      return (Number(index) + 1) * 2 + 1;
    }
    return 1;
  });
  /**
   * Open the flibook to a specific page
   */
  async function openTo(pageNumber: number) {
    const pageIndex =
      pageNumber % 2 == 0 ? pageNumber / 2 : (pageNumber - 1) / 2;
    if (pageNumber > currentPage.value) {
      if (!flipbookSheetsState[0]) {
        flipbookSheetsState[0] = true;
        await timeout(options.flipAnimationDuration);
      }
      for (let index = 1; index < pageIndex; index++) {
        if (options.autoTurnDelay !== 0) await timeout(options.autoTurnDelay);
        flipbookSheetsState[index] = true;
      }
    } else if (pageNumber < currentPage.value) {
      for (let index = currentPage.value; index >= pageIndex; index--) {
        if (options.autoTurnDelay !== 0) await timeout(options.autoTurnDelay);
        flipbookSheetsState[index] = false;
      }
    }
  }

  /**
   * Array of registred sheet ids
   */
  const registredSheets = ref<Array<string>>([]);

  /**
   * The style object of the flipbook
   */

  const renderingSize = computed(() => {
    return keepAspectRatio(
      options.width,
      options.height,
      dimensions.width,
      dimensions.height
    );
  });

  const style = computed(() => {
    return {
      width: `${renderingSize.value.width}px`,
      height: `${renderingSize.value.height}px`,
      transition: "transform 1s",

      transform: `${
        currentPage.value === 1
          ? `perspective(75rem) rotateX(25deg)`
          : `perspective(0) rotateX(0deg) translateX(50%)`
      } `,
    };
  });

  const flibookOptions = computed(() => options);

  return {
    flipbookSheetsState,
    currentPage,
    openTo,
    style,
    registredSheets,
    flibookOptions,
    renderingSize,
  };
}

export function useFlipbookSheet(
  sheetIds: Ref<Array<string>>,
  flipbookSheetsState: FlipbookSheetState
) {
  const { id, index } = useArrayLink(sheetIds);
  flipbookSheetsState[index.value] = false;
  const isOpen = computed({
    get: () => flipbookSheetsState[index.value],
    set: (newVal) => (flipbookSheetsState[index.value] = newVal),
  });

  const frontPageNumber = computed(() => index.value * 2 + 1);
  const backPageNumber = computed(() => index.value * 2 + 2);
  const zPosition = computed(() => ({
    open: index.value + 1,
    closed: sheetIds.value.length + sheetIds.value.length - index.value,
  }));

  onBeforeUnmount(() => {
    flipbookSheetsState[index.value] = false;
  });
  const state = ref<State>(State.Closed);

  function toggle() {
    if (!isOpen.value) {
      isOpen.value = true;
    } else {
      isOpen.value = false;
    }
  }
  watch(isOpen, (newVal) => {
    if (newVal) {
      state.value = State.OpeningStart;
      setTimeout(() => {
        state.value = State.OpeningEnd;
      }, 300);
      setTimeout(() => {
        state.value = State.Open;
      }, 600);
    } else {
      state.value = State.ClosingStart;
      setTimeout(() => {
        state.value = State.ClosingEnd;
      }, 300);
      setTimeout(() => {
        state.value = State.Closed;
      }, 600);
    }
  });

  const zIndex = computed(() => {
    switch (state.value) {
      case State.Open:
        return zPosition.value.open;
      case State.Closed:
        return zPosition.value.closed;
      case State.OpeningStart:
        return zPosition.value.closed + 1;
      case State.OpeningEnd:
        return zPosition.value.open + 1;
      case State.ClosingStart:
        return zPosition.value.open + 1;
      case State.ClosingEnd:
        return zPosition.value.closed + 1;
    }
  });

  return {
    frontPageNumber,
    backPageNumber,
    zIndex,
    id,
    index,
    isOpen,
    state,
    toggle,
  };
}
