"use client";
import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  click: Function;
  disabled?: boolean;
  style?: "outline" | "filled";
}

const Button = ({ click, type = "button", children, disabled, style = "filled" }: props) => {
  return (
    <button onClick={() => click()} type={type} disabled={disabled} className={`${style == "filled" ? "common-button" : "outline-button"}`}>
      {children}
    </button>
  );
};

export default Button;
