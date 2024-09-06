import type { SvgAnimationConfig } from "@/types/svg";
import { animatePaths } from "@/utils/svg-anims";
import React, { useEffect } from "react";
export interface SvgSignatureProps {
  children?: React.ReactNode;
  pathClass?: string;
  delay?: number;
  repeat?: boolean;
  interval?: number;
  config?: SvgAnimationConfig;
}
export function SvgSignature({
  children,
  interval = 300,
  pathClass = "signature",
  delay = 100,
  repeat = false,
  config,
}: SvgSignatureProps) {
  useEffect(() => {
    setTimeout(
      () =>
        animatePaths({
          interval,
          pathClass,
          repeat,
          config,
        }),
      delay
    );
  }, [repeat, interval, pathClass, delay]);
  return children;
}
