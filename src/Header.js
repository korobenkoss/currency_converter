import React from "react";
import Converter from "./Converter";
import Logo from "./Logo";
import Title from "./Title";

export default function Header() {
    
    return (
      <div className="Header">
          <Logo />
          <Title />
          <Converter />
      </div>
      );
  }