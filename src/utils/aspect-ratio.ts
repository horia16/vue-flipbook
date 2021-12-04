export default function keepAspectRatio(
  desiredWidth: number,
  desiredHeight: number,
  availableWidth: number,
  availableHeight: number
) {
  const damper = 24;
  let width = desiredWidth;
  let height = desiredHeight;
  let scale = 1;
  let reverseScale = 1;
  if (width * 2 + damper > availableWidth) {
    width = Math.floor(availableWidth / 2 - damper);
    scale = desiredWidth / width;
    reverseScale = width / desiredWidth;
    height = Math.floor(desiredHeight / scale);
  }
  if (height + damper > availableHeight) {
    height = Math.floor(availableHeight - damper);
    scale = desiredHeight / height;
    reverseScale = height / desiredHeight;
    width = Math.floor(desiredWidth / scale);
  }
  return {
    width,
    height,
    scale,
    reverseScale,
  };
}
