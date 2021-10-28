import React from "react";
import { Additem } from "@components";
import { Wrapper, Search, InputWrapper } from "./styled";
import Image from "next/image";
export const Shoppinglist: React.FC = () => {
  return (
    <Wrapper>
      <Additem />
      <div
        style={{
          marginTop: "2rem",
          marginBottom: "2rem",
          display: "flex",
          alignItems: "center",
          fontSize: "1.5rem",
          fontWeight: 700,
        }}
      >
        Shopping List
        <Image src="/icons/edit.svg" alt="edit" height="30" width="30" />
      </div>
      <Search>
        <InputWrapper>
          <input
            type="text"
            placeholder="Enter a name"
            style={{
              height: "3.5rem",
              width: "14rem",
              border: "3px solid #F9A109",
              borderRadius: "0.8rem",
            }}
          />
          <input
            type="submit"
            value="Save"
            style={{
              background: "#F9A109",
              border: "none",
              borderRadius: "0.8rem",
              height: "3.5rem",
              position: "relative",
              right: "2rem",
              width: "5rem",
            }}
          />
        </InputWrapper>
      </Search>
    </Wrapper>
  );
};

export default Shoppinglist;
