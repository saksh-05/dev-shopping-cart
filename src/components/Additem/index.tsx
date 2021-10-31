import React from "react";
import Image from "next/image";
import { Wrapper, Txt, Btn } from "./styled";

import { shop } from "@redux/actions";
import { useAppDispatch } from "@redux/store";

export const Additem: React.FC = () => {
  const dispatch = useAppDispatch();

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
        <p style={{ fontWeight: 700 }}>Didn’t find what you need?</p>
        <Btn onClick={() => dispatch(shop())}>Add Item</Btn>
      </Txt>
    </Wrapper>
  );
};
