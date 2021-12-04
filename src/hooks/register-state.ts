import { computed, reactive, onBeforeUnmount } from "vue";

export const bookState: Record<string, boolean> = reactive({});

export function useRegisterState(index: number) {
  bookState[index] = false;
  const isOpen = computed({
    get: () => bookState[index],
    set: (newVal) => (bookState[index] = newVal),
  });
  onBeforeUnmount(() => {
    bookState[index] = false;
  });
  return {
    isOpen,
  };
}
