import React from "react";
export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export function Button(props: ButtonProps) {
  return <button onClick={props.onClick}>{props.children}</button>;
}
