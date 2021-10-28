import React from "react";
import Image from "next/image";
import { Wrapper, Txt, Btn } from "./styled";

export const Additem: React.FC = () => {
  return (
    <Wrapper>
      <img
        src="/icons/source.svg"
        alt="additem"
        width="100"
        height="100"
        style={{ position: "relative", top: "-17px", height: "125px" }}
      />
      <Txt>
        <p style={{ fontWeight: "700" }}>Didn’t find what you need?</p>
        <Btn>Add Item</Btn>
      </Txt>
    </Wrapper>
  );
};
