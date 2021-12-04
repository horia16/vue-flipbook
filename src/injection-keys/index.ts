import { InjectionKey, Ref, ComputedRef } from "vue";
import { FlipbookOptions, FlipbookSheetState } from "../hooks/flipbook";
const registredSheets: InjectionKey<Ref<Array<string>>> =
  Symbol("registredSheets");
const flibookOptions: InjectionKey<ComputedRef<FlipbookOptions>> =
  Symbol("flibookOptions");
const currentPage: InjectionKey<Ref<number>> = Symbol("currentPage");
const flipbookSheetsState: InjectionKey<FlipbookSheetState> = Symbol(
  "flipbookSheetsState"
);
const scale: InjectionKey<ComputedRef<number>> = Symbol("scale");
const renderingSize: InjectionKey<
  ComputedRef<{
    width: number;
    height: number;
    scale: number;
    reverseScale: number;
  }>
> = Symbol("renderingSize");
export default {
  registredSheets,
  flibookOptions,
  currentPage,
  flipbookSheetsState,
  renderingSize,
  scale,
};
