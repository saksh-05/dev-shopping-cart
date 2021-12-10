import React from "react";
import { WrapperA, Wrapper, Txt, Btn } from "./styled";
import { addItem } from "@redux/actions";
import { useAppDispatch } from "@redux/store";

export const HistoryList: React.FC = () => {
  const dispatch = useAppDispatch();

  return (
    <WrapperA>
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
          <Btn onClick={() => dispatch(addItem())}>Add Item</Btn>
        </Txt>
      </Wrapper>
    </WrapperA>
  );
};
