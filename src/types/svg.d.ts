export type AnimatableSVGType = SVGPathElement | SVGCircleElement

export type CircleAnimationType = "grow" | "pop"

export interface SvgAnimationConfig {
  circleAnimationType: CircleAnimationType
}