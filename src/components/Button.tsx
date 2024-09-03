import React from "react";
import styles from "./Buttton.module.css";
export interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}
export function Button(props: ButtonProps) {
  return (
    <button className={styles.sample} onClick={props.onClick}>
      {props.children}
    </button>
  );
}
