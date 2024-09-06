import {
  AnimatableSVGType,
  CircleAnimationType,
  SvgAnimationConfig,
} from "@/types/svg";
import { getSpring } from "./animations";

export function setDashArray(path: SVGPathElement) {
  path.style.strokeDasharray = path.getTotalLength().toString();
}
export function setDashOffset(path: SVGPathElement) {
  path.style.strokeDashoffset = path.getTotalLength().toString();
}
export function initPathSVGAnimation(path: SVGPathElement) {
  setDashArray(path);
  setDashOffset(path);
}
export function initCircleSVGAnimation(path: SVGCircleElement) {}
export function initAnimation(paths: NodeListOf<AnimatableSVGType>) {
  for (let path of paths) {
    if (path instanceof SVGPathElement) {
      initPathSVGAnimation(path);
    }
  }
}
export function pathAnimation(path: SVGPathElement, resolve: any) {
  path.style.visibility = "visible";
  const interval = setInterval(() => {
    if (+path.style.strokeDashoffset < 0) {
      resolve("done");
      clearInterval(interval);
      return;
    }
    path.style.strokeDashoffset = (+path.style.strokeDashoffset - 2).toString();
  }, 1);
}
export function removeUnits(str: string) {
  return str.replace(/(em|px|rem)/g, "");
}
export function circleAnimation(
  path: SVGCircleElement,
  resolve: any,
  config?: SvgAnimationConfig
) {
  const circleAnimation = config?.circleAnimationType || "pop";

  if (circleAnimation === "grow") {
    const orignalRadius = path.r.baseVal.value;
    path.setAttribute("r", "0");
    path.style.visibility = "visible";
    const spring = getSpring({
      from: 0,
      to: orignalRadius,
      mass: 0.1,
      stiffness: -10,
    });
    let springData = { value: 0, done: false };
    let id = requestAnimationFrame(animate);
    function animate() {
      springData = spring(path.r.baseVal.value);
      path.setAttribute("r", springData.value.toString());
      if (springData.done) {
        window.cancelAnimationFrame(id);
        return;
      }
      id = requestAnimationFrame(animate);
    }
  }
  if (circleAnimation === "pop") {
    path.style.visibility = "visible";
  }
  resolve("done");
}
export function performAnimation(
  path: AnimatableSVGType,
  resolve: any,
  interval: number,
  config?: SvgAnimationConfig
) {
  setTimeout(() => {
    if (path instanceof SVGPathElement) {
      pathAnimation(path, resolve);
    }
    if (path instanceof SVGCircleElement) {
      circleAnimation(path, resolve, config);
    }
  }, interval);
}

export async function animatePaths({
  pathClass,
  repeat,
  interval,
  config,
}: {
  pathClass: string;
  repeat: boolean;
  interval: number;
  config?: SvgAnimationConfig;
}) {
  const paths = document.querySelectorAll(
    `.${pathClass}`
  ) as NodeListOf<AnimatableSVGType>;
  initAnimation(paths);
  for (let path of paths) {
    await new Promise((resolve) =>
      performAnimation(path, resolve, interval, config)
    );
  }
  while (repeat) {
    for (let path of paths) {
      await new Promise((resolve) => performAnimation(path, resolve, interval));
    }
    initAnimation(paths);
  }
}
