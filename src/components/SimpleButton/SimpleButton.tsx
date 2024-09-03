import React from "react";
import "./SimpleButton.css";
export interface SimpleButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export function SimpleButton(props: SimpleButtonProps) {
  return (
    <button className={"simple-button"} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
