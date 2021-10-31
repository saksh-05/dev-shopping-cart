import React from "react";
import { Search, Wrapper, InputWrapper, Txt, Container } from "./styled";
import { Shoppinglist } from "@components";

const Menu: React.FC = () => {
  return (
    <Wrapper>
      <Container>
        <div
          style={{
            alignItems: "center",
            display: "inline-flex",
            height: "fit-content",
          }}
        >
          <p style={{ fontSize: "26px", width: "30rem", fontWeight: 700 }}>
            <span style={{ color: "#f9a109", marginRight: "0.6rem" }}>
              Shoppingify
            </span>
            allows you take your shopping list wherever you go
          </p>
          <Search>
            <InputWrapper>
              <input type="text" placeholder="search" />
            </InputWrapper>
          </Search>
        </div>
      </Container>
      <Shoppinglist />
    </Wrapper>
  );
};

export default Menu;
