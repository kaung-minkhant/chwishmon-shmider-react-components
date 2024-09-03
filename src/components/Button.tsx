import React from "react";
import "./Button.css";
export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export function Button(props: ButtonProps) {
  return (
    <button className={"sample"} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
