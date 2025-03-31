"use client";
import React, { ReactNode } from "react";

interface props {
  children: ReactNode;
  type?: "button" | "submit" | "reset" | undefined;
  click: Function;
  disabled?: boolean;
}

const Button = ({ click, type = "button", children, disabled }: props) => {
  return (
    <button onClick={() => click()} type={type} disabled={disabled} className="common-button">
      {children}
    </button>
  );
};

export default Button;
