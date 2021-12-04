import { reactive } from "vue";

export const dimensions = reactive({
  width: window.innerWidth,
  height: window.innerHeight,
});

function updateDimensions() {
  dimensions.width = window.innerWidth;
  dimensions.height = window.innerHeight;
}

window.addEventListener("resize", updateDimensions);
